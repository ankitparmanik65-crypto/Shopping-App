function Navbar({
  cartCount,
  onCartClick,
  onOrdersClick,
  onWishlistClick,
  wishlistCount,
  isDarkMode,
  onThemeToggle,
}) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">🛍️ Bazario</div>

        <div className="navbar-actions">
          <button
            className="theme-toggle-button"
            onClick={onThemeToggle}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? "☀︎" : "🌙"}
          </button>

          <button className="orders-button" onClick={onOrdersClick}>
            📦 Orders
          </button>

          <button className="wishlist-button" onClick={onWishlistClick}>
            ❤️ Wishlist ({wishlistCount})
          </button>

          <button className="cart-button" onClick={onCartClick}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;