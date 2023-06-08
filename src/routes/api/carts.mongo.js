import { Router } from "express";
import manager from "../../managers/cart.js";
import Cart from "../../models/cart.model.js";
import Products from "../../models/product.model.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const response = await Cart.create({ products: [] });
    if (response) {
      return res.status(201).json({
        id: response._id.toJSON(),
        cart: response,
        message: "cart created",
      });
    }
    return res.status(400).json({ message: "not created" });
  } catch (error) {
    next(error);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     let response = await Cart.create(req.body);
//     if (response) {
//       return res.json({ status: 201, message: "cart created" });
//     }
//     return res.json({ status: 400, message: "not created" });
//   } catch (error) {
//     next(error);
//   }
// });
// router.get('/', async(req,res,next)=> {
//     try {
//         let all = manager.read_carts()
//         if (all.length>0) {
//             return res.json({ status:200,all })
//         }
//         let message = 'not found'
//         return res.json({ status:404,message })
//     } catch(error) {
//         next(error)
//     }
// })

router.get("/", async (req, res, next) => {
  try {
    const all = await Cart.find().exec();
    res.status(200).json(all);
  } catch (error) {
    next(error);
  }
});
router.get("/:cid", async (req, res, next) => {
  try {
    let id = Number(req.params.cid);
    let one = Cart.findById(id);
    if (one) {
      return res.json({ status: 200, one });
    }
    let message = "not found";
    return res.json({ status: 404, message });
  } catch (error) {
    next(error);
  }
});
router.put("/:cid", async (req, res, next) => {
  try {
    let id = Number(req.params.cid);
    let data = req.body;

    let response = await Cart.findByIdAndUpdate(id, data);
    if (response) {
      return res.json({ status: 200, message: "cart updated" });
    }
    return res.json({ status: 404, message: "not found" });
  } catch (error) {
    next(error);
  }
});

// router.put("/:cid/product/:pid/:units", async (req, res, next) => {
//   try {
//     let id = Number(req.params.pid);
//     let cid = Number(req.params.cid);
//     let units = Number(req.params.units);

//     let response = await Cart.findByIdAndDelete(cid, id, units);
//     if (response === 200) {
//       return res.json({ status: 200, message: "cart updated" });
//     }
//     return res.json({ status: 404, message: "not found" });
//   } catch (error) {
//     next(error);
//   }
// });
router.put("/:cid/product/:pid/:units", async (req, res, next) => {
  try {
    let id = req.params.pid;
    let cid = req.params.cid;
    let units = Number(req.params.units);

    let cart = await Cart.findById(cid);
    let product = await Products.findById(id);

    console.log(cart);
    console.log(product);

    if (cart && product) {
      if (product.stock >= units) {
        product.stock -= units;
        const index = cart.products.findIndex((e) => e.product == id);
        if (index == -1) {
          cart.products.push({ product: id, units: units });
        } else {
          cart.products[index].units += units;
          cart.markModified("products");
        }

        await cart.save();
        await product.save();

        return res.status(200).json({ message: "Cart updated" });
      } else {
        return res.status(400).json({ message: "Not enough stock available" });
      }
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:cid", async (req, res, next) => {
  try {
    let id = Number(req.params.cid);
    let response = await Cart.findByIdAndDelete(id);
    if (response) {
      return res.json({ status: 200, message: "cart deleted" });
    }
    return res.json({ status: 404, message: "not found" });
  } catch (error) {
    next(error);
  }
});

// router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
//   try {
//     let id = Number(req.params.pid);
//     let cid = Number(req.params.cid);
//     let units = Number(req.params.units);

//     let response = await manager.delet(cid, id, units);
//     if (response === 200) {
//       return res.json({ status: 200, message: "Units Delete" });
//     }
//     return res.json({ status: 404, message: "not found" });
//   } catch (error) {
//     next(error);
//   }
// });
router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const units = Number(req.params.units);

    if (Number.isNaN(units)) {
      // check if units is actually a number
      return res.status(400).json({ message: "Invalid units parameter" });
    }

    const cart = await Cart.findById(cid);
    const product = await Products.findById(pid);
    if (cart == null || product == null) {
      return res.status(400).json({ message: "product or cart null" });
    }

    const index = cart.products.findIndex((e) => e.product == pid);
    if (index == -1) {
      return res.status(400).json({ message: "product not in cart" });
    }
    if (units > cart.products[index].units) {
      return res.status(400).json({ message: "invalid units" });
    }

    cart.products[index].units -= units;
    if (cart.products[index].units <= 0) {
      cart.products.splice(index, 1);
    }
    product.stock += units;
    cart.markModified("products");

    await cart.save();
    await product.save();

    return res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    next(error);
  }
});

export default router;
