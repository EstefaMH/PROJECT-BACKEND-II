import { Router } from 'express';
import { FilesManager } from "../data/FilesManager.js";



export const router = Router();


router.get("/productos", async(req, res)=>{

    FilesManager.setPath("./src/data/productos.json")
    const data = await FilesManager.readFileData();
    console.log("data " , data)

    res.render("home", {title : "Productos" , productos: data })
})

router.get("/realtimeproducts", async(req, res)=>{
    
     res.render("realTimeProducts", {title : "productos"  })
 })