package com.example.laptopstore.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonProperty("order_id")
    private Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laptop_id")
    @JsonProperty("laptop_id")
    private Laptop laptop;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mouse_id")
    @JsonProperty("mouse_id")
    private Mouse mouse;
    
    @NotNull
    @Positive
    private Integer quantity;
    
    @NotNull
    @Positive
    @Column(name = "unit_price")
    @JsonProperty("unit_price")
    private BigDecimal unitPrice;
    
    // Constructors
    public OrderItem() {}
    
    public OrderItem(Order order, Laptop laptop, Integer quantity, BigDecimal unitPrice) {
        this.order = order;
        this.laptop = laptop;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
    
    public OrderItem(Order order, Mouse mouse, Integer quantity, BigDecimal unitPrice) {
        this.order = order;
        this.mouse = mouse;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
    
    // Business methods
    public BigDecimal getTotalPrice() {
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }
    
    public String getProductName() {
        if (laptop != null) {
            return laptop.getBrand() + " " + laptop.getModel();
        } else if (mouse != null) {
            return mouse.getBrand() + " " + mouse.getModel();
        }
        return "Unknown Product";
    }
    
    public String getProductType() {
        if (laptop != null) {
            return "Laptop";
        } else if (mouse != null) {
            return "Mouse";
        }
        return "Unknown";
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Order getOrder() {
        return order;
    }
    
    public void setOrder(Order order) {
        this.order = order;
    }
    
    public Laptop getLaptop() {
        return laptop;
    }
    
    public void setLaptop(Laptop laptop) {
        this.laptop = laptop;
    }
    
    public Mouse getMouse() {
        return mouse;
    }
    
    public void setMouse(Mouse mouse) {
        this.mouse = mouse;
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
}
