package com.example.laptopstore.controller;

import com.example.laptopstore.dto.MessageResponseDto;
import com.example.laptopstore.dto.OrderCreateDto;
import com.example.laptopstore.dto.OrderResponseDto;
import com.example.laptopstore.entity.Order;
import com.example.laptopstore.security.CurrentUser;
import com.example.laptopstore.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderCreateDto orderCreateDto, 
                                       @CurrentUser Long userId) {
        try {
            OrderResponseDto order = orderService.createOrder(userId, orderCreateDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponseDto(e.getMessage()));
        }
    }
    
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<OrderResponseDto>> getUserOrders(@CurrentUser Long userId) {
        List<OrderResponseDto> orders = orderService.getUserOrders(userId);
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<OrderResponseDto> getOrderById(@PathVariable Long orderId, 
                                                        @CurrentUser Long userId) {
        Optional<OrderResponseDto> order = orderService.getOrderById(orderId, userId);
        return order.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, 
                                             @RequestParam Order.OrderStatus status) {
        try {
            OrderResponseDto order = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponseDto(e.getMessage()));
        }
    }
    
    @DeleteMapping("/{orderId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId, 
                                       @CurrentUser Long userId) {
        try {
            orderService.deleteOrder(orderId, userId);
            return ResponseEntity.ok(new MessageResponseDto("Order deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponseDto(e.getMessage()));
        }
    }
}
