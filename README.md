# 🛍️ Bazario — Shopping App

A modern, responsive and feature-rich **React e-commerce web application** built with React and Vite.

Bazario provides a complete shopping experience with product discovery, search and filtering, product details, related products, wishlist, cart management, checkout, mock payment, order history, product reviews, and persistent dark/light themes.

---

## 🌐 Live Demo

🚀 **Live Website:**  
https://shopping-app-flax.vercel.app/

💻 **GitHub Repository:**  
https://github.com/ankitparmanik65-crypto/Shopping-App

---

## ✨ Features

### 🛍️ Product Browsing

- Browse a large collection of products
- Product cards with images, prices and ratings
- Category-based product filtering
- Product search
- Dynamic product count
- Load More Products functionality
- Responsive product grid
- Realistic demo product data
- Product-specific images

---

### 🔎 Search & Category Filtering

- Search products by name
- Filter products by category
- Search results update instantly
- Clear search button
- Dynamic product count
- Category filter buttons
- Search and category filtering work together

---

### 📦 Product Details

Each product has a dedicated Product Details section.

Features include:

- Product image
- Product name
- Product price
- Product category
- Product description
- Product rating
- Add to Cart
- Buy Now
- Add to Wishlist
- Remove from Wishlist
- Customer Reviews
- Related Products

---

### 🔗 Related Products

The Product Details page includes a **"You May Also Like"** section.

Related products are selected based on:

- Same product category
- Product rating
- Current product exclusion
- Fallback products when required

Users can click a related product and directly open its Product Details.

---

### ↩️ Smart Back Navigation

The product details navigation preserves the user's previous product-list scroll position.

Example:

```text
Product List
     ↓
User scrolls down
     ↓
Clicks a product
     ↓
Product Details
     ↓
Clicks Back
     ↓
Returns to the previous product position

This makes product browsing smoother and more user-friendly.


❤️ Wishlist

Users can save products for later.

Features:

- Add product to wishlist
- Remove product from wishlist
- Wishlist count in navbar
- Open product directly from wishlist
- Wishlist data persisted using localStorage
- Wishlist works with Product Details
- Wishlist works with Related Products

🛒 Shopping Cart

Complete cart management system:

- Add products to cart
- Increase quantity
- Decrease quantity
- Remove products
- Automatic quantity updates
- Automatic cart total calculation
- Cart drawer
- Empty cart handling
- Cart data saved in localStorage
- Cart remains available after page refresh

⚡ Buy Now

A dedicated Buy Now shopping flow is available.

Product Details
      ↓
Buy Now
      ↓
Checkout
      ↓
Payment
      ↓
Order Success

Buy Now checkout is handled separately from the normal cart checkout.

💳 Checkout

The application includes a complete checkout flow.

Features:

- Customer information
- Order summary
- Product quantities
- Subtotal calculation
- Shipping calculation
- Final total
- Cart checkout
- Buy Now checkout

💰 Mock Payment

A simulated payment system is included for demonstration purposes.

Payment flow:

Checkout
   ↓
Payment Page
   ↓
Payment Success
   ↓
Order Created
   ↓
Order Success

⚠️ This is a demo/mock payment system. No real payment is processed.

📦 Order History
Users can view their previous orders.

Order history includes:

- Unique Order ID
- Customer information
- Purchased products
- Product quantities
- Subtotal
- Shipping charges
- Total amount
- Order status
Orders are stored locally using localStorage.


🚚 Order Status

The application supports order status updates.

Example:

Order Placed
      ↓
Processing
      ↓
Shipped
      ↓
Delivered

Order status can be updated from the Order History interface.


⭐ Product Reviews
A product review system has been added to the Product Details page.

Features include:

⭐ Star rating
Customer name
Review text
Review submission
Review list
Review count
Overall product rating
Interactive rating selector
Product-specific reviews

Review flow:

Product Details
      ↓
Product Rating
      ↓
Customer Reviews
      ↓
Write a Review
      ↓
Submit Review


🌙 Dark / Light Mode
The application includes a polished dark/light theme system.

☀️ Light Mode
- Clean light interface
- Light product cards
- Light search interface
- Light cart
- Light wishlist
- Light checkout

🌙 Dark Mode
- Dark background
- Dark product cards
- Dark search interface
- Dark category filters
- Dark cart drawer
- Dark wishlist
- Dark reviews
- Dark product details
- Dark checkout

Theme preference is saved using localStorage, so the selected theme remains after refreshing the page.


📱 Responsive Design

Bazario is designed to work across different screen sizes.

Supported devices:

📱 Mobile
📲 Tablet
💻 Laptop
🖥️ Desktop

The product grid, product details, cart, wishlist, reviews, checkout and navigation adapt to smaller screens.


💾 Local Storage
The application uses browser localStorage for demo persistence.

The following data can be stored locally:

🛒 Cart
❤️ Wishlist
📦 Orders
🌙 Theme Preference

This allows the shopping experience to remain available after refreshing the browser.

🧰 Tech Stack

| Category          | Technology              |
| ----------------- | ----------------------- |
| Frontend          | React 19                |
| Build Tool        | Vite                    |
| Styling           | CSS                     |
| Icons             | Lucide React            |
| State Management  | React Hooks             |
| Local Persistence | LocalStorage            |
| Product Data      | Demo Product Data / API |
| Linting           | ESLint                  |
| Deployment        | Vercel                  |
| Version Control   | Git & GitHub            |


📁 Project Structure
Shopping-App/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Navbar.jsx
│   │   ├── OrderHistory.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── PaymentPage.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetails.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

🛒 Complete Shopping Flow
                ┌─────────────────┐
                │  Product List   │
                └────────┬────────┘
                         ↓
              ┌─────────────────────┐
              │ Search / Categories │
              └──────────┬──────────┘
                         ↓
               ┌──────────────────┐
               │ Product Details  │
               └───────┬──────────┘
                       ↓
          ┌────────────┼────────────┐
          ↓            ↓            ↓
     Add to Cart    Buy Now     Wishlist
          ↓            ↓
        Cart       Checkout
          ↓            ↓
       Checkout   Mock Payment
          ↓            ↓
       Payment ←───────┘
          ↓
     Order Success
          ↓
     Order History


🔗 Related Product Flow
Product Details
      ↓
You May Also Like
      ↓
Related Product
      ↓
New Product Details
      ↓
More Related Products


🚀 Getting Started

1. Clone the repository
    git clone https://github.com/ankitparmanik65-crypto/Shopping-App.git
2. Enter the project directory
    cd Shopping-App
3. Install dependencies
    npm install
4. Start the development server
    npm run dev

The application will normally run at:
http://localhost:5173


🏗️ Production Build

Create a production build:
npm run build

Preview the production build:
npm run preview


🚀 Deployment

This project is deployed using Vercel.

Live Application :- https://shopping-app-flax.vercel.app/

The GitHub repository can be connected to Vercel for automatic deployments whenever changes are pushed to the main branch.

🔐 Payment Disclaimer

- This project contains a mock payment system intended only for learning, demonstration and portfolio purposes.
- No real payment is processed.
- Do not enter real payment or banking information into the demo application.


📈 Future Improvements

Possible future improvements include:

🔐 User Authentication
👤 User Profiles
☁️ Backend Database
🗄️ REST API
🔥 Advanced Product Recommendations
⭐ Review Moderation
🏷️ Coupon & Discount System
📍 Address Management
🚚 Advanced Delivery Tracking
📧 Email Order Confirmation
🔔 Notifications
📊 Admin Dashboard
📈 Sales Analytics
💳 Real Payment Gateway
🧾 Invoice Generation
🔍 Advanced Product Search
📑 Product Pagination
🖼️ Product Image Gallery

🤝 Contributing
Contributions, issues and feature requests are welcome!
1. Fork the repository
2. Create your feature branch
    git checkout -b feature/amazing-feature
3. Commit your changes
    git add .
    git commit -m "Add amazing feature"
4. Push to the branch
    git push origin feature/amazing-feature
5. Open a Pull Request


📄 License

This project currently does not have a license specified.

If you want to open-source the project, you can add an appropriate license such as MIT.

👨‍💻 Author
Ankit Parmanik

GitHub:

https://github.com/ankitparmanik65-crypto

⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.

Every star is appreciated! ❤️

🔗 Project Links

🌐 Live Demo:
https://shopping-app-flax.vercel.app/

💻 GitHub Repository:
https://github.com/ankitparmanik65-crypto/Shopping-App
