function Wishlist({ wishlist, removeFromWishlist, onProductClick, onBack }) {
  return (
    <div className="wishlist-page">
      <button className="wishlist-back-button" onClick={onBack}>
        ← Back to Products
      </button>

      <div className="wishlist-header">
        <h2>❤️ My Wishlist</h2>

        <p>
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <h3>Your wishlist is empty</h3>

          <p>Add products you love to your wishlist.</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div className="wishlist-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                onClick={() => onProductClick(product)}
              />

              <div className="wishlist-card-info">
                <h3 onClick={() => onProductClick(product)}>{product.name}</h3>

                <p>₹{product.price}</p>

                <button
                  className="wishlist-remove-button"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
