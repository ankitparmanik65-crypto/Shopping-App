import { useEffect, useRef, useState } from "react";

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
  // PRODUCTS
  // =========================

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [skip, setSkip] = useState(0);

  const PRODUCTS_PER_LOAD = 194;

  const [hasMoreProducts, setHasMoreProducts] =
    useState(true);

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
    const savedOrders =
      localStorage.getItem("orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });

  const [order, setOrder] = useState(null);

  // =========================
  // UI STATES
  // =========================

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [isCheckoutOpen, setIsCheckoutOpen] =
    useState(false);

  const [isPaymentOpen, setIsPaymentOpen] =
    useState(false);

  const [isOrdersOpen, setIsOrdersOpen] =
    useState(false);

  const [isWishlistOpen, setIsWishlistOpen] =
    useState(false);

  // =========================
  // CHECKOUT CART
  // =========================

  const [checkoutCart, setCheckoutCart] =
    useState([]);

  const [isBuyNow, setIsBuyNow] =
    useState(false);

  // =========================
  // CUSTOMER DATA
  // =========================

  const [pendingCustomer, setPendingCustomer] =
    useState(null);

  // =========================
  // SELECTED PRODUCT
  // =========================

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // =========================
  // SAVE PRODUCT LIST SCROLL
  // =========================

  const productListScrollY =
    useRef(0);

  // =========================
  // WISHLIST
  // =========================

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist =
      localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const wishlistCount = wishlist.length;

  // =========================
  // PRODUCT REVIEWS
  // =========================

  const [reviews, setReviews] = useState(() => {
    const savedReviews =
      localStorage.getItem(
        "productReviews"
      );

    return savedReviews
      ? JSON.parse(savedReviews)
      : {};
  });

  // =========================
  // SAVE REVIEWS
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "productReviews",
      JSON.stringify(reviews)
    );
  }, [reviews]);

  // =========================
  // GET PRODUCT REVIEWS
  // =========================

  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  // =========================
  // ADD PRODUCT REVIEW
  // =========================

  const addReview = (
    productId,
    reviewData
  ) => {
    setReviews((currentReviews) => {
      const productReviews =
        currentReviews[productId] || [];

      const newReview = {
        id: `review-${Date.now()}`,
        name: reviewData.name,
        rating: Number(
          reviewData.rating
        ),
        comment:
          reviewData.comment,
        date: new Date().toLocaleDateString(
          "en-IN"
        ),
      };

      return {
        ...currentReviews,

        [productId]: [
          newReview,
          ...productReviews,
        ],
      };
    });
  };

  // =========================
  // DELETE PRODUCT REVIEW
  // =========================

  const deleteReview = (
    productId,
    reviewId
  ) => {
    setReviews((currentReviews) => {
      const productReviews =
        currentReviews[productId] || [];

      return {
        ...currentReviews,

        [productId]:
          productReviews.filter(
            (review) =>
              review.id !== reviewId
          ),
      };
    });
  };

  // =========================
  // DARK MODE EFFECT
  // =========================

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode
        ? "dark"
        : "light"
    );

    localStorage.setItem(
      "theme",
      isDarkMode
        ? "dark"
        : "light"
    );
  }, [isDarkMode]);

  // =========================
  // LOAD PRODUCTS FROM API
  // =========================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError("");

        const response =
          await fetch(
            `https://dummyjson.com/products?limit=${PRODUCTS_PER_LOAD}&skip=${skip}`
          );

        if (!response.ok) {
          throw new Error(
            "Failed to load products"
          );
        }

        const data =
          await response.json();

        const formattedProducts =
          data.products.map(
            (product) => ({
              id: product.id,

              name: product.title,

              price: Math.round(
                product.price * 83
              ),

              category:
                product.category,

              image:
                product.thumbnail,

              description:
                product.description,

              rating:
                product.rating,
            })
          );

        setProducts(
          (currentProducts) => {
            const existingIds =
              new Set(
                currentProducts.map(
                  (product) =>
                    product.id
                )
              );

            const newProducts =
              formattedProducts.filter(
                (product) =>
                  !existingIds.has(
                    product.id
                  )
              );

            return [
              ...currentProducts,
              ...newProducts,
            ];
          }
        );

        setHasMoreProducts(
          skip +
            PRODUCTS_PER_LOAD <
            data.total
        );
      } catch (error) {
        console.error(
          "Product loading error:",
          error
        );

        setProductsError(
          "Unable to load products. Please try again."
        );
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, [skip]);

  // =========================
  // SEARCH
  // =========================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // =========================
  // SAVE ORDERS
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // =========================
  // CART COUNT
  // =========================

  const cartCount = cart.length;

  // =========================
  // CART TOTAL
  // =========================

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      item.price *
        item.quantity,
    0
  );

  // =========================
  // CHECKOUT TOTAL
  // =========================

  const checkoutTotal =
    checkoutCart.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    );

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),
  ];

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts =
    products.filter(
      (product) => {
        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesCategory =
          selectedCategory ===
            "All" ||
          product.category ===
            selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  // =========================
  // RELATED PRODUCTS
  // =========================

  const getRelatedProducts = (
    currentProduct
  ) => {
    if (!currentProduct) {
      return [];
    }

    const sameCategoryProducts =
      products.filter(
        (product) =>
          product.id !==
            currentProduct.id &&
          product.category ===
            currentProduct.category
      );

    const sortedSameCategoryProducts =
      [
        ...sameCategoryProducts,
      ].sort(
        (a, b) =>
          (b.rating || 0) -
          (a.rating || 0)
      );

    if (
      sortedSameCategoryProducts.length >=
      4
    ) {
      return sortedSameCategoryProducts.slice(
        0,
        4
      );
    }

    const usedIds = new Set(
      sortedSameCategoryProducts.map(
        (product) =>
          product.id
      )
    );

    const otherProducts =
      products
        .filter(
          (product) =>
            product.id !==
              currentProduct.id &&
            !usedIds.has(
              product.id
            )
        )
        .sort(
          (a, b) =>
            (b.rating || 0) -
            (a.rating || 0)
        );

    return [
      ...sortedSameCategoryProducts,
      ...otherProducts,
    ].slice(0, 4);
  };

  const relatedProducts =
    selectedProduct
      ? getRelatedProducts(
          selectedProduct
        )
      : [];

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (
    product
  ) => {
    setCart(
      (currentCart) => {
        const existingProduct =
          currentCart.find(
            (item) =>
              item.id ===
              product.id
          );

        if (existingProduct) {
          return currentCart.map(
            (item) =>
              item.id ===
              product.id
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      1,
                  }
                : item
          );
        }

        return [
          ...currentCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
    );
  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (
    id
  ) => {
    setCart(
      (currentCart) =>
        currentCart.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    1,
                }
              : item
        )
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (
    id
  ) => {
    setCart(
      (currentCart) =>
        currentCart
          .map(
            (item) =>
              item.id === id
                ? {
                    ...item,
                    quantity:
                      item.quantity -
                      1,
                  }
                : item
          )
          .filter(
            (item) =>
              item.quantity > 0
          )
    );
  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = (
    id
  ) => {
    setCart(
      (currentCart) =>
        currentCart.filter(
          (item) =>
            item.id !== id
        )
    );
  };

  // =========================
  // ADD TO WISHLIST
  // =========================

  const addToWishlist = (
    product
  ) => {
    setWishlist(
      (currentWishlist) => {
        const alreadyExists =
          currentWishlist.some(
            (item) =>
              item.id ===
              product.id
          );

        if (alreadyExists) {
          return currentWishlist;
        }

        return [
          ...currentWishlist,
          product,
        ];
      }
    );
  };

  // =========================
  // REMOVE FROM WISHLIST
  // =========================

  const removeFromWishlist = (
    id
  ) => {
    setWishlist(
      (currentWishlist) =>
        currentWishlist.filter(
          (item) =>
            item.id !== id
        )
    );
  };

  // =========================
  // BUY NOW
  // =========================

  const handleBuyNow = (
    product
  ) => {
    const buyNowItem = {
      ...product,
      quantity: 1,
    };

    setCheckoutCart([
      buyNowItem,
    ]);

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

  const handleCartCheckout =
    () => {
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

  const handleProceedToPayment =
    (customerData) => {
      setPendingCustomer(
        customerData
      );

      setIsCheckoutOpen(false);

      setIsPaymentOpen(true);
    };

  // =========================
  // PAYMENT SUCCESS
  // =========================

  const handlePaymentSuccess =
    (paymentId) => {
      console.log(
        "Payment successful:",
        paymentId
      );

      handleOrderPlaced(
        pendingCustomer
      );
    };

  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const updateOrderStatus = (
    orderId,
    newStatus
  ) => {
    setOrders(
      (currentOrders) =>
        currentOrders.map(
          (order) =>
            order.id === orderId
              ? {
                  ...order,
                  status:
                    newStatus,
                }
              : order
        )
    );
  };

  // =========================
  // PLACE ORDER
  // =========================

  const handleOrderPlaced =
    (customerData) => {
      const subtotal =
        checkoutCart.reduce(
          (sum, item) =>
            sum +
            item.price *
              item.quantity,
          0
        );

      const shipping =
        subtotal >= 5000
          ? 0
          : 99;

      const total =
        subtotal +
        shipping;

      const newOrder = {
        id: `ORD-${Date.now()}`,

        customer:
          customerData,

        items:
          checkoutCart,

        subtotal,

        shipping,

        total,

        status:
          "Order Placed",
      };

      setOrders(
        (currentOrders) => [
          newOrder,
          ...currentOrders,
        ]
      );

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

  const handleContinueShopping =
    () => {
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

      setSelectedCategory(
        "All"
      );
    };

  // =========================
  // PRODUCT DETAILS
  // =========================

  const handleProductClick = (
    product
  ) => {
    productListScrollY.current =
      window.scrollY;

    setSelectedProduct(product);

    setIsOrdersOpen(false);
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setIsPaymentOpen(false);
    setIsWishlistOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  // =========================
  // BACK FROM PRODUCT DETAILS
  // =========================

  const handleBackFromProduct =
    () => {
      setSelectedProduct(null);

      requestAnimationFrame(
        () => {
          window.scrollTo({
            top:
              productListScrollY.current,
            behavior: "auto",
          });
        }
      );
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
        <OrderSuccess
          order={order}
          onContinue={
            handleContinueShopping
          }
        />
      ) : (
        <>
          {/* =========================
              NAVBAR
          ========================= */}

          <Navbar
            cartCount={cartCount}
            wishlistCount={
              wishlistCount
            }
            isDarkMode={
              isDarkMode
            }
            onThemeToggle={() =>
              setIsDarkMode(
                (prev) => !prev
              )
            }
            onWishlistClick={() => {
              setIsWishlistOpen(
                true
              );

              setIsOrdersOpen(
                false
              );

              setIsCartOpen(
                false
              );

              setIsCheckoutOpen(
                false
              );

              setIsPaymentOpen(
                false
              );

              setSelectedProduct(
                null
              );
            }}
            onCartClick={() => {
              setIsOrdersOpen(
                false
              );

              setIsWishlistOpen(
                false
              );

              setSelectedProduct(
                null
              );

              setIsCartOpen(
                (prev) => !prev
              );
            }}
            onOrdersClick={() => {
              setIsCartOpen(
                false
              );

              setIsWishlistOpen(
                false
              );

              setIsCheckoutOpen(
                false
              );

              setIsPaymentOpen(
                false
              );

              setSelectedProduct(
                null
              );

              setIsOrdersOpen(
                true
              );
            }}
          />

          {/* =========================
              MAIN CONTENT
          ========================= */}

          {!isCheckoutOpen &&
            !isPaymentOpen && (
              <main className="container">

                {/* =========================
                    PRODUCT DETAILS
                ========================= */}

                {selectedProduct ? (
                  <>
                    <ProductDetails
                      product={
                        selectedProduct
                      }

                      addToCart={
                        addToCart
                      }

                      onBuyNow={
                        handleBuyNow
                      }

                      onBack={
                        handleBackFromProduct
                      }

                      wishlist={
                        wishlist
                      }

                      addToWishlist={
                        addToWishlist
                      }

                      removeFromWishlist={
                        removeFromWishlist
                      }

                      reviews={
                        getProductReviews(
                          selectedProduct.id
                        )
                      }

                      addReview={
                        addReview
                      }

                      deleteReview={
                        deleteReview
                      }
                    />

                    {/* =========================
                        RELATED PRODUCTS
                    ========================= */}

                    {relatedProducts.length >
                      0 && (
                      <section className="related-products">

                        <div className="related-products-header">

                          <h2>
                            You May Also
                            Like
                          </h2>

                          <p>
                            More products
                            from{" "}
                            {
                              selectedProduct.category
                            }
                          </p>

                        </div>

                        <div className="product-grid">

                          {relatedProducts.map(
                            (
                              product
                            ) => (
                              <ProductCard
                                key={
                                  product.id
                                }

                                product={
                                  product
                                }

                                addToCart={
                                  addToCart
                                }

                                onProductClick={
                                  handleProductClick
                                }

                                onBuyNow={
                                  handleBuyNow
                                }

                                wishlist={
                                  wishlist
                                }

                                addToWishlist={
                                  addToWishlist
                                }

                                removeFromWishlist={
                                  removeFromWishlist
                                }
                              />
                            )
                          )}

                        </div>

                      </section>
                    )}
                  </>
                ) : isWishlistOpen ? (

                  /* =========================
                     WISHLIST
                  ========================= */

                  <Wishlist
                    wishlist={
                      wishlist
                    }

                    removeFromWishlist={
                      removeFromWishlist
                    }

                    onProductClick={
                      handleProductClick
                    }

                    onBack={() =>
                      setIsWishlistOpen(
                        false
                      )
                    }
                  />

                ) : (

                  <>
                    {/* =========================
                        PRODUCTS
                    ========================= */}

                    {!isOrdersOpen && (
                      <>

                        <div className="page-title">

                          <h1>
                            Discover Our
                            Products
                          </h1>

                          <p>
                            Find something
                            you’ll love.
                          </p>

                        </div>

                        {/* =========================
                            SEARCH
                        ========================= */}

                        <div className="search-container">

                          <input
                            type="text"
                            placeholder="Search products..."
                            value={
                              searchTerm
                            }

                            onChange={(
                              e
                            ) =>
                              setSearchTerm(
                                e.target.value
                              )
                            }
                          />

                          {searchTerm && (
                            <button
                              className="clear-search"
                              onClick={() =>
                                setSearchTerm(
                                  ""
                                )
                              }
                            >
                              ✕
                            </button>
                          )}

                        </div>

                        {/* =========================
                            CATEGORY
                        ========================= */}

                        <div className="category-filters">

                          {categories.map(
                            (
                              category
                            ) => (
                              <button
                                key={
                                  category
                                }

                                className={
                                  selectedCategory ===
                                  category
                                    ? "category-button active"
                                    : "category-button"
                                }

                                onClick={() =>
                                  setSelectedCategory(
                                    category
                                  )
                                }
                              >
                                {
                                  category
                                }
                              </button>
                            )
                          )}

                        </div>

                        {/* =========================
                            PRODUCT COUNT
                        ========================= */}

                        <div className="product-count">

                          Showing{" "}
                          {
                            filteredProducts.length
                          }{" "}
                          {filteredProducts.length ===
                          1
                            ? "product"
                            : "products"}

                        </div>

                        {/* =========================
                            PRODUCT GRID
                        ========================= */}

                        <div className="product-grid">

                          {productsLoading &&
                          products.length ===
                            0 ? (

                            <div className="no-products">

                              <h2>
                                Loading
                                products...
                              </h2>

                              <p>
                                Please
                                wait.
                              </p>

                            </div>

                          ) : productsError ? (

                            <div className="no-products">

                              <h2>
                                Something
                                went wrong
                              </h2>

                              <p>
                                {
                                  productsError
                                }
                              </p>

                            </div>

                          ) : filteredProducts.length >
                            0 ? (

                            filteredProducts.map(
                              (
                                product
                              ) => (
                                <ProductCard
                                  key={
                                    product.id
                                  }

                                  product={
                                    product
                                  }

                                  addToCart={
                                    addToCart
                                  }

                                  onProductClick={
                                    handleProductClick
                                  }

                                  onBuyNow={
                                    handleBuyNow
                                  }

                                  wishlist={
                                    wishlist
                                  }

                                  addToWishlist={
                                    addToWishlist
                                  }

                                  removeFromWishlist={
                                    removeFromWishlist
                                  }
                                />
                              )
                            )

                          ) : (

                            <div className="no-products">

                              <h2>
                                No products
                                found
                              </h2>

                              <p>
                                Try searching
                                for something
                                else.
                              </p>

                            </div>

                          )}

                        </div>

                        {/* =========================
                            LOAD MORE
                        ========================= */}

                        {!searchTerm &&
                          hasMoreProducts &&
                          !productsLoading && (

                            <div className="load-more-container">

                              <button
                                className="load-more-button"

                                onClick={() =>
                                  setSkip(
                                    (
                                      currentSkip
                                    ) =>
                                      currentSkip +
                                      PRODUCTS_PER_LOAD
                                  )
                                }
                              >
                                Load More
                                Products
                              </button>

                            </div>

                          )}

                        {/* =========================
                            LOADING MORE
                        ========================= */}

                        {productsLoading &&
                          products.length >
                            0 && (

                            <p className="loading-more">
                              Loading more
                              products...
                            </p>

                          )}

                      </>
                    )}

                    {/* =========================
                        ORDER HISTORY
                    ========================= */}

                    {isOrdersOpen && (

                      <OrderHistory
                        orders={
                          orders
                        }

                        onBack={() =>
                          setIsOrdersOpen(
                            false
                          )
                        }

                        updateOrderStatus={
                          updateOrderStatus
                        }
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

                    onClick={() =>
                      setIsCartOpen(
                        false
                      )
                    }
                  >

                    <div
                      className="cart-drawer"

                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >

                      <div className="cart-drawer-header">

                        <h2>
                          🛒 Your Cart
                        </h2>

                        <button
                          className="close-cart"

                          onClick={() =>
                            setIsCartOpen(
                              false
                            )
                          }
                        >
                          ✕
                        </button>

                      </div>

                      <Cart
                        cart={cart}

                        increaseQuantity={
                          increaseQuantity
                        }

                        decreaseQuantity={
                          decreaseQuantity
                        }

                        removeFromCart={
                          removeFromCart
                        }

                        onCheckout={
                          handleCartCheckout
                        }
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
              cart={
                checkoutCart
              }

              onClose={() => {
                setIsCheckoutOpen(
                  false
                );

                setCheckoutCart(
                  []
                );

                setIsBuyNow(
                  false
                );
              }}

              onOrderPlaced={
                handleProceedToPayment
              }
            />

          )}

          {/* =========================
              PAYMENT PAGE
          ========================= */}

          {isPaymentOpen && (

            <PaymentPage
              amount={
                checkoutTotal
              }

              orderItems={checkoutCart.map(
                (item) => ({
                  name:
                    item.name,

                  qty:
                    item.quantity,

                  price:
                    item.price *
                    item.quantity,
                })
              )}

              onSuccess={
                handlePaymentSuccess
              }

              onBack={() => {
                setIsPaymentOpen(
                  false
                );

                setIsCheckoutOpen(
                  true
                );
              }}
            />

          )}

        </>
      )}
    </div>
  );
}

export default App;