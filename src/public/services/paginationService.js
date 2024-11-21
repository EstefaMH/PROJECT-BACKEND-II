const paginationService = async () => {
    try {
        const response = await fetch("/api/products/");

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        
        await response.json();

    } catch (error) {
        console.error("Error en la carga de los datos:", error);
    }

};
paginationService();
