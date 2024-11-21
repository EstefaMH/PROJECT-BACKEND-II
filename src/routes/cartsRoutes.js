import { Router } from 'express';
import { CartsDAO } from '../dao/cartsDAO.js';
import { CartProductsDTO } from '../dto/CartProductsDTO.js';
import { CartsDTO } from '../dto/CartsDTO.js';

export const router = Router();



router.get('/:cid', async (req, res) => {
  let { cid } = req.params

  try {
    const cart = await CartsDAO.getCartById(cid);

    if (cart.status == 200) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error: cart.error })
    }
    return res.status(200).json({ "data": cart });

  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": error.message })
  }

});

router.post('/', async (req, res) => {
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
    res.json({ id: addProductCartRes._id });

  } catch (error) {
    console.log(error)
    res.send(error)
  }

});


router.post('/:cid/product/:pid', async (req, res) => {

  const { cid, pid } = req.params

  const validate = await CartsDTO.validateData(cid, pid, req.body);

  if (!validate) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(validate.status).json({ error: validate.error })
  }

  try {

    let cartProduct = { id: pid, quantity: req.body.quantity }
    const updateCart = await CartsDAO.postProductToCart(cid, cartProduct)
 
    if(updateCart !== null){
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ "response": "ok", "data": updateCart });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
  }

});


router.delete('/:cid/product/:pid', async (req, res) => {
  let { cid , pid } = req.params

  try {
    const deleteProduct = await CartsDAO.deleteProductCart( pid , cid)

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ "filas eliminadas": deleteProduct });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ "error" : error.message });
  }

})

router.delete('/:cid', async (req, res) => {
  let { cid  } = req.params

  try {
    const deleteProducts = await CartsDAO.deleteAllProductsCart(cid)
    
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ "filas eliminadas": deleteProducts });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ "error" : error.message });

  }

})


router.put('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params

  const validate = await CartsDTO.validateData(cid, pid, req.body);

  if (!validate) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(validate.status).json({ error: validate.error })
  }

  try {

    const updateCart = await CartsDAO.updateCart(cid, pid ,req.body.quantity )
    if(updateCart !== null){
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ "response": "ok", "data": updateCart });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
  }
})

