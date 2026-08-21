function OrderSuccess({ order, onContinue }) {
  const orderDate = new Date();

  return (
    <div className="success-page">

      <div className="success-card">

        {/* Success Icon */}

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p className="success-message">
          Thank you for your order. Your order has
          been received successfully.
        </p>

        {/* Order Information */}

        <div className="order-info">

          <div>
            <span>Order ID</span>

            <strong>
              {order.id}
            </strong>
          </div>

          <div>
            <span>Order Date</span>

            <strong>
              {orderDate.toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </strong>
          </div>

          <div>
            <span>Total Amount</span>

            <strong>
              ₹{order.total}
            </strong>
          </div>

        </div>

        {/* Ordered Items */}

        <div className="success-items">

          <h2>
            Order Summary
          </h2>

          {order.items.map((item) => (
            <div
              className="success-item"
              key={item.id}
            >

              <div className="success-item-info">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    Quantity: {item.quantity}
                  </span>
                </div>

              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>
          ))}

        </div>

        {/* Price Breakdown */}

        <div className="success-price-summary">

          <div>
            <span>
              Subtotal
            </span>

            <strong>
              ₹{order.subtotal}
            </strong>
          </div>

          <div>
            <span>
              Shipping
            </span>

            <strong>
              {order.shipping === 0
                ? "FREE"
                : `₹${order.shipping}`}
            </strong>
          </div>

          <div className="success-total">

            <span>
              Total
            </span>

            <strong>
              ₹{order.total}
            </strong>

          </div>

        </div>

        {/* Status */}

        <div className="order-status">
          <span className="status-dot">
            ✓
          </span>

          <span>
            Order Placed Successfully
          </span>
        </div>

        {/* Continue */}

        <button
          className="continue-button"
          onClick={onContinue}
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;