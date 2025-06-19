package com.example.laptopstore.service;

import com.example.laptopstore.dto.OrderCreateDto;
import com.example.laptopstore.dto.OrderItemCreateDto;
import com.example.laptopstore.entity.*;
import com.example.laptopstore.repository.OrderRepository;
import com.example.laptopstore.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private LaptopService laptopService;
    
    @Autowired
    private MouseService mouseService;
    
    public Order createOrder(Long userId, OrderCreateDto orderCreateDto) {
        User user = userService.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        // Validate order items and check stock
        validateOrderItems(orderCreateDto.getItems());
        
        // Calculate total amount
        BigDecimal totalAmount = calculateTotalAmount(orderCreateDto.getItems());
        
        // Create order
        Order order = new Order(user, totalAmount);
        Order savedOrder = orderRepository.save(order);
        
        // Create order items and update stock
        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemCreateDto itemDto : orderCreateDto.getItems()) {
            OrderItem orderItem = createOrderItem(savedOrder, itemDto);
            orderItems.add(orderItem);
            
            // Update stock
            if (itemDto.hasLaptop()) {
                laptopService.updateStock(itemDto.getLaptopId(), itemDto.getQuantity());
            } else if (itemDto.hasMouse()) {
                mouseService.updateStock(itemDto.getMouseId(), itemDto.getQuantity());
            }
        }
        
        orderItemRepository.saveAll(orderItems);
        savedOrder.setItems(orderItems);
        
        return savedOrder;
    }
    
    @Transactional(readOnly = true)
    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    @Transactional(readOnly = true)
    public Optional<Order> getOrderById(Long orderId, Long userId) {
        return orderRepository.findByIdAndUserId(orderId, userId);
    }
    
    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        order.setStatus(status);
        return orderRepository.save(order);
    }
    
    public void deleteOrder(Long orderId, Long userId) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        if (order.getStatus() != Order.OrderStatus.PENDING) {
            throw new RuntimeException("Only pending orders can be deleted");
        }
        
        // Restore stock for all items
        for (OrderItem item : order.getItems()) {
            if (item.getLaptop() != null) {
                Laptop laptop = item.getLaptop();
                laptop.setStockQuantity(laptop.getStockQuantity() + item.getQuantity());
            } else if (item.getMouse() != null) {
                Mouse mouse = item.getMouse();
                mouse.setStockQuantity(mouse.getStockQuantity() + item.getQuantity());
            }
        }
        
        orderRepository.delete(order);
    }
    
    private void validateOrderItems(List<OrderItemCreateDto> items) {
        for (OrderItemCreateDto item : items) {
            if (!item.isValid()) {
                throw new RuntimeException("Each order item must specify exactly one product (laptop or mouse)");
            }
            
            if (item.hasLaptop()) {
                if (!laptopService.isStockAvailable(item.getLaptopId(), item.getQuantity())) {
                    throw new RuntimeException("Insufficient stock for laptop with id: " + item.getLaptopId());
                }
            } else if (item.hasMouse()) {
                if (!mouseService.isStockAvailable(item.getMouseId(), item.getQuantity())) {
                    throw new RuntimeException("Insufficient stock for mouse with id: " + item.getMouseId());
                }
            }
        }
    }
    
    private BigDecimal calculateTotalAmount(List<OrderItemCreateDto> items) {
        BigDecimal total = BigDecimal.ZERO;
        for (OrderItemCreateDto item : items) {
            BigDecimal itemTotal = item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            total = total.add(itemTotal);
        }
        return total;
    }
    
    private OrderItem createOrderItem(Order order, OrderItemCreateDto itemDto) {
        if (itemDto.hasLaptop()) {
            Laptop laptop = laptopService.getLaptopById(itemDto.getLaptopId())
                .orElseThrow(() -> new RuntimeException("Laptop not found with id: " + itemDto.getLaptopId()));
            return new OrderItem(order, laptop, itemDto.getQuantity(), itemDto.getUnitPrice());
        } else if (itemDto.hasMouse()) {
            Mouse mouse = mouseService.getMouseById(itemDto.getMouseId())
                .orElseThrow(() -> new RuntimeException("Mouse not found with id: " + itemDto.getMouseId()));
            return new OrderItem(order, mouse, itemDto.getQuantity(), itemDto.getUnitPrice());
        } else {
            throw new RuntimeException("Order item must specify either laptop or mouse");
        }
    }
}
