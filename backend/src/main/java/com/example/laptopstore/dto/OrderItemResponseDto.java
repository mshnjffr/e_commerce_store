package com.example.laptopstore.dto;

import com.example.laptopstore.entity.OrderItem;
import java.math.BigDecimal;

public class OrderItemResponseDto {
    
    private Long id;
    private Long laptopId;
    private Long mouseId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
    private String productName;
    private String productType;
    
    // Constructors
    public OrderItemResponseDto() {}
    
    public OrderItemResponseDto(Long id, Long laptopId, Long mouseId, Integer quantity, 
                               BigDecimal unitPrice, String productName, String productType) {
        this.id = id;
        this.laptopId = laptopId;
        this.mouseId = mouseId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));
        this.productName = productName;
        this.productType = productType;
    }
    
    // Static factory method
    public static OrderItemResponseDto fromEntity(OrderItem item, String productName, String productType) {
        return new OrderItemResponseDto(
            item.getId(),
            item.getLaptopId(),
            item.getMouseId(),
            item.getQuantity(),
            item.getUnitPrice(),
            productName,
            productType
        );
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
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
        if (quantity != null) {
            this.totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));
        }
    }
    
    public BigDecimal getTotalPrice() {
        return totalPrice;
    }
    
    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
    
    public String getProductName() {
        return productName;
    }
    
    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    public String getProductType() {
        return productType;
    }
    
    public void setProductType(String productType) {
        this.productType = productType;
    }
}
