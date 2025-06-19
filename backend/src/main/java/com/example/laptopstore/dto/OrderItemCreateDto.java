package com.example.laptopstore.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class OrderItemCreateDto {
    
    private Long laptopId;
    private Long mouseId;
    
    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;
    
    @NotNull(message = "Unit price is required")
    @Positive(message = "Unit price must be positive")
    private BigDecimal unitPrice;
    
    public OrderItemCreateDto() {}
    
    public OrderItemCreateDto(Long laptopId, Long mouseId, Integer quantity, BigDecimal unitPrice) {
        this.laptopId = laptopId;
        this.mouseId = mouseId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
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
}
