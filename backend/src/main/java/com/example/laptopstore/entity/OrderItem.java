package com.example.laptopstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @Column(name = "order_id")
    private Long orderId;
    
    @Column(name = "laptop_id")
    private Long laptopId;
    
    @Column(name = "mouse_id")
    private Long mouseId;
    
    @NotNull
    @Positive
    private Integer quantity;
    
    @NotNull
    @Positive
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
    
    // Constructors
    public OrderItem() {}
    
    public OrderItem(Long orderId, Long laptopId, Long mouseId, Integer quantity, BigDecimal unitPrice) {
        this.orderId = orderId;
        this.laptopId = laptopId;
        this.mouseId = mouseId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getOrderId() {
        return orderId;
    }
    
    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
    
    public Long getLaptopId() {
        return laptopId;
    }
    
    public void setLaptopId(Long laptopId) {
        this.laptopId = laptopId;
    }
    
    public Long getMouseId() {
        return mouseId;
    }
    
    public void setMouseId(Long mouseId) {
        this.mouseId = mouseId;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public BigDecimal getUnitPrice() {
        return unitPrice;
    }
    
    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
    
    public boolean hasLaptop() {
        return laptopId != null;
    }
    
    public boolean hasMouse() {
        return mouseId != null;
    }
    
    public boolean isValid() {
        return (laptopId != null && mouseId == null) || (laptopId == null && mouseId != null);
    }
    
    public BigDecimal getTotalPrice() {
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }
}
