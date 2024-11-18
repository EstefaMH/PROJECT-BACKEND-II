import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsControllers.js';
import { ProductsDTO } from '../dto/ProductsDTO.js';



export const router = Router();


router.get("/", async (req, res) => {
    let { limit, page, sort, category } = req.query
    const searchParams = req.query;
    const url = req.url;

    const newUrl = url == "/" ? "/?" : `${url}&`;
    console.log("category req", url, "aaa",searchParams, "new", newUrl)

    const productos = await ProductsController.getProducts(limit, page, sort, category);
   const { totalPages, currentPage, hasPrevPage, hasNextPage, prevPage, nextPage, prevLink, nextLink} = productos
    console.log("data controller", productos)
   
    res.render("home", {
        path: newUrl ,
        title: "Productos",
        productos: productos.payload,
        totalPages:totalPages,
        currentPage: currentPage,
        hasPrevPage:hasPrevPage,
        hasNextPage:hasNextPage,
        prevPage:prevPage,
        nextPage:nextPage,
        prevLink: prevLink,
        nextLink: nextLink
    }
    )
})

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", { title: " Real Time Productos" })
})

router.get("/:idProduct", async (req, res) => {

    let { idProduct } = req.params
    console.log("idproduct", idProduct)

    try {

        const product = await ProductsController.getProductoById(idProduct);
        console.log("databyid", product.thumbnails[0])

        if (!product) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(404).send('Producto no encontrado');
        }

        res.render("productDetails", new ProductsDTO(
            product.id,
            product.title,
            product.description,
            product.code,
            product.price,
            product.status,
            product.stock,
            product.category,
            product.thumbnails[0]
        ))
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})