import { Router } from 'express';
import { ProductsDAO } from '../dao/productsDAO.js';
import { ProductsDTO } from '../dto/ProductsDTO.js';

export const router = Router();


router.get('/', async (req, res) => {

  let data = {}
  let { limit, page, sort, query } = req.query

  const jsonQuery = query && JSON.parse(query);
  const mongosort = sort == "asc" ? 1 : -1

  try {

    data = await ProductsDAO.getProducts(limit, page, mongosort, jsonQuery);
    return res.status(200).json(data);

  } catch (error) {
    console.error(error)
    return res.status(500).json(
      {
        status: 'error',
        error: `Error en la carga de los productos, error: ${error.message} `,
      }
    )

  }

});

router.get('/categories', async (req, res) => {

  let data = {}
  try {
    data = await ProductsDAO.getUniqueCategories();

    return res.status(200).json(
      {
        "payload": data,
      }
    );

  } catch (error) {
    console.log(error)
    return res.status(500).json(
      {
        "error": error.message,
      }
    );
  }

});


router.get('/:id', async (req, res) => {
  let { id } = req.params

  try {
    const product = await ProductsDAO.getProductById(id);

    return res.status(200).json({ "response": "ok", "data": product });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ "error": error.message });
  }
});


router.post('/', async (req, res) => {

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
    const response = await ProductsDAO.addProduct(product)

    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ response: "producto creado con exito", id: response._id, producto: response })
    req.serverSocket.emit("newProduct", product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": error.message })
  }
});


router.put("/:pid", async (req, res) => {

  let { pid } = req.params

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

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ message: `Producto modificado con exito`, producto: updateProduct });

  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": error.message })
  }

})


router.delete("/:pid", async (req, res) => {
  let { pid } = req.params

  try {
    const deleteProduct = await ProductsDAO.deleteProduct(pid)

    res.setHeader('Content-Type', 'application/json');
    req.serverSocket.emit("deleteProduct", pid)
    return res.status(200).json({ message: "producto eliminado con exito", producto: { id: deleteProduct._id, title: deleteProduct.title } });

  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": error.message })
  }

})


