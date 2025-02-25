Jewelry Store Project
This project is an online jewelry store built using HTML, CSS, JavaScript, and Bootstrap. It allows users to browse jewelry collections, filter items by category, sort them by price, material, or popularity, and add products to a shopping cart. The project also includes user authentication (login/signup) and a responsive design for seamless use on all devices.

Key Features
Product Browsing:

Users can view jewelry items organized into categories (e.g., Necklaces, Bracelets, Rings).

Each item is displayed with an image, title, price, description, and an "Add to Cart" button.

Sorting:

Items can be sorted by:

Price (low to high).

Material (alphabetically).

Popularity (based on views).

Category Filtering:

Users can filter items by category using the sidebar.

Shopping Cart:

Users can add items to the cart and view them in a modal.

The cart displays the total cost of selected items.

User Authentication:

Users can register and log in.

After logging in, a welcome message with the user's name is displayed.

Responsive Design:

The website is fully responsive and works seamlessly on desktops, tablets, and mobile devices.

Dark/Light Theme:

The website supports a dark theme for better user experience in low-light environments.

Technologies Used
Frontend:

HTML5

CSS3 (with custom animations and gradients)

JavaScript (for interactivity and dynamic content)

Bootstrap (for styling and responsive design)

Backend:

Local storage (for cart and user session management)

APIs:

Fetch API for loading JSON data (e.g., jewelry items).

How to Run the Project
Clone the Repository:

bash
Copy
git clone https://github.com/your-username/jewelry-store.git
cd jewelry-store
Open the Project:

Open the index.html file in your browser.

JSON Data:

Ensure the jewelry.json file is placed in the project root directory and contains the jewelry items data.

Run a Local Server (Optional):

If you encounter CORS issues while loading the JSON file, use a local server. For example:

bash
Copy
python -m http.server 8000
Then open http://localhost:8000 in your browser.

Project Structure
Copy
jewelry-store/
├── index.html            # Main HTML file
├── style.css             # Custom CSS styles
├── index.js              # Main JavaScript file
├── cart.js               # Cart functionality
├── jewelry.json          # JSON file containing jewelry data
├── README.md             # Project documentation
└── assets/               # Folder for images and other assets
Code Overview
HTML (index.html)
The main structure of the website, including:

Header with a sidebar toggle button.

Sidebar for category filtering.

Main content area for displaying jewelry items.

Modals for login, signup, and cart.

CSS (style.css)
Custom styles for:

Animations (e.g., gradient background, hover effects).

Responsive design (e.g., sidebar for mobile devices).

Dark/light theme support.

JavaScript (index.js)
Handles:

Loading and displaying jewelry items from jewelry.json.

Sorting and filtering functionality.

User authentication (login/signup).

Cart management.

JSON (jewelry.json)
Contains the jewelry items data, including:

id, title, category, material, price, views, description, and img.