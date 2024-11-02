const socket = io();


socket.on("saludo", datos => {
    console.log(datos)

    socket.emit("id", "user 123333")
})

socket.on("deleteProduct", datos => {

     const productCard = document.getElementById(datos);
     productCard.remove()
   
})


socket.on("newProduct", product => {
    const productCard = document.getElementById("section-products-realtime")
 
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
    article.appendChild(removeButton);
})



