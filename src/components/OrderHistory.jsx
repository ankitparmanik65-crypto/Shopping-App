function OrderHistory({ orders, onBack, updateOrderStatus }) {
  const statuses = [
    "Order Placed",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <div className="orders-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="orders-header">

        <button onClick={onBack}>
          ← Back to Shopping
        </button>

        <h1>My Orders</h1>

      </div>


      {/* =========================
          NO ORDERS
      ========================= */}

      {orders.length === 0 ? (

        <div className="no-orders">

          <div className="no-orders-icon">
            📦
          </div>

          <h2>No orders yet</h2>

          <p>
            Your placed orders will appear here.
          </p>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => {

            const currentStatus =
              order.status || "Order Placed";

            const currentStep =
              statuses.indexOf(currentStatus);

            return (

              <div
                className="order-card"
                key={order.id}
              >

                {/* =========================
                    ORDER HEADER
                ========================= */}

                <div className="order-card-header">

                  <div className="order-id-section">

                    <span>
                      Order ID
                    </span>

                    <strong>
                      {order.id}
                    </strong>

                  </div>

                  <span className="order-status">
                    <span className="status-small-dot"></span>
                    {currentStatus}
                  </span>

                </div>


                {/* =========================
                    ORDER ITEMS
                ========================= */}

                <div className="order-items">

                  {order.items.map((item) => (

                    <div
                      className="order-item"
                      key={item.id}
                    >

                      <div className="order-item-name">

                        <span>
                          {item.name}
                        </span>

                        <small>
                          × {item.quantity}
                        </small>

                      </div>

                      <strong>
                        ₹{item.price * item.quantity}
                      </strong>

                    </div>

                  ))}

                </div>

                {/* =========================
                    ORDER TOTAL
                ========================= */}

                <div className="order-total">

                  <span>
                    Grand Total
                  </span>

                  <strong>
                    ₹{order.total}
                  </strong>

                </div>


                {/* =========================
                    ORDER TRACKING
                ========================= */}

                <div className="order-tracking">

                  <h3>
                    📦 Order Tracking
                  </h3>

                  <div className="tracking-steps">

                    {statuses.map((status, index) => {

                      const isCompleted =
                        index < currentStep;

                      const isCurrent =
                        index === currentStep;

                      const isActive =
                        index <= currentStep;

                      return (

                        <div
                          className={`tracking-wrapper ${
                            isActive ? "active" : ""
                          }`}
                          key={status}
                        >

                          <div
                            className={`tracking-step ${
                              isActive
                                ? "active"
                                : ""
                            } ${
                              isCurrent
                                ? "current"
                                : ""
                            }`}
                          >

                            <div className="tracking-dot">

                              {isCompleted || isCurrent
                                ? "✓"
                                : index + 1}

                            </div>

                            <span>
                              {status}
                            </span>

                          </div>


                          {/* CONNECTING LINE */}

                          {index < statuses.length - 1 && (

                            <div
                              className={`tracking-line ${
                                index < currentStep
                                  ? "active"
                                  : ""
                              }`}
                            />

                          )}

                        </div>

                      );
                    })}

                  </div>

                </div>


                {/* =========================
                    UPDATE STATUS
                ========================= */}

                <div className="update-status">

                  <div className="update-status-label">

                    <span className="update-icon">
                      ⚙
                    </span>

                    <label>
                      Update Order Status
                    </label>

                  </div>

                  <select
                    value={currentStatus}
                    onChange={(e) =>
                      updateOrderStatus(
                        order.id,
                        e.target.value
                      )
                    }
                  >

                    {statuses.map((status) => (

                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>

                    ))}

                  </select>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}

export default OrderHistory;