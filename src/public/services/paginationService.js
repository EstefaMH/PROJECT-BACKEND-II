
const paginationService = async () => {
    try {
        const response = await fetch("/api/products/");

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        const data = await response.json();
        console.log("res get", data)
    } catch (error) {
        console.error("Error en la carga de los datos:", error);
    }
    /* 
 totalPages, currentPage, hasPrevPage, hasNextPage, prevPage, nextPage, prevLink, nextLink   
 const prevPage = document.getElementById("page-prev")
     const prevNext = document.getElementById("page-next")
     const pagination = document.getElementById("pagination")
 
     if (prevLink != null) {
         prevPage.href = prevLink;
     }
 
     if (nextLink != null) {
         prevNext.href = nextLink;
     }
 
     for (let index = totalPages; index == 0; index--) {
         const li = document.createElement("li");
         pagination.append(li);
         li.classList.add("page-item");
         const a = document.createElement("a");
         a.classList.add("page-link");
         a.href=`/?page=${index}`
         li.appendChild(a)
     }*/
};
paginationService();
