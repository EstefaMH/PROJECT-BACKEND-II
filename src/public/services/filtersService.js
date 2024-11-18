const getCategoriesFilter = async () => {
    try {
    const filterCategory = document.getElementById("category-filter")
      const response = await fetch("/api/products/categories");
  
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      const data = await response.json();
      data.payload.forEach((category) => {
        const li = document.createElement("li");
        filterCategory.append(li);
    
        const a = document.createElement("a");
        a.href = `/?category=${category}`;
        a.classList.add("dropdown-item");
        a.textContent = category;
        a.addEventListener('click', async () => {
           await fetch("/api/products/");
        })
           
        li.appendChild(a);
      })

    } catch (error) {
      console.error("Error en la carga de los datos:", error);
    }
  };
  
getCategoriesFilter();




