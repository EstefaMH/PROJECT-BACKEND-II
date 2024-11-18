import { Router } from 'express';
import { ProductsDTO } from '../dto/ProductsDTO.js';
import { ProductsDAO } from '../dao/productsDAO.js';
import { ProductsController } from '../controllers/ProductsControllers.js';

export const router = Router();


router.get('/', async (req, res) => {

  let data = {}
  try {
    let { limit, page, sort , filter } = req.query
    console.log("categoryQuery", filter)

    data = await ProductsController.getProducts(limit, page, sort, filter);
    console.log("data leng", data)

    return res.status(200).json(
      {
        "status": "success",
        "payload": data,
        "totalPages": data.length,
        "prevPage": parseInt(page) - 1, 
        "nextPage": parseInt(page) + 1, 
        "page": page, 
        "hasPrevPage": "", 
        "hasNextPage": "", 
        "prevLink": "",
        "nextLink": "",
      }

    );

  } catch (error) {
    console.log(error)
    return res.status(500).json(
      {
        "status": "error",
      }
    );
  }

});

router.get('/categories', async (req, res) => {

  let data = {}
  try {
    data = await ProductsController.getUniqueCategories();
    console.log("data categories", data)

    return res.status(200).json(
      {
        "payload": data,
      }
    );

  } catch (error) {
    console.log(error)
    return res.status(500).json(
      {
        "status": "error",
      }
    );
  }

});

router.get('/:id', async (req, res) => {
  let { id } = req.params

  if (isNaN(id)) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: `id debe ser numérico` })
  }

  try {
    const product = await ProductsDAO.getProductById(id);

    if (!product.status) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error: product.error })
    }
    return res.status(200).json({ "response": "ok", "data": product });

  } catch (error) {
    console.log(error)
  }

});


router.post('/', async (req, res) => {
  console.log(req.body)

  const validate = await ProductsDTO.validateData(req.body);

  if (validate !== true) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(validate.status).json({ error: validate.error })
  }

  try {
    const product = new ProductsDTO(
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
    const addProductRes = await ProductsDAO.addProduct(product)
    res.setHeader('Content-Type', 'application/json');
    console.log("res", addProductRes)
    req.serverSocket.emit("newProduct", product)

  } catch (error) {
    console.log(error)
    res.send(error)
  }

  res.send("ok");
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

    req.serverSocket.emit("deleteProduct", pid)
    return res.status(200).json({ message: deleteProduct.res });

  } catch (error) {
    console.log(error)
  }

})
