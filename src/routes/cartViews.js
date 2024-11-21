import { Router } from 'express';
import { CartsDAO } from '../dao/cartsDAO.js';
import { cartsModelo } from '../models/cartsModel.js';



export const router = Router();

router.get("/", async (req, res) => {
    res.render("cart", { title: " carts" })
})

router.get("/:id", async (req, res) => {
    let { id } = req.params
   
    console.log("cid", id)

    const productsCart = await CartsDAO.getCartById(id);
    
    console.log("data controller cart", productsCart)
    console.log("data controller title", productsCart.products)
   
    res.render("cart", {
        title: "Mi carrito",
        products :productsCart.products
    }
    )
})



