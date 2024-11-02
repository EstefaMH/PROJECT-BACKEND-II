import { Router } from 'express';
import { FilesManager } from "../data/FilesManager.js";



export const router = Router();


router.get("/", async(req, res)=>{

    console.log("data ingresa")
    FilesManager.setPath("./src/data/productos.json")
    const data = await FilesManager.readFileData();

    res.render("home", {title : "Productos" , productos: data })
})

router.get("/realtimeproducts", async(req, res)=>{

     res.render("realTimeProducts", {title : " real time productos"  })
 })