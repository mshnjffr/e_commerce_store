import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Laptop } from '../types/api';
import apiService from '../services/api';
import LaptopCard from '../components/Laptop/LaptopCard';
import './Home.css';

const Home: React.FC = () => {
  const [featuredLaptops, setFeaturedLaptops] = useState<Laptop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedLaptops = async () => {
      try {
        const laptops = await apiService.getLaptops();
        // Get 3 random laptops for featured section
        const shuffled = [...laptops].sort(() => 0.5 - Math.random());
        setFeaturedLaptops(shuffled.slice(0, 3));
      } catch (err: any) {
        setError('Failed to load featured laptops');
        console.error('Error fetching laptops:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedLaptops();
  }, []);

  if (isLoading) {
    return (
      <div className="home">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Perfect Laptop
          </h1>
          <p className="hero-subtitle">
            Discover the latest and greatest laptops from top brands. 
            From gaming powerhouses to ultrabooks, we have something for everyone.
          </p>
          <div className="hero-actions">
            <Link to="/laptops" className="cta-button primary">
              Shop All Laptops
            </Link>
          </div>
        </div>
        <div className="hero-features">
          <div className="feature">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>On orders over $500</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Your data is protected</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>Fast Delivery</h3>
            <p>2-3 business days</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🛠️</div>
            <h3>Tech Support</h3>
            <p>Expert help available</p>
          </div>
        </div>
      </section>

      {/* Featured Laptops Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Laptops</h2>
            <p>Check out our hand-picked selection of premium laptops</p>
          </div>

          {error ? (
            <div className="error-state">
              <p>⚠️ {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-button"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="laptops-grid">
              {featuredLaptops.map((laptop) => (
                <LaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          )}

          <div className="view-all">
            <Link to="/laptops" className="view-all-button">
              View All Laptops →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <h2>Why Choose Laptop Store?</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">🏆</div>
              <h3>Top Brands</h3>
              <p>We partner with leading manufacturers to bring you the best laptops from Apple, Dell, HP, Lenovo, and more.</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with regular discounts and special offers. Get the most value for your money.</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">🔧</div>
              <h3>Expert Support</h3>
              <p>Our team of tech experts is here to help you choose the right laptop and provide ongoing support.</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">📦</div>
              <h3>Fast Shipping</h3>
              <p>Quick and reliable delivery with tracking. Most orders ship within 24 hours of purchase.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
