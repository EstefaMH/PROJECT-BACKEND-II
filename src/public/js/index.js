const socket = io();


socket.on("saludo", datos => {
    console.log(datos)

    socket.emit("id", "user 123333")
})

const productLi = document.getElementById("product")

socket.on("newProduct", product => {
    console.log("new")
    let li = document.createElement("li")
    li.textContent = product.title
    productLi.append(li)
})


const getProducts = async () => {
    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const productos = data.data; // Access products from the response structure

        console.log("Products fetched successfully!", productos);

        productos.forEach((product) => {
            const li = document.createElement("li");
            li.textContent = product.title; // Access product name property
            productLi.append(li); // Ensure correct method for appending
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        // Handle errors gracefully, e.g., display an error message to the user
    }
}
getProducts();