import "dotenv/config.js";
import { connect } from "mongoose";
import express from "express";
import router from "./routes/index.js";
import error_handler from "./middlewares/error_handler.js";
import not_found_handler from "./middlewares/not_found.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";

const server = express();

server.engine("handlebars", engine());
server.set("views", __dirname + "/views");
server.set("view engine", "handlebars");

server.use("/public", express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);
server.use(error_handler);
server.use(not_found_handler);

// coneccion a data base
// connect("mongodb+srv://ale:hola1234@dbale.ltyzsnc.mongodb.net/ecommerceAle")
//   .then(() => console.log("database connected"))
//   .catch((error) => console.log(error));

export default server;
