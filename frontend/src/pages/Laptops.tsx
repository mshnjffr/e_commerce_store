import React, { useState, useEffect, useMemo } from 'react';
import { Laptop } from '../types/api';
import apiService from '../services/api';
import LaptopCard from '../components/Laptop/LaptopCard';
import './Laptops.css';

const Laptops: React.FC = () => {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');
  const [filterBrand, setFilterBrand] = useState<string>('');

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        setIsLoading(true);
        const laptopsData = await apiService.getLaptops();
        setLaptops(laptopsData);
        setError(null);
      } catch (err: any) {
        setError('Failed to load laptops');
        console.error('Error fetching laptops:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  // Get unique brands for filter
  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(laptops.map(laptop => laptop.brand)));
    return uniqueBrands.sort();
  }, [laptops]);

  // Filter and sort laptops
  const filteredAndSortedLaptops = useMemo(() => {
    let filtered = laptops.filter(laptop => {
      const matchesSearch = laptop.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           laptop.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           laptop.processor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = !filterBrand || laptop.brand === filterBrand;
      return matchesSearch && matchesBrand;
    });

    // Sort laptops
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
        default:
          return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
      }
    });

    return filtered;
  }, [laptops, searchTerm, sortBy, filterBrand]);

  const handleRetry = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const laptopsData = await apiService.getLaptops();
      setLaptops(laptopsData);
    } catch (err: any) {
      setError('Failed to load laptops');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="laptops-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading laptops...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="laptops-page">
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
    <div className="laptops-page">
      <div className="container">
        <div className="page-header">
          <h1>All Laptops</h1>
          <p>Discover our complete collection of {laptops.length} premium laptops</p>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search laptops by brand, model, or processor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-container">
            <div className="filter-group">
              <label htmlFor="brand-filter">Brand:</label>
              <select
                id="brand-filter"
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="filter-select"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="filter-select"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="results-section">
          {searchTerm || filterBrand ? (
            <div className="results-info">
              <p>
                Showing {filteredAndSortedLaptops.length} of {laptops.length} laptops
                {searchTerm && ` for "${searchTerm}"`}
                {filterBrand && ` from ${filterBrand}`}
              </p>
              {(searchTerm || filterBrand) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterBrand('');
                  }}
                  className="clear-filters"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : null}

          {filteredAndSortedLaptops.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No laptops found</h3>
              <p>Try adjusting your search terms or filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterBrand('');
                }}
                className="reset-button"
              >
                Show All Laptops
              </button>
            </div>
          ) : (
            <div className="laptops-grid">
              {filteredAndSortedLaptops.map((laptop) => (
                <LaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Laptops;
