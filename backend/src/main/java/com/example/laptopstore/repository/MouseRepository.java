package com.example.laptopstore.repository;

import com.example.laptopstore.entity.Mouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MouseRepository extends JpaRepository<Mouse, Long> {
    List<Mouse> findByBrandIgnoreCase(String brand);
    List<Mouse> findByMouseTypeIgnoreCase(String mouseType);
    List<Mouse> findByStockQuantityGreaterThan(Integer stock);
    
    @Query("SELECT m FROM Mouse m WHERE m.stockQuantity > 0")
    List<Mouse> findAvailableMice();
    
    @Query("SELECT m FROM Mouse m WHERE LOWER(m.brand) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(m.model) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Mouse> searchMice(String search);
}
