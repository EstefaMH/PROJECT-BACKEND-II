import { Router } from 'express';
import { ProductsDTO } from '../dto/ProductsDTO.js';
import { ProductsDAO } from '../dao/productsDAO.js';
import { CartsDAO } from '../dao/cartsDAO.js';
import { CartsDTO } from '../dto/CartsDTO.js';
import { CartProductsDTO } from '../dto/CartProductsDTO.js';

export const router = Router();


router.get('/:cid', async (req, res) => {
  let { cid } = req.params

  if (isNaN(cid)) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: `id debe ser numérico` })
  }

  try {
    const cart = await CartsDAO.getCartById(cid);

    if (!cart.status) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error: cart.error })
    }
    return res.status(200).json({ "response": "ok", "data": cart });

  } catch (error) {
    console.log(error)
  }

});

router.post('/', async (req, res) => {
  console.log(req.body)

  const validate = await CartProductsDTO.validateData(req.body);

  if (validate !== true) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(validate.status).json({ error: validate.error })
  }

  try {
    const newCart = new CartProductsDTO(
      null,
      req.body.products
    );
    const addProductCartRes = await CartsDAO.addNewCart(newCart)
    res.setHeader('Content-Type', 'application/json');
    console.log("res", addProductCartRes)
    res.send("ok");

  } catch (error) {
    console.log(error)
    res.send(error)
  }

});


router.post('/:cid/product/:pid', async (req, res) => {

  const { cid , pid } = req.params

  const validate = await CartsDTO.validateData(cid,pid,req.body);
  console.log("validate", validate)

  if (validate !== true) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(validate.status).json({ error: validate.error })
  }

  try {
    const cartProducts = new CartsDTO(
      pid,
      cid,
      req.body.quantity
    );
    const addProductCartRes = await CartsDAO.addProductCart(cartProducts)

    if (!addProductCartRes.status) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(addProductCartRes.code).json({ error: addProductCartRes.error })
    }

    console.log("res", addProductCartRes)
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ "response": "ok", "data": addProductCartRes });


  } catch (error) {
    console.log(error)
    res.send(error)
  }

});


router.put("/:pid", async (req, res) => {

  let { pid } = req.params
  console.log("id", pid)

  if (isNaN(pid)) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: `id debe ser numérico` })
  }


  const validate = await ProductsDTO.validateDataUpdate(req.body);

  if (validate !== true) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(validate.status).json({ error: validate.error })
  }

  try {

    const newProduct = new ProductsDTO(
      null,
      req.body.title,
      req.body.description,
      req.body.code,
      req.body.price,
      req.body.status,
      req.body.stock,
      req.body.category,
      req.body.thumbnails
    );


    const updateProduct = await ProductsDAO.updateProduct(pid, newProduct)

    if (!updateProduct.status) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error: updateProduct.error })
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ message: `Producto modificado con exito` });


  } catch (error) {
    console.log(error)
  }

})


router.delete("/:pid", async (req, res) => {
  let { pid } = req.params

  if (isNaN(pid)) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: `id debe ser numérico` })
  }

  try {
    const deleteProduct = await ProductsDAO.deleteProduct(pid)
    console.log(deleteProduct);

    if (!deleteProduct.status) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error: updateProduct.error })
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ message: deleteProduct.res });

  } catch (error) {
    console.log(error)
  }

})
