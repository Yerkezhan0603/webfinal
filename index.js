class JewelryManager {
    constructor(data) {
        this.jewelryData = data;
        this.filteredData = [...data];
        this.currentSort = "price";
        this.currentCategory = "All";
        this.container = document.getElementById("jewelryContent");
        this.categoryList = document.getElementById("categoryList");
        this.currentCategoryTitle = document.getElementById("currentCollection");

        this.initializeCategories();
        this.initializeSorting();
        this.initializeSidebar();
        this.initializeFeaturedJewelry();
        this.displayJewelry();
    }

    initializeCategories() {
        const categories = ["All", ...new Set(this.jewelryData.map(item => item.category))];

        this.categoryList.innerHTML = categories
            .map(category => `<div class="category-item ${category === "All" ? "active" : ""}" data-category="${category}">${category}</div>`)
            .join("");

        this.categoryList.addEventListener("click", e => {
            const category = e.target.dataset.category;
            if (category) this.filterByCategory(category);
        });
    }

    initializeSorting() {
        document.querySelectorAll(".dropdown-item").forEach(item => {
            item.addEventListener("click", e => {
                e.preventDefault();
                const sortBy = e.target.dataset.sort;
                this.sortJewelry(sortBy);
                document.getElementById("sortDropdown").textContent = `Sort By: ${e.target.textContent}`;
            });
        });
    }

    initializeFeaturedJewelry() {
        const featuredBtn = document.getElementById("popularJewelryBtn");
        if (featuredBtn) {
            featuredBtn.addEventListener("click", () => this.showMostExpensiveItem());
        }
    }

    showMostExpensiveItem() {
        if (!this.jewelryData.length) return;

        const mostExpensiveItem = this.getMostExpensiveItem();
        const modalContent = document.getElementById("jewelryModalContent");
        const modalTitle = document.getElementById("jewelryModalLabel");

        modalTitle.textContent = mostExpensiveItem.title;
        modalContent.innerHTML = `
            <div class="card">
                <img src="${mostExpensiveItem.img}" class="card-img-top" alt="${mostExpensiveItem.title}" style="max-height: 200px; object-fit: cover">
                <div class="card-body">
                    <h5 class="card-title">${mostExpensiveItem.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">$${mostExpensiveItem.price.toFixed(2)}</h6>
                    <p class="card-text">${mostExpensiveItem.description}</p>
                </div>
            </div>
        `;
        new bootstrap.Modal(document.getElementById("jewelryModal")).show();
    }

    getMostExpensiveItem() {
        return this.jewelryData.reduce((prev, current) => (prev.price > current.price ? prev : current));
    }

    createJewelryCard(item) {
        return `
            <div class="col">
                <div class="card h-100 position-relative jewelry-card" data-item-id="${item.id}">
                    <img src="${item.img}" class="card-img-top" alt="${item.title}" style="max-height: 200px; object-fit: cover">
                    <span class="category-badge">${item.category}</span>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">$${item.price.toFixed(2)}</h6>
                        <p class="card-text">${item.description.substring(0, 150)}...</p>
                        <!-- Add to Cart Button -->
                        <button class="btn btn-primary w-100 add-to-cart-btn" 
                                onclick="addToCart('${item.id}', '${item.title}', ${item.price})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    sortJewelry(sortBy) {
        this.currentSort = sortBy;
        this.filteredData.sort((a, b) => {
            switch (sortBy) {
                case "price":
                    return b.price - a.price;
                case "material":
                    return a.material.localeCompare(b.material);
                case "popularity":
                    return b.views - a.views;
                default:
                    return 0;
            }
        });
        this.displayJewelry();
    }

    filterByCategory(category) {
        document.querySelectorAll(".category-item").forEach(item =>
            item.classList.toggle("active", item.dataset.category === category)
        );

        this.currentCategory = category;
        this.currentCategoryTitle.textContent = category === "All" ? "All Jewelry" : `${category} Collection`;

        this.filteredData = category === "All" ? [...this.jewelryData] : this.jewelryData.filter(item => item.category === category);

        console.log(`Filtered Data for ${category}:`, this.filteredData);
        this.sortJewelry(this.currentSort);
    }

    displayJewelry() {
        if (!this.container) {
            console.error("❌ Контейнер `jewelryContent` не найден.");
            return;
        }

        if (!this.filteredData.length) {
            this.container.innerHTML = `<p class="text-center">No items available in this category.</p>`;
        } else {
            this.container.innerHTML = this.filteredData.map(item => this.createJewelryCard(item)).join("");
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("jewelry.json");
        const jewelryData = await response.json();

        const items = jewelryData.items || jewelryData.articles || jewelryData;
        if (!Array.isArray(items)) throw new Error("Invalid JSON structure");

        new JewelryManager(items);
    } catch (error) {
        console.error("Error loading jewelry items:", error);
    }
});



class AuthManager {
    constructor() {
      this.apiUrl = "http://localhost:5000";
      this.token = localStorage.getItem("token") || null;
      this.user = JSON.parse(localStorage.getItem("user")) || null;
      this.init();
    }
  
    async register(name, email, password) {
      const res = await fetch(`${this.apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      return res.json();
    }
  
    async login(email, password) {
      const res = await fetch(`${this.apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        this.token = data.token;
        this.user = data.user;
        this.updateUI();
      } else {
        alert(data.error);
      }
    }
  
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.token = null;
      this.user = null;
      this.updateUI();
    }
  
    updateUI() {
      const authSection = document.getElementById("authSection");
      if (this.user) {
        authSection.innerHTML = `<span>Welcome, ${this.user.name}</span> 
          <button class="btn btn-outline-light ms-2" onclick="authManager.logout()">Logout</button>`;
      } else {
        authSection.innerHTML = `<button class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>`;
      }
    }
  
    init() {
      this.updateUI();
    }
  }
  
  const authManager = new AuthManager();

class ThemeManager {
    constructor() {
        this.body = document.body;
        this.toggleBtn = document.getElementById("toggleMode");
        this.currentTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        this.icons = { light: "fa-sun", dark: "fa-moon" };
        this.applyTheme(this.currentTheme);
    }

    applyTheme(theme) {
        this.body.classList.toggle("bg-light", theme === "light");
        this.body.classList.toggle("bg-dark", theme === "dark");
        this.toggleBtn.innerHTML = `<i class="fa ${this.icons[theme]}"></i>`;
        localStorage.setItem("theme", theme);
    }

    init() {
        this.toggleBtn.addEventListener("click", () => {
            this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
            this.applyTheme(this.currentTheme);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => new ThemeManager().init());