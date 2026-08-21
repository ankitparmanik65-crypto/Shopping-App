function ProductCard({
  product,
  addToCart,
  onProductClick,
  onBuyNow,
  wishlist,
  addToWishlist,
  removeFromWishlist,
}) {
  const isWishlisted = wishlist?.some(
    (item) => item.id === product.id
  );

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">

      {/* Product Image */}
      <div
        className="product-card-image-container"
        onClick={() => onProductClick(product)}
      >
        <img
          className="product-card-image"
          src={product.image}
          alt={product.name}
        />

        {/* WISHLIST BUTTON */}
        <button
          className={
            isWishlisted
              ? "product-wishlist-button active"
              : "product-wishlist-button"
          }
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? "❤️" : "♡"}
        </button>
      </div>

      {/* Product Info */}
      <div className="product-card-info">

        <p className="product-card-category">
          {product.category}
        </p>

        <h3
          className="product-card-name"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>

        <p className="product-card-price">
          ₹{product.price}
        </p>

        {/* ACTION BUTTONS */}
        <div className="product-card-actions">

          {/* ADD TO CART */}
          <button
            className="product-card-add-button"
            onClick={() => addToCart(product)}
          >
            🛒 Add to Cart
          </button>

          {/* BUY NOW */}
          <button
            className="product-card-buy-button"
            onClick={() => onBuyNow(product)}
          >
            Buy Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;