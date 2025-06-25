package com.example.laptopstore.repository;

import com.example.laptopstore.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
    List<OrderItem> findByOrderIdOrderById(Long orderId);
    
    List<OrderItem> findByLaptopId(Long laptopId);
    
    List<OrderItem> findByMouseId(Long mouseId);
    
    @Query("SELECT oi FROM OrderItem oi WHERE oi.orderId IN :orderIds")
    List<OrderItem> findByOrderIds(@Param("orderIds") List<Long> orderIds);
    
    void deleteByOrderId(Long orderId);
}
