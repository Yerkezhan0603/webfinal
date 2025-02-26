# Jewelry Store Project

Welcome to the **Jewelry Store**, an elegant and user-friendly online shopping platform designed with **HTML, CSS, JavaScript, and Bootstrap**. This project allows users to explore a stunning jewelry collection, filter items by category, sort them based on various attributes, and seamlessly add products to their shopping cart. The platform also supports **user authentication** and features a **responsive design** for optimal usability across all devices.

## ✨ Key Features

### 🛍️ Product Browsing
- View a diverse selection of jewelry items categorized into **Necklaces, Bracelets, Rings**, and more.
- Each product is displayed with an **image, title, price, description**, and an **"Add to Cart"** button.

### 📊 Sorting Options
Users can sort products based on:
- **Price** (Low to High)
- **Material** (Alphabetically)
- **Popularity** (Based on Views)

### 📂 Category Filtering
- Easily filter jewelry items using the **sidebar navigation**.

### 🛒 Shopping Cart
- Add items to the cart and view them in a **modal window**.
- The cart dynamically updates to display the **total cost** of selected items.

### 🔐 User Authentication
- Users can **register** and **log in** securely.
- After logging in, a **personalized welcome message** with the user's name is displayed.

### 📱 Responsive Design
- The website is fully **responsive** and adapts seamlessly to **desktops, tablets, and mobile devices**.

## 🛠️ Technologies Used

### Frontend:
- **HTML5** – Structuring the web pages.
- **CSS3** – Custom animations, gradients, and responsive design.
- **JavaScript** – Handles interactivity and dynamic content.
- **Bootstrap** – Provides styling and ensures responsiveness.

### Backend:
- **Local Storage** – Manages cart and user session data.

### APIs:
- **Fetch API** – Loads jewelry item data from a JSON file.

---

## 🚀 How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/jewelry-store.git
cd jewelry-store
```

### 2️⃣ Open the Project
Simply open the **index.html** file in your browser.

### 3️⃣ Ensure JSON Data is Available
Make sure the **jewelry.json** file is present in the project root directory and contains the jewelry items data.

### 4️⃣ Run a Local Server (Optional)
If you encounter **CORS issues** while loading the JSON file, start a local server:
```bash
python -m http.server 8000
```
Then open your browser and navigate to:
```
http://localhost:8000
```

---

## 📂 Project Structure
```
jewelry-store/
├── index.html      # Main HTML file
├── style.css       # Custom CSS styles
├── index.js        # Main JavaScript file
├── cart.js         # Handles cart functionality
├── jewelry.json    # JSON file containing jewelry data
├── README.md       # Project documentation
```

---

## 📝 Code Overview

### 📌 **HTML (index.html)**
- Defines the website's structure.
- Includes the **header, sidebar, product display area, and modals** for login, signup, and cart.

### 🎨 **CSS (style.css)**
- Custom **animations, gradients, and hover effects**.
- Ensures **responsive design** for various screen sizes.
- Supports **dark/light theme switching**.

### 📜 **JavaScript (index.js)**
- Loads and displays jewelry items from **jewelry.json**.
- Implements **sorting and filtering functionality**.
- Manages **user authentication** (login/signup).
- Handles **cart operations**.

### 📦 **JSON (jewelry.json)**
- Contains the jewelry item data, including:
  - `id`, `title`, `category`, `material`, `price`, `views`, `description`, and `img`.