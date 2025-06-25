import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../types/api';
import apiService from '../services/api';
import { formatPrice, formatDate } from '../utils/format';
import './Orders.css';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const ordersData = await apiService.getOrders();
        setOrders(ordersData);
        setError(null);
      } catch (err: any) {
        setError('Failed to load orders');
        console.error('Error fetching orders:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const handleRetry = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const ordersData = await apiService.getOrders();
      setOrders(ordersData);
    } catch (err: any) {
      setError('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="error-state">
            <h2>⚠️ Something went wrong</h2>
            <p>{error}</p>
            <button onClick={handleRetry} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <h1>My Orders</h1>
          <p>Track and manage your laptop orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders. Start shopping to see your orders here!</p>
            <Link to="/laptops" className="shop-now-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">
                      Placed on {formatDate(order.created_at)}
                    </p>
                  </div>
                  
                  <div className="order-meta">
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="order-total">
                      {formatPrice(order.totalAmount)}
                    </div>
                  </div>
                </div>

                <div className="order-summary">
                  <div className="items-summary">
                    {(() => {
                      const totalQuantity = order.items.reduce((total, item) => total + item.quantity, 0);
                      return (
                        <span className="items-count">
                          {totalQuantity} item{totalQuantity !== 1 ? 's' : ''}
                        </span>
                      );
                    })()}
                    <span className="first-item">
                      {order.items[0]?.productName || 'Laptop'}
                      {order.items.length > 1 && ` and ${order.items.length - 1} more`}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => toggleOrderExpansion(order.id)}
                    className="expand-btn"
                  >
                    {expandedOrders.has(order.id) ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {expandedOrders.has(order.id) && (
                  <div className="order-details">
                    <h4>Order Items</h4>
                    <div className="order-items">
                      {order.items.map((item) => (
                        <div key={item.id} className="order-item">
                          <div className="item-info">
                            <h5>{item.productName}</h5>
                            <div className="item-specs">
                              <span>{item.productType}</span>
                            </div>
                          </div>
                          
                          <div className="item-pricing">
                            <div className="quantity">Qty: {item.quantity}</div>
                            <div className="unit-price">
                              {formatPrice(item.unitPrice)} each
                            </div>
                            <div className="item-total">
                              {formatPrice(item.totalPrice)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-footer">
                      <div className="order-dates">
                        <div className="date-item">
                          <span className="date-label">Order Date:</span>
                          <span className="date-value">{formatDate(order.created_at)}</span>
                        </div>
                        {order.updated_at !== order.created_at && (
                          <div className="date-item">
                            <span className="date-label">Last Updated:</span>
                            <span className="date-value">{formatDate(order.updated_at)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="order-total-breakdown">
                        <div className="total-row">
                          <span>Total:</span>
                          <span className="total-amount">{formatPrice(order.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
