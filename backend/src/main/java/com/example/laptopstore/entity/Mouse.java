package com.example.laptopstore.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "mice")
public class Mouse {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String brand;
    
    @NotBlank
    private String model;
    
    @NotBlank
    @Column(name = "mouse_type")
    @JsonProperty("mouse_type")
    private String mouseType;
    
    @NotBlank
    private String connectivity;
    
    @NotNull
    @Positive
    private Integer dpi;
    
    @NotNull
    @Positive
    private Integer buttons;
    
    @Column(name = "rgb_lighting")
    @JsonProperty("rgb_lighting")
    private Boolean rgbLighting;
    
    @NotNull
    @Positive
    @Column(name = "weight_grams")
    @JsonProperty("weight_grams")
    private Integer weightGrams;
    
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
    public Mouse() {}
    
    public Mouse(String brand, String model, String mouseType, String connectivity,
                 Integer dpi, Integer buttons, Boolean rgbLighting, Integer weightGrams,
                 BigDecimal price, Integer stockQuantity) {
        this.brand = brand;
        this.model = model;
        this.mouseType = mouseType;
        this.connectivity = connectivity;
        this.dpi = dpi;
        this.buttons = buttons;
        this.rgbLighting = rgbLighting;
        this.weightGrams = weightGrams;
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
    
    public String getMouseType() {
        return mouseType;
    }
    
    public void setMouseType(String mouseType) {
        this.mouseType = mouseType;
    }
    
    public String getConnectivity() {
        return connectivity;
    }
    
    public void setConnectivity(String connectivity) {
        this.connectivity = connectivity;
    }
    
    public Integer getDpi() {
        return dpi;
    }
    
    public void setDpi(Integer dpi) {
        this.dpi = dpi;
    }
    
    public Integer getButtons() {
        return buttons;
    }
    
    public void setButtons(Integer buttons) {
        this.buttons = buttons;
    }
    
    public Boolean getRgbLighting() {
        return rgbLighting;
    }
    
    public void setRgbLighting(Boolean rgbLighting) {
        this.rgbLighting = rgbLighting;
    }
    
    public Integer getWeightGrams() {
        return weightGrams;
    }
    
    public void setWeightGrams(Integer weightGrams) {
        this.weightGrams = weightGrams;
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
