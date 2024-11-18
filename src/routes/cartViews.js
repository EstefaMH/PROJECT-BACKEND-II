import { Router } from 'express';
import { CartsController } from '../controllers/CartsController.js';



export const router = Router();

router.get("/", async (req, res) => {
    res.render("cart", { title: " carts" })
})

router.get("/:cid", async (req, res) => {
    let { cid } = req.params
   
    console.log("cid", cid)

    const cart = await CartsController.getCartById(cid);
    console.log("data controller cart", cart)
   
    res.render("", {
        title: "Cart",
    }
    )
})



