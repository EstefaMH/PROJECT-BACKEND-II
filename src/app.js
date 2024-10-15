import dotenv from 'dotenv';
import express from 'express';
import { config } from './config/config.js';
import { router as productsRoutes } from './routes/productsRoutes.js';
import { router as cartsRoutes } from './routes/cartsRoutes.js';


dotenv.config();
const app = express();

const PORT = config.appConfig.port|| 8080;


app.use(express.urlencoded({extended:true}));
app.use(express.json()); // middle ware que permite accesar a los datos del body 

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log("hola este es mi server1");
});


/*const product = new ProductsDTO("1","aa","des",11,11111,undefined,2,"aa", []);
const validate = product.validateData(product);
console.log(product , validate)*/

/*app.use((req,res,next)=>{
    console.log("no especifica la ruta ");
    next()
})*/

