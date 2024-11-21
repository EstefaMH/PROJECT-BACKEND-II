import { Router } from 'express';
import { ProductsDAO } from '../dao/productsDAO.js';
import { ProductsDTO } from '../dto/ProductsDTO.js';



export const router = Router();


router.get("/", async (req, res) => {
    let { limit, page, sort, query } = req.query

    const jsonQuery = query && JSON.parse(query);
    const url = req.url;
    const newUrl = url == "/" ? "/?" : `${url}&`;
    const mongosort = sort == "asc" ? 1 : -1

    const productos = await ProductsDAO.getProducts(limit, page, mongosort, jsonQuery);
    const { totalPages, currentPage, hasPrevPage, hasNextPage, prevPage, nextPage, prevLink, nextLink } = productos

    res.render("home", {
        path: newUrl,
        title: "Productos",
        productos: productos.payload,
        totalPages: totalPages,
        currentPage: currentPage,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevPage: prevPage,
        nextPage: nextPage,
        prevLink: prevLink,
        nextLink: nextLink
    }
    )
})




router.get("/:idProduct", async (req, res) => {

    let { idProduct } = req.params

    try {

        const product = await ProductsDAO.getProductById(idProduct);

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


router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", { title: " Real Time Productos" })
})