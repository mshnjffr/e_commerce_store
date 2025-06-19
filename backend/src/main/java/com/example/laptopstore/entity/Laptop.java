package com.example.laptopstore.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "laptops")
public class Laptop {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String brand;
    
    @NotBlank
    private String model;
    
    @NotBlank
    private String processor;
    
    @NotNull
    @Positive
    @Column(name = "ram_gb")
    @JsonProperty("ram_gb")
    private Integer ramGb;
    
    @NotNull
    @Positive
    @Column(name = "storage_gb")
    @JsonProperty("storage_gb")
    private Integer storageGb;
    
    @NotBlank
    private String graphics;
    
    @NotNull
    @Positive
    @Column(name = "screen_size")
    @JsonProperty("screen_size")
    private Double screenSize;
    
    @NotNull
    @Positive
    private BigDecimal price;
    
    @NotNull
    @Column(name = "stock_quantity")
    @JsonProperty("stock_quantity")
    private Integer stockQuantity;
    
    @Column(name = "created_at")
    @JsonProperty("created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors
    public Laptop() {}
    
    public Laptop(String brand, String model, String processor, Integer ramGb, 
                  Integer storageGb, String graphics, Double screenSize, 
                  BigDecimal price, Integer stockQuantity) {
        this.brand = brand;
        this.model = model;
        this.processor = processor;
        this.ramGb = ramGb;
        this.storageGb = storageGb;
        this.graphics = graphics;
        this.screenSize = screenSize;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getBrand() {
        return brand;
    }
    
    public void setBrand(String brand) {
        this.brand = brand;
    }
    
    public String getModel() {
        return model;
    }
    
    public void setModel(String model) {
        this.model = model;
    }
    
    public String getProcessor() {
        return processor;
    }
    
    public void setProcessor(String processor) {
        this.processor = processor;
    }
    
    public Integer getRamGb() {
        return ramGb;
    }
    
    public void setRamGb(Integer ramGb) {
        this.ramGb = ramGb;
    }
    
    public Integer getStorageGb() {
        return storageGb;
    }
    
    public void setStorageGb(Integer storageGb) {
        this.storageGb = storageGb;
    }
    
    public String getGraphics() {
        return graphics;
    }
    
    public void setGraphics(String graphics) {
        this.graphics = graphics;
    }
    
    public Double getScreenSize() {
        return screenSize;
    }
    
    public void setScreenSize(Double screenSize) {
        this.screenSize = screenSize;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public Integer getStockQuantity() {
        return stockQuantity;
    }
    
    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
