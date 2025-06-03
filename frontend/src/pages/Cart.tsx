import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { formatPrice } from "../utils/format";
import "./Cart.css";

const Cart: React.FC = () => {
  const {
    items,
    totalItems,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkout,
    isLoading,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<number | null>(null);

  const handleQuantityChange = (itemId: string, newQuantity: string) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity > 0 && quantity <= 10) {
      updateQuantity(itemId, quantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const cancelClearCart = () => {
    setShowClearConfirm(false);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/cart" } } });
      return;
    }

    setCheckoutError(null);
    const result = await checkout();

    if (result.success && result.orderId) {
      setCheckoutSuccess(result.orderId);
      setTimeout(() => {
        navigate("/orders");
      }, 3000);
    } else {
      setCheckoutError(result.error || "Checkout failed");
    }
  };

  // Success state
  if (checkoutSuccess) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="checkout-success">
            <div className="success-icon">🎉</div>
            <h2>Order Placed Successfully!</h2>
            <p>
              Your order #{checkoutSuccess} has been placed and is being
              processed.
            </p>
            <p>Redirecting to your orders page...</p>
            <Link to="/orders" className="view-orders-btn">
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          {items.length > 0 && (
            <button onClick={handleClearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          )}
        </div>

        {/* Clear Cart Confirmation Modal */}
        {showClearConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Clear Cart</h3>
              <p>Are you sure you want to remove all items from your cart?</p>
              <div className="modal-actions">
                <button onClick={cancelClearCart} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={confirmClearCart} className="confirm-btn">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/laptops" className="shop-now-btn">
              Shop Laptops
            </Link>
            <Link to="/mice" className="shop-now-btn">
              Shop Mice
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <div className="item-header">
                      <h3>
                        {item.product.brand} {item.product.model}
                      </h3>
                      <span className={`item-type ${item.type}`}>
                        {item.type === "laptop" ? "💻" : "🖱️"} {item.type}
                      </span>
                    </div>

                    <div className="item-specs">
                      {item.type === "laptop" ? (
                        <>
                          <span>{(item.product as any).processor}</span>
                          <span>•</span>
                          <span>{(item.product as any).ram_gb}GB RAM</span>
                          <span>•</span>
                          <span>
                            {(item.product as any).storage_gb}GB Storage
                          </span>
                        </>
                      ) : (
                        <>
                          <span>{(item.product as any).mouse_type}</span>
                          <span>•</span>
                          <span>{(item.product as any).connectivity}</span>
                          <span>•</span>
                          <span>{(item.product as any).dpi} DPI</span>
                          <span>•</span>
                          <span>{(item.product as any).weight_grams}g</span>
                        </>
                      )}
                    </div>

                    <div className="item-price">
                      {formatPrice(item.product.price)} each
                    </div>
                  </div>

                  <div className="item-controls">
                    <div className="quantity-control">
                      <label htmlFor={`qty-${item.id}`}>Qty:</label>
                      <select
                        id={`qty-${item.id}`}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="quantity-select"
                      >
                        {Array.from(
                          { length: Math.min(item.product.stock_quantity, 10) },
                          (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="item-total">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="remove-btn"
                      title="Remove from cart"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>

                <div className="summary-row">
                  <span>Items ({totalItems}):</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>

                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>

                {checkoutError && (
                  <div className="error-message">{checkoutError}</div>
                )}

                <button
                  onClick={handleCheckout}
                  className="checkout-btn"
                  disabled={isLoading || items.length === 0}
                >
                  {isLoading
                    ? "Processing..."
                    : !isAuthenticated
                    ? "Login to Checkout"
                    : "Proceed to Checkout"}
                </button>

                {!isAuthenticated && (
                  <p className="login-note">
                    <Link to="/login" className="login-link">
                      Sign in
                    </Link>{" "}
                    to complete your purchase
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
