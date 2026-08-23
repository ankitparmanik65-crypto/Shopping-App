function ProductDetails({
  product,
  addToCart,
  onBuyNow,
  onBack,
  wishlist,
  addToWishlist,
}) {
  return (
    <div className="product-details-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Products
      </button>

      <div className="product-details-card">
        {/* Product Image */}

        <div className="product-details-image-container">
          <img
            className="product-details-image"
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Product Information */}

        <div className="product-details-info">
          <p className="product-details-category">{product.category}</p>

          <h1>{product.name}</h1>

          <p className="product-details-price">₹{product.price}</p>

          {/* <p className="product-description">
            This is a high-quality {product.name}. Perfect
            for everyday use and designed to give you a
            great experience.
          </p> */}

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-details-actions">
            {/* ADD TO CART */}

            <button
              className="details-add-button"
              onClick={() => addToCart(product)}
            >
              🛒 Add to Cart
            </button>

            {/* BUY NOW */}

            <button
              className="details-buy-button"
              onClick={() => onBuyNow(product)}
            >
              ⚡ Buy Now
            </button>

            {/* WISHLIST */}

            <button
              className="details-wishlist-button"
              onClick={() => addToWishlist(product)}
            >
              {wishlist.some((item) => item.id === product.id)
                ? "❤️ Added to Wishlist"
                : "♡ Add to Wishlist"}
            </button>

            {/* CONTINUE SHOPPING */}

            <button className="details-back-button" onClick={onBack}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
