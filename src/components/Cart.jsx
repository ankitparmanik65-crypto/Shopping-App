function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  onCheckout,
}) {
  const FREE_SHIPPING_LIMIT = 5000;

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= FREE_SHIPPING_LIMIT
        ? 0
        : 99;

  const total = subtotal + shipping;

  // =========================
  // FREE SHIPPING PROGRESS
  // =========================

  const remainingAmount =
    Math.max(
      FREE_SHIPPING_LIMIT - subtotal,
      0
    );

  const progress =
    Math.min(
      (subtotal / FREE_SHIPPING_LIMIT) * 100,
      100
    );

  const hasFreeShipping =
    subtotal >= FREE_SHIPPING_LIMIT;

  return (
    <div className="cart-container">

      {cart.length === 0 ? (
        /* =========================
           EMPTY CART
        ========================= */

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h3>
            Your Bazario cart is empty
          </h3>

          <p>
            Add some products to get started.
          </p>

        </div>
      ) : (
        <>
          {/* =========================
              FREE SHIPPING MESSAGE
          ========================= */}

          <div className="shipping-progress">

            {hasFreeShipping ? (
              <div className="free-shipping-success">
                🎉 Congratulations! You got FREE shipping!
              </div>
            ) : (
              <div className="shipping-progress-text">
                🚚 Add{" "}
                <strong>
                  ₹{remainingAmount}
                </strong>{" "}
                more for FREE shipping.
              </div>
            )}

            {/* Progress Bar */}

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="progress-labels">

              <span>
                ₹0
              </span>

              <span>
                ₹{FREE_SHIPPING_LIMIT}
              </span>

            </div>

          </div>

          {/* =========================
              CART ITEMS
          ========================= */}

          <div className="cart-items">

            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  className="cart-image"
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-details">

                  <h3 className="cart-product-name">
                    {item.name}
                  </h3>

                  <p className="cart-product-price">
                    ₹{item.price}
                  </p>

                  <div className="quantity-controls">

                    <button
                      className="quantity-button"
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                    >
                      −
                    </button>

                    <span className="quantity">
                      {item.quantity}
                    </span>

                    <button
                      className="quantity-button"
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="cart-item-right">

                  <strong className="cart-item-total">
                    ₹
                    {item.price *
                      item.quantity}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(
                        item.id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* =========================
              CART SUMMARY
          ========================= */}

          <div className="cart-summary">

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Shipping
              </span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </strong>

            </div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{total}
              </strong>

            </div>

            <button
              className="checkout-button"
              onClick={onCheckout}
            >
              Place Order
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;