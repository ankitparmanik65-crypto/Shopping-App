import { useState } from "react";

/**
 * PaymentPage — dummy payment flow for Bazario
 */

const METHODS = [
  { id: "upi", label: "UPI", hint: "Pay via any UPI app" },
  { id: "card", label: "Card", hint: "Credit or Debit card" },
  { id: "cod", label: "Cash on Delivery", hint: "Pay when it arrives" },
];

function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function PaymentPage({ amount = 0, orderItems = [], onSuccess, onBack }) {
  const [method, setMethod] = useState("upi");
  const [status, setStatus] = useState("form");
  const [error, setError] = useState("");

  // UPI
  const [upiId, setUpiId] = useState("");

  // Card
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // =========================
  // CALCULATE SHIPPING
  // =========================

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const shipping = subtotal >= 5000 ? 0 : 99;

  const finalTotal = subtotal + shipping;

  // =========================
  // VALIDATION
  // =========================

  const validate = () => {
    if (method === "upi") {
      if (!/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upiId)) {
        return "Enter a valid UPI ID, like name@bank";
      }
    }

    if (method === "card") {
      const digits = cardNumber.replace(/\s/g, "");

      if (digits.length !== 16) {
        return "Card number must be 16 digits";
      }

      if (!cardName.trim()) {
        return "Enter the name on the card";
      }

      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        return "Expiry must be in MM/YY format";
      }

      if (!/^\d{3}$/.test(cvv)) {
        return "CVV must be 3 digits";
      }
    }

    return "";
  };

  // =========================
  // SUBMIT / PAY
  // =========================

  const handlePay = (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setStatus("processing");

    setTimeout(() => {
      const fakePaymentId = "PAY-" + Date.now();

      setStatus("success");

      setTimeout(() => {
        onSuccess?.(fakePaymentId);
      }, 900);
    }, 1800);
  };

  // =========================
  // PROCESSING
  // =========================

  if (status === "processing") {
    return (
      <div className="payment-status-page">
        <div className="payment-spinner" />

        <p className="payment-status-text">
          Processing your payment…
        </p>

        <p className="payment-status-subtext">
          Don't refresh or close this tab
        </p>
      </div>
    );
  }

  // =========================
  // SUCCESS
  // =========================

  if (status === "success") {
    return (
      <div className="payment-status-page">
        <div className="payment-success-icon">
          ✓
        </div>

        <p className="payment-status-text">
          Payment successful
        </p>

        <p className="payment-status-subtext">
          Redirecting to your order…
        </p>
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (!orderItems || orderItems.length === 0) {
    return (
      <div className="payment-status-page">

        <div className="payment-empty-icon">
          🛒
        </div>

        <p className="payment-status-text">
          Your cart is empty
        </p>

        <p className="payment-status-subtext">
          Add some products before proceeding to payment.
        </p>

        <button
          className="pay-button payment-empty-button"
          onClick={onBack}
        >
          Back to Cart
        </button>

      </div>
    );
  }

  // =========================
  // FORM
  // =========================

  return (
    <div className="payment-page">

      {/* HEADER */}

      <div className="payment-header">

        <button onClick={onBack}>
          ← Back to Checkout
        </button>

      </div>

      <div className="payment-content">

        {/* =========================
            PAYMENT FORM
        ========================= */}

        <div className="payment-form-card">

          <h2>Payment</h2>

          <p className="payment-security-note">
            🔒 This is a test payment — no real money moves.
          </p>

          {/* PAYMENT METHODS */}

          <div className="payment-method-grid">

            {METHODS.map((m) => (

              <button
                key={m.id}
                type="button"
                className={
                  method === m.id
                    ? "payment-method-button active"
                    : "payment-method-button"
                }
                onClick={() => {
                  setMethod(m.id);
                  setError("");
                }}
              >
                {m.label}
              </button>

            ))}

          </div>

          <form
            onSubmit={handlePay}
            noValidate
          >

            {/* UPI */}

            {method === "upi" && (

              <div className="form-group">

                <label htmlFor="upiId">
                  UPI ID
                </label>

                <input
                  id="upiId"
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) =>
                    setUpiId(e.target.value)
                  }
                />

              </div>

            )}

            {/* CARD */}

            {method === "card" && (
              <>

                <div className="form-group">

                  <label htmlFor="cardNumber">
                    Card Number
                  </label>

                  <input
                    id="cardNumber"
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(
                        formatCardNumber(e.target.value)
                      )
                    }
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="cardName">
                    Name on Card
                  </label>

                  <input
                    id="cardName"
                    type="text"
                    placeholder="As shown on card"
                    value={cardName}
                    onChange={(e) =>
                      setCardName(e.target.value)
                    }
                  />

                </div>

                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="expiry">
                      Expiry
                    </label>

                    <input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      maxLength="5"
                      value={expiry}
                      onChange={(e) => {

                        let v = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);

                        if (v.length > 2) {
                          v =
                            v.slice(0, 2) +
                            "/" +
                            v.slice(2);
                        }

                        setExpiry(v);

                      }}
                    />

                  </div>

                  <div className="form-group">

                    <label htmlFor="cvv">
                      CVV
                    </label>

                    <input
                      id="cvv"
                      type="password"
                      inputMode="numeric"
                      maxLength="3"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 3)
                        )
                      }
                    />

                  </div>

                </div>

              </>
            )}

            {/* COD */}

            {method === "cod" && (

              <div className="payment-cod-note">
                Pay ₹
                {finalTotal.toLocaleString("en-IN")}
                {" "}in cash when your order is delivered.
              </div>

            )}

            {error && (
              <p className="field-error">
                {error}
              </p>
            )}

            <button
              className="pay-button"
              type="submit"
            >
              {method === "cod"
                ? "Place Order"
                : `Pay ₹${finalTotal.toLocaleString("en-IN")}`}
            </button>

          </form>

        </div>

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="payment-summary-card">

          <h2>Order Summary</h2>

          {orderItems.map((item, i) => (

            <div
              className="payment-summary-item"
              key={i}
            >

              <span>
                {item.name} × {item.qty}
              </span>

              <strong>
                ₹{item.price.toLocaleString("en-IN")}
              </strong>

            </div>

          ))}

          <hr />

          {/* SUBTOTAL */}

          <div className="payment-summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ₹{subtotal.toLocaleString("en-IN")}
            </strong>

          </div>

          {/* SHIPPING */}

          <div className="payment-summary-row">

            <span>
              Shipping
            </span>

            <strong
              className={
                shipping === 0
                  ? "free-shipping"
                  : ""
              }
            >
              {shipping === 0
                ? "FREE"
                : `₹${shipping}`}
            </strong>

          </div>

          {/* TOTAL */}

          <div className="payment-summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{finalTotal.toLocaleString("en-IN")}
            </strong>

          </div>

          {/* FREE SHIPPING MESSAGE */}

          {shipping > 0 && (

            <p className="shipping-message">
              Add ₹
              {(5000 - subtotal).toLocaleString("en-IN")}
              {" "}more for FREE shipping.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default PaymentPage;