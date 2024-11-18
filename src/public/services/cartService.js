

const createCart = async () => {
    try {

        const response = await fetch(`/api/carts`, {
            method: 'POST',
            body: JSON.stringify({products:[]})
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem("cartId", data.id)

    } catch (error) {
        console.error("Error en la carga de los datos:", error);
    }
};

const cartExist = localStorage.getItem("cartId"); 
if(cartExist == null){
    createCart();
}