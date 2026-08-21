import { useState } from "react";

function Checkout({ cart, onClose, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 5000 ? 0 : 99;

  const total = subtotal + shipping;

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    // Remove error while user is typing
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const address = formData.address.trim();
    const city = formData.city.trim();
    const pincode = formData.pincode.trim();

    if (!name) {
      newErrors.name = "Please enter your full name.";
    } else if (name.length < 3) {
      newErrors.name =
        "Name must be at least 3 characters.";
    }

    if (!phone) {
      newErrors.phone =
        "Please enter your phone number.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }

    if (!address) {
      newErrors.address =
        "Please enter your delivery address.";
    } else if (address.length < 10) {
      newErrors.address =
        "Address must be at least 10 characters.";
    }

    if (!city) {
      newErrors.city = "Please enter your city.";
    } else if (city.length < 2) {
      newErrors.city =
        "City must be at least 2 characters.";
    }

    if (!pincode) {
      newErrors.pincode =
        "Please enter your pincode.";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode =
        "Pincode must contain exactly 6 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    onOrderPlaced({
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      pincode: formData.pincode.trim(),
    });
  };

  return (
    <div className="checkout-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="checkout-header">

        <button onClick={onClose}>
          ← Back to Cart
        </button>

        <h1>Order Confirmation</h1>

      </div>

      <div className="checkout-content">

        {/* =========================
            DELIVERY FORM
        ========================= */}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          noValidate
        >

          <h2>Delivery Information</h2>

          {/* NAME */}

          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={
                errors.name ? "input-error" : ""
              }
            />

            {errors.name && (
              <p className="field-error">
                {errors.name}
              </p>
            )}

          </div>

          {/* PHONE */}

          <div className="form-group">

            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10 digit phone number"
              maxLength="10"
              className={
                errors.phone ? "input-error" : ""
              }
            />

            {errors.phone && (
              <p className="field-error">
                {errors.phone}
              </p>
            )}

          </div>

          {/* ADDRESS */}

          <div className="form-group">

            <label htmlFor="address">
              Address
            </label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete delivery address"
              rows="4"
              className={
                errors.address
                  ? "input-error"
                  : ""
              }
            />

            {errors.address && (
              <p className="field-error">
                {errors.address}
              </p>
            )}

          </div>

          {/* CITY + PINCODE */}

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="city">
                City
              </label>

              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className={
                  errors.city
                    ? "input-error"
                    : ""
                }
              />

              {errors.city && (
                <p className="field-error">
                  {errors.city}
                </p>
              )}

            </div>

            <div className="form-group">

              <label htmlFor="pincode">
                Pincode
              </label>

              <input
                id="pincode"
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6 digit pincode"
                maxLength="6"
                className={
                  errors.pincode
                    ? "input-error"
                    : ""
                }
              />

              {errors.pincode && (
                <p className="field-error">
                  {errors.pincode}
                </p>
              )}

            </div>

          </div>

          {/* CONTINUE TO PAYMENT */}

          <button
            className="place-order-button"
            type="submit"
          >
            Continue to Payment
          </button>

        </form>

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>
          ))}

          <hr />

          <div className="checkout-total-row">

            <span>Subtotal</span>

            <strong>
              ₹{subtotal}
            </strong>

          </div>

          <div className="checkout-total-row">

            <span>Shipping</span>

            <strong>
              {shipping === 0
                ? "FREE"
                : `₹${shipping}`}
            </strong>

          </div>

          <div className="checkout-grand-total">

            <span>Total</span>

            <strong>
              ₹{total}
            </strong>

          </div>

          {shipping > 0 && (
            <p className="shipping-message">
              Add ₹{5000 - subtotal} more
              for FREE shipping.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default Checkout;