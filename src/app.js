import dotenv from 'dotenv';
import express from 'express';
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { config } from './config/config.js';
import { connectDatabase } from './config/databaseConfig.js';
import { router as cartsRoutes } from './routes/cartsRoutes.js';
import { router as productsRoutes } from './routes/productsRoutes.js';
import { router as productsView } from './routes/productsViews.js';
import { router as cartsView } from './routes/cartViews.js';



dotenv.config();
const app = express();

const PORT = config.appConfig.port || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // middle ware que permite accesar a los datos del body 
app.use(express.static("./src/public"))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/", productsView);
app.use("/carts", cartsView);





app.use("/api/products",
  (req, res, next) => {
    req.serverSocket = serverSocket
    next()
  },
  productsRoutes
);
app.use("/api/carts", cartsRoutes);

async function database() {
  return await connectDatabase();
}
database();

const server = app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);

});



let serverSocket = new Server(server)

serverSocket.on("connection", socket => {
  console.log(`Se conecto un cliente con id ${socket.id}`)

  socket.emit("saludo", { emisor: "Server WebSocket", mensaje: "Bienvenido al servidor. Identificate...!!!" })

  socket.on("id", nombre => {
    console.log(`El cliente con id ${socket.id} se ha identificado como ${nombre}`)
    socket.broadcast.emit("nuevoUsuario", nombre)
  })

})


