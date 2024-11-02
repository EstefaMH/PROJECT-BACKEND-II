const socket = io();


socket.on("saludo", datos => {
    console.log(datos)

    socket.emit("id", "user 123333")
})



socket.on("newProduct", product => {
    const productCard = document.getElementById("section-products-realtime")
    console.log("new")
    const article = document.createElement("article");
            article.id = "product";
            article.classList.add("product");
            productCard.append(article);

            const title = document.createElement("h2");
            title.textContent = product.title;

            const description = document.createElement("p");
            description.textContent =  product.description;

            const code = document.createElement("p");
            code.textContent = `Código: ${ product.code}`;

            const price = document.createElement("p");
            price.textContent = `Precio: ${ product.price}`;

            const stock = document.createElement("p");
            stock.textContent = `Stock: ${ product.stock}`;

            const category = document.createElement("p");
            category.textContent = `Categoría: ${ product.category}`;

            article.appendChild(title);
            article.appendChild(description);
            article.appendChild(code);
            article.appendChild(price);
            article.appendChild(stock);
            article.appendChild(category);
})


const getProducts = async () => {
    
    try {
        const productCard = document.getElementById("section-products-realtime")
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const productos = data.data;

        console.log("Products cargados exitosamente!", productos);

        productos.forEach((product) => {

            const article = document.createElement("article");
            article.id = "product";
            article.classList.add("product");
            productCard.append(article);

            const title = document.createElement("h2");
            title.textContent = product.title;

            const description = document.createElement("p");
            description.textContent =  product.description;

            const code = document.createElement("p");
            code.textContent = `Código: ${ product.code}`;

            const price = document.createElement("p");
            price.textContent = `Precio: ${ product.price}`;

            const stock = document.createElement("p");
            stock.textContent = `Stock: ${ product.stock}`;

            const category = document.createElement("p");
            category.textContent = `Categoría: ${ product.category}`;

            article.appendChild(title);
            article.appendChild(description);
            article.appendChild(code);
            article.appendChild(price);
            article.appendChild(stock);
            article.appendChild(category);

            
            
        });
    } catch (error) {
        console.error("Error :", error);
    }
}
getProducts()
