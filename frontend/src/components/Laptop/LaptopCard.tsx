import React, { useState } from 'react';
import { Laptop } from '../../types/api';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/format';
import './LaptopCard.css';

interface LaptopCardProps {
  laptop: Laptop;
}

const LaptopCard: React.FC<LaptopCardProps> = ({ laptop }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (laptop.stock_quantity <= 0 || isAdding) return;

    setIsAdding(true);
    addToCart(laptop, 'laptop', 1);
    
    // Show success state briefly
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="laptop-card">
      <div className="laptop-header">
        <h3 className="laptop-title">
          {laptop.brand} {laptop.model}
        </h3>
        <div className="laptop-price">
          {formatPrice(laptop.price)}
        </div>
      </div>

      <div className="laptop-specs">
        <div className="spec-item">
          <span className="spec-label">Processor:</span>
          <span className="spec-value">{laptop.processor}</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">RAM:</span>
          <span className="spec-value">{laptop.ram_gb}GB</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">Storage:</span>
          <span className="spec-value">{laptop.storage_gb}GB</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">Graphics:</span>
          <span className="spec-value">{laptop.graphics}</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">Screen:</span>
          <span className="spec-value">{laptop.screen_size}"</span>
        </div>
      </div>

      <div className="laptop-footer">
        <div className="stock-info">
          <span className={`stock-badge ${laptop.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {laptop.stock_quantity > 0 ? `${laptop.stock_quantity} in stock` : 'Out of stock'}
          </span>
        </div>
        
        <button
          className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
          onClick={handleAddToCart}
          disabled={laptop.stock_quantity === 0 || isAdding}
        >
          {isAdding ? '✓ Added!' : laptop.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default LaptopCard;
