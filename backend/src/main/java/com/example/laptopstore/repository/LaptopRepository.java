package com.example.laptopstore.repository;

import com.example.laptopstore.entity.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop, Long> {
    List<Laptop> findByBrandIgnoreCase(String brand);
    List<Laptop> findByStockQuantityGreaterThan(Integer stock);
    
    @Query("SELECT l FROM Laptop l WHERE l.stockQuantity > 0")
    List<Laptop> findAvailableLaptops();
    
    @Query("SELECT l FROM Laptop l WHERE LOWER(l.brand) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(l.model) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Laptop> searchLaptops(String search);
}
