package com.example.laptopstore.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class OrderCreateDto {
    
    @NotEmpty(message = "Order must contain at least one item")
    @Valid
    private List<OrderItemCreateDto> items;
    
    public OrderCreateDto() {}
    
    public OrderCreateDto(List<OrderItemCreateDto> items) {
        this.items = items;
    }
    
    public List<OrderItemCreateDto> getItems() {
        return items;
    }
    
    public void setItems(List<OrderItemCreateDto> items) {
        this.items = items;
    }
}
