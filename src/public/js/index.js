const socket = io();


socket.on("saludo", datos => {
    console.log(datos)

    socket.emit("id", "user 123333")
})

const productLi = document.getElementById("product")

socket.on("newProduct", product => {
    console.log("new")
    const li = document.createElement("li");
    li.textContent = product.title; 
    productLi.append(li); 
})


const getProducts = async () => {
    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const productos = data.data; 

        console.log("Products cargados exitosamente!", productos);

        productos.forEach((product) => {
            const li = document.createElement("li");
            li.textContent = product.title; 
            productLi.append(li); 
        });
    } catch (error) {
        console.error("Error :", error);
    }
}
getProducts();