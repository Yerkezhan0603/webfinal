document.getElementById("addProductForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const product = {
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        material: document.getElementById("material").value,
        price: parseFloat(document.getElementById("price").value),
        description: document.getElementById("description").value,
        img: document.getElementById("img").value
    };

    const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        alert("✅ Товар успешно добавлен!");
        e.target.reset();
    } else {
        alert("❌ Ошибка при добавлении товара");
    }
});
