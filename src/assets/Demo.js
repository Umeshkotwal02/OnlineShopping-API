<Link
  to={`/products/${productNameSlug(product.product_name)}`}
  className="text-decoration-none"
  onClick={(e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      e.preventDefault();
    }
  }}
>
  <div className="new-arrival-card rounded-top-3">
    <div className="image-container rounded-top-3">
      <ProductImageSlider imageList={[product.product_image]} />
      <div className="overlay-buttons">
        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from triggering parent elements
            handleAddToCart(product.id, product.stitchingOptions);
          }}
        >
          ADD TO CART
        </button>
      </div>
      <div className="wishlist-btn">
        <button>
          {wishlist.some((item) => item.id === product.id) ? (
            <FaHeart className="icon heart-icon" />
          ) : (
            <FiHeart className="icon" />
          )}
        </button>
      </div>
      {product.product_discount > 0 && (
        <div className="discount-badge">
          <p className="discount-p">{product.product_discount}% OFF</p>
        </div>
      )}
    </div>
    <div className="product-info">
      <h3 className="text-start text-dark">
        {truncateProductName(product.product_name)}
      </h3>
      <div className="price-section">
        <span className="mrp text-start">
          {product.currency}
          {product.product_mrp}
        </span>
        <span className="discounted-price">
          {product.currency}
          {product.product_price}
        </span>
      </div>
    </div>
  </div>
</Link>
