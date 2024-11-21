
const getProducts = async () => {

    try {
        const productCard = document.getElementById("section-products-realtime")
        const response = await fetch("/api/products");


        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const productos = data;

        productos.forEach((product) => {

            const article = document.createElement("article");
            article.id = product.id;
            article.classList.add("product");
            productCard.append(article);

            const image = document.createElement("img");
            image.src = product.thumbnails;

            const title = document.createElement("h2");
            title.textContent = product.title;

            const description = document.createElement("p");
            description.textContent = product.description;

            const code = document.createElement("p");
            code.textContent = `Código: ${product.code}`;

            const price = document.createElement("p");
            price.textContent = `Precio: ${product.price}`;

            const stock = document.createElement("p");
            stock.textContent = `Stock: ${product.stock}`;

            const category = document.createElement("p");
            category.textContent = `Categoría: ${product.category}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Eliminar";
            removeButton.addEventListener("click", () => {
                deleteProduct(product.id);
            });


            article.appendChild(image);
            article.appendChild(title);
            article.appendChild(description);
            article.appendChild(code);
            article.appendChild(price);
            article.appendChild(stock);
            article.appendChild(category);
            article.appendChild(removeButton)

        });
    } catch (error) {
        console.error("Error :", error);
    }
}
getProducts()

const deleteProduct = async (pid) => {
    try {
        const response = await fetch(`/api/products/${pid}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
}

Handlebars.registerHelper('postProductoToCart', async function (productId, quantity) {
    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('quantity', quantity);
  
   
  });