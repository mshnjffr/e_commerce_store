package com.example.laptopstore.service;

import com.example.laptopstore.dto.OrderCreateDto;
import com.example.laptopstore.dto.OrderItemCreateDto;
import com.example.laptopstore.dto.OrderItemResponseDto;
import com.example.laptopstore.dto.OrderResponseDto;
import com.example.laptopstore.entity.Laptop;
import com.example.laptopstore.entity.Mouse;
import com.example.laptopstore.entity.Order;
import com.example.laptopstore.entity.OrderItem;
import com.example.laptopstore.repository.LaptopRepository;
import com.example.laptopstore.repository.MouseRepository;
import com.example.laptopstore.repository.OrderItemRepository;
import com.example.laptopstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private LaptopRepository laptopRepository;
    
    @Autowired
    private MouseRepository mouseRepository;
    
    @Transactional
    public OrderResponseDto createOrder(Long userId, OrderCreateDto orderCreateDto) {
        // Validate order items
        List<OrderItemCreateDto> itemsDto = orderCreateDto.getItems();
        if (itemsDto == null || itemsDto.isEmpty()) {
            throw new RuntimeException("Order must contain at least one item");
        }
        
        // Calculate total amount and validate items
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderItemCreateDto itemDto : itemsDto) {
            if (!itemDto.isValid()) {
                throw new RuntimeException("Each item must have either a laptop or mouse, but not both");
            }
            
            // Validate product exists and has sufficient stock
            if (itemDto.hasLaptop()) {
                Laptop laptop = laptopRepository.findById(itemDto.getLaptopId())
                    .orElseThrow(() -> new RuntimeException("Laptop not found with id: " + itemDto.getLaptopId()));
                if (laptop.getStockQuantity() < itemDto.getQuantity()) {
                    throw new RuntimeException("Insufficient stock for laptop: " + laptop.getModel());
                }
            } else if (itemDto.hasMouse()) {
                Mouse mouse = mouseRepository.findById(itemDto.getMouseId())
                    .orElseThrow(() -> new RuntimeException("Mouse not found with id: " + itemDto.getMouseId()));
                if (mouse.getStockQuantity() < itemDto.getQuantity()) {
                    throw new RuntimeException("Insufficient stock for mouse: " + mouse.getModel());
                }
            }
            
            BigDecimal itemTotal = itemDto.getUnitPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity()));
            totalAmount = totalAmount.add(itemTotal);
        }
        
        // Create order
        Order order = new Order(userId, totalAmount, Order.OrderStatus.PENDING);
        order = orderRepository.save(order);
        
        // Create order items and update stock
        List<OrderItemResponseDto> itemResponses = new ArrayList<>();
        for (OrderItemCreateDto itemDto : itemsDto) {
            OrderItem orderItem = new OrderItem(
                order.getId(),
                itemDto.getLaptopId(),
                itemDto.getMouseId(),
                itemDto.getQuantity(),
                itemDto.getUnitPrice()
            );
            orderItem = orderItemRepository.save(orderItem);
            
            // Update stock
            String productName;
            String productType;
            if (itemDto.hasLaptop()) {
                Laptop laptop = laptopRepository.findById(itemDto.getLaptopId()).get();
                laptop.setStockQuantity(laptop.getStockQuantity() - itemDto.getQuantity());
                laptopRepository.save(laptop);
                productName = laptop.getBrand() + " " + laptop.getModel();
                productType = "Laptop";
            } else {
                Mouse mouse = mouseRepository.findById(itemDto.getMouseId()).get();
                mouse.setStockQuantity(mouse.getStockQuantity() - itemDto.getQuantity());
                mouseRepository.save(mouse);
                productName = mouse.getBrand() + " " + mouse.getModel();
                productType = "Mouse";
            }
            
            OrderItemResponseDto itemResponse = OrderItemResponseDto.fromEntity(orderItem, productName, productType);
            itemResponses.add(itemResponse);
        }
        
        // Create response
        OrderResponseDto response = OrderResponseDto.fromEntity(order);
        response.setItems(itemResponses);
        
        return response;
    }
    
    public List<OrderResponseDto> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
        List<OrderResponseDto> responses = new ArrayList<>();
        
        for (Order order : orders) {
            OrderResponseDto response = OrderResponseDto.fromEntity(order);
            response.setItems(getOrderItemsResponse(order.getId()));
            responses.add(response);
        }
        
        return responses;
    }
    
    public Optional<OrderResponseDto> getOrderById(Long orderId, Long userId) {
        Optional<Order> orderOpt = orderRepository.findByIdAndUserId(orderId, userId);
        if (orderOpt.isEmpty()) {
            return Optional.empty();
        }
        
        Order order = orderOpt.get();
        OrderResponseDto response = OrderResponseDto.fromEntity(order);
        response.setItems(getOrderItemsResponse(order.getId()));
        
        return Optional.of(response);
    }
    
    @Transactional
    public OrderResponseDto updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setStatus(status);
        order = orderRepository.save(order);
        
        OrderResponseDto response = OrderResponseDto.fromEntity(order);
        response.setItems(getOrderItemsResponse(order.getId()));
        
        return response;
    }
    
    @Transactional
    public void deleteOrder(Long orderId, Long userId) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (order.getStatus() != Order.OrderStatus.PENDING) {
            throw new RuntimeException("Can only cancel pending orders");
        }
        
        // Restore stock quantities
        List<OrderItem> items = orderItemRepository.findByOrderIdOrderById(orderId);
        for (OrderItem item : items) {
            if (item.hasLaptop()) {
                Laptop laptop = laptopRepository.findById(item.getLaptopId()).get();
                laptop.setStockQuantity(laptop.getStockQuantity() + item.getQuantity());
                laptopRepository.save(laptop);
            } else if (item.hasMouse()) {
                Mouse mouse = mouseRepository.findById(item.getMouseId()).get();
                mouse.setStockQuantity(mouse.getStockQuantity() + item.getQuantity());
                mouseRepository.save(mouse);
            }
        }
        
        // Delete order items and order
        orderItemRepository.deleteByOrderId(orderId);
        orderRepository.deleteById(orderId);
    }
    
    private List<OrderItemResponseDto> getOrderItemsResponse(Long orderId) {
        List<OrderItem> items = orderItemRepository.findByOrderIdOrderById(orderId);
        List<OrderItemResponseDto> responses = new ArrayList<>();
        
        for (OrderItem item : items) {
            String productName;
            String productType;
            
            if (item.hasLaptop()) {
                Optional<Laptop> laptopOpt = laptopRepository.findById(item.getLaptopId());
                if (laptopOpt.isPresent()) {
                    Laptop laptop = laptopOpt.get();
                    productName = laptop.getBrand() + " " + laptop.getModel();
                    productType = "Laptop";
                } else {
                    productName = "Unknown Laptop";
                    productType = "Laptop";
                }
            } else {
                Optional<Mouse> mouseOpt = mouseRepository.findById(item.getMouseId());
                if (mouseOpt.isPresent()) {
                    Mouse mouse = mouseOpt.get();
                    productName = mouse.getBrand() + " " + mouse.getModel();
                    productType = "Mouse";
                } else {
                    productName = "Unknown Mouse";
                    productType = "Mouse";
                }
            }
            
            OrderItemResponseDto response = OrderItemResponseDto.fromEntity(item, productName, productType);
            responses.add(response);
        }
        
        return responses;
    }
}
