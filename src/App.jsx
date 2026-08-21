import { useEffect, useState } from "react";

import products from "./data/products";

import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Checkout from "./components/Checkout";
import PaymentPage from "./components/PaymentPage";
import OrderSuccess from "./components/OrderSuccess";
import OrderHistory from "./components/OrderHistory";
import Wishlist from "./components/Wishlist";

import "./App.css";

function App() {
  // =========================
  // DARK MODE
  // =========================

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  // =========================
  // CART
  // =========================

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // =========================
  // ORDERS
  // =========================

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");

    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [order, setOrder] = useState(null);

  // =========================
  // UI STATES
  // =========================

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // =========================
  // CHECKOUT CART
  // =========================

  const [checkoutCart, setCheckoutCart] = useState([]);

  const [isBuyNow, setIsBuyNow] = useState(false);

  // =========================
  // CUSTOMER DATA
  // =========================

  const [pendingCustomer, setPendingCustomer] = useState(null);

  // =========================
  // SELECTED PRODUCT
  // =========================

  const [selectedProduct, setSelectedProduct] = useState(null);

  // =========================
  // WISHLIST
  // =========================

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const wishlistCount = wishlist.length;

  // =========================
  // DARK MODE EFFECT
  // =========================

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light",
    );

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // =========================
  // SEARCH
  // =========================

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // SAVE ORDERS
  // =========================

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // =========================
  // CART COUNT
  // =========================

  const cartCount = cart.length;

  // =========================
  // CART TOTAL
  // =========================

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // =========================
  // CHECKOUT TOTAL
  // =========================

  const checkoutTotal = checkoutCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  // =========================
  // ADD TO WISHLIST
  // =========================

  const addToWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const alreadyExists = currentWishlist.some(
        (item) => item.id === product.id,
      );

      if (alreadyExists) {
        return currentWishlist;
      }

      return [...currentWishlist, product];
    });
  };

  // =========================
  // REMOVE FROM WISHLIST
  // =========================

  const removeFromWishlist = (id) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== id),
    );
  };

  // =========================
  // BUY NOW
  // =========================

  const handleBuyNow = (product) => {
    const buyNowItem = {
      ...product,
      quantity: 1,
    };

    setCheckoutCart([buyNowItem]);

    setIsBuyNow(true);

    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsOrdersOpen(false);
    setIsPaymentOpen(false);

    setIsCheckoutOpen(true);
  };

  // =========================
  // NORMAL CART CHECKOUT
  // =========================

  const handleCartCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    setCheckoutCart(cart);

    setIsBuyNow(false);

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsOrdersOpen(false);
    setSelectedProduct(null);
    setIsPaymentOpen(false);

    setIsCheckoutOpen(true);
  };

  // =========================
  // CHECKOUT -> PAYMENT
  // =========================

  const handleProceedToPayment = (customerData) => {
    setPendingCustomer(customerData);

    setIsCheckoutOpen(false);

    setIsPaymentOpen(true);
  };

  // =========================
  // PAYMENT SUCCESS
  // =========================

  const handlePaymentSuccess = (paymentId) => {
    console.log("Payment successful:", paymentId);

    handleOrderPlaced(pendingCustomer);
  };

  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order,
      ),
    );
  };

  // =========================
  // PLACE ORDER
  // =========================

  const handleOrderPlaced = (customerData) => {
    const subtotal = checkoutCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const shipping = subtotal >= 5000 ? 0 : 99;

    const total = subtotal + shipping;

    const newOrder = {
      id: `ORD-${Date.now()}`,

      customer: customerData,

      items: checkoutCart,

      subtotal,

      shipping,

      total,

      status: "Order Placed",
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);

    setOrder(newOrder);

    if (!isBuyNow) {
      setCart([]);
    }

    setIsCheckoutOpen(false);
    setIsPaymentOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsOrdersOpen(false);

    setSelectedProduct(null);
    setPendingCustomer(null);
    setCheckoutCart([]);
    setIsBuyNow(false);
  };

  // =========================
  // CONTINUE SHOPPING
  // =========================

  const handleContinueShopping = () => {
    setOrder(null);

    setIsOrdersOpen(false);
    setIsWishlistOpen(false);
    setIsCheckoutOpen(false);
    setIsPaymentOpen(false);
    setIsCartOpen(false);

    setSelectedProduct(null);

    setCheckoutCart([]);

    setIsBuyNow(false);

    setSearchTerm("");

    setSelectedCategory("All");
  };

  // =========================
  // PRODUCT DETAILS
  // =========================

  const handleProductClick = (product) => {
    setSelectedProduct(product);

    setIsOrdersOpen(false);
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setIsPaymentOpen(false);
    setIsWishlistOpen(false);
  };

  // =========================
  // RETURN
  // =========================

  return (
    <div className="app">
      {/* =========================
          ORDER SUCCESS
      ========================= */}

      {order ? (
        <OrderSuccess order={order} onContinue={handleContinueShopping} />
      ) : (
        <>
          {/* =========================
              NAVBAR
          ========================= */}

          <Navbar
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            isDarkMode={isDarkMode}
            onThemeToggle={() => setIsDarkMode((prev) => !prev)}
            onWishlistClick={() => {
              setIsWishlistOpen(true);

              setIsOrdersOpen(false);
              setIsCartOpen(false);
              setIsCheckoutOpen(false);
              setIsPaymentOpen(false);
              setSelectedProduct(null);
            }}
            onCartClick={() => {
              setIsOrdersOpen(false);
              setIsWishlistOpen(false);
              setSelectedProduct(null);

              setIsCartOpen((prev) => !prev);
            }}
            onOrdersClick={() => {
              setIsCartOpen(false);
              setIsWishlistOpen(false);
              setIsCheckoutOpen(false);
              setIsPaymentOpen(false);
              setSelectedProduct(null);

              setIsOrdersOpen(true);
            }}
          />

          {/* =========================
              MAIN CONTENT
          ========================= */}

          {!isCheckoutOpen && !isPaymentOpen && (
            <main className="container">
              {/* =========================
                    PRODUCT DETAILS
                ========================= */}

              {selectedProduct ? (
                <ProductDetails
                  product={selectedProduct}
                  addToCart={addToCart}
                  onBuyNow={handleBuyNow}
                  onBack={() => setSelectedProduct(null)}
                  wishlist={wishlist}
                  addToWishlist={addToWishlist}
                />
              ) : isWishlistOpen ? (
                /* =========================
                     WISHLIST
                  ========================= */

                <Wishlist
                  wishlist={wishlist}
                  removeFromWishlist={removeFromWishlist}
                  onProductClick={handleProductClick}
                  onBack={() => setIsWishlistOpen(false)}
                />
              ) : (
                <>
                  {/* =========================
                        PRODUCTS
                    ========================= */}

                  {!isOrdersOpen && (
                    <>
                      <div className="page-title">
                        <h1>Discover Our Products</h1>

                        <p>Find something you’ll love.</p>
                      </div>

                      {/* SEARCH */}

                      <div className="search-container">
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {searchTerm && (
                          <button
                            className="clear-search"
                            onClick={() => setSearchTerm("")}
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* CATEGORY */}

                      <div className="category-filters">
                        {categories.map((category) => (
                          <button
                            key={category}
                            className={
                              selectedCategory === category
                                ? "category-button active"
                                : "category-button"
                            }
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>

                      {/* PRODUCT COUNT */}

                      <div className="product-count">
                        Showing {filteredProducts.length}{" "}
                        {filteredProducts.length === 1
                          ? "product"
                          : "products"}
                      </div>

                      {/* PRODUCT GRID */}

                      <div className="product-grid">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              addToCart={addToCart}
                              onProductClick={handleProductClick}
                              onBuyNow={handleBuyNow}
                              wishlist={wishlist}
                              addToWishlist={addToWishlist}
                              removeFromWishlist={removeFromWishlist}
                            />
                          ))
                        ) : (
                          <div className="no-products">
                            <h2>No products found</h2>

                            <p>Try searching for something else.</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* =========================
                        ORDER HISTORY
                    ========================= */}

                  {isOrdersOpen && (
                    <OrderHistory
                      orders={orders}
                      onBack={() => setIsOrdersOpen(false)}
                      updateOrderStatus={updateOrderStatus}
                    />
                  )}
                </>
              )}

              {/* =========================
                    CART DRAWER
                ========================= */}

              {isCartOpen && (
                <div
                  className="cart-overlay"
                  onClick={() => setIsCartOpen(false)}
                >
                  <div
                    className="cart-drawer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="cart-drawer-header">
                      <h2>🛒 Your Cart</h2>

                      <button
                        className="close-cart"
                        onClick={() => setIsCartOpen(false)}
                      >
                        ✕
                      </button>
                    </div>

                    <Cart
                      cart={cart}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      removeFromCart={removeFromCart}
                      onCheckout={handleCartCheckout}
                    />
                  </div>
                </div>
              )}
            </main>
          )}

          {/* =========================
              CHECKOUT PAGE
          ========================= */}

          {isCheckoutOpen && (
            <Checkout
              cart={checkoutCart}
              onClose={() => {
                setIsCheckoutOpen(false);

                setCheckoutCart([]);

                setIsBuyNow(false);
              }}
              onOrderPlaced={handleProceedToPayment}
            />
          )}

          {/* =========================
              PAYMENT PAGE
          ========================= */}

          {isPaymentOpen && (
            <PaymentPage
              amount={checkoutTotal}
              orderItems={checkoutCart.map((item) => ({
                name: item.name,
                qty: item.quantity,
                price: item.price * item.quantity,
              }))}
              onSuccess={handlePaymentSuccess}
              onBack={() => {
                setIsPaymentOpen(false);

                setIsCheckoutOpen(true);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;