package com.example.laptopstore.service;

import com.example.laptopstore.entity.Mouse;
import com.example.laptopstore.repository.MouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class MouseService {
    
    @Autowired
    private MouseRepository mouseRepository;
    
    public List<Mouse> getAllMice() {
        return mouseRepository.findAll();
    }
    
    public Optional<Mouse> getMouseById(Long id) {
        return mouseRepository.findById(id);
    }
    
    public List<Mouse> getAvailableMice() {
        return mouseRepository.findAvailableMice();
    }
    
    public List<Mouse> searchMice(String searchTerm) {
        return mouseRepository.searchMice(searchTerm);
    }
    
    public List<Mouse> getMiceByBrand(String brand) {
        return mouseRepository.findByBrandIgnoreCase(brand);
    }
    
    public List<Mouse> getMiceByType(String mouseType) {
        return mouseRepository.findByMouseTypeIgnoreCase(mouseType);
    }
    
    @Transactional
    public void updateStock(Long mouseId, Integer quantity) {
        Optional<Mouse> mouseOpt = mouseRepository.findById(mouseId);
        if (mouseOpt.isPresent()) {
            Mouse mouse = mouseOpt.get();
            int newStock = mouse.getStockQuantity() - quantity;
            if (newStock < 0) {
                throw new RuntimeException("Insufficient stock for mouse: " + mouse.getBrand() + " " + mouse.getModel());
            }
            mouse.setStockQuantity(newStock);
            mouseRepository.save(mouse);
        } else {
            throw new RuntimeException("Mouse not found with id: " + mouseId);
        }
    }
    
    public boolean isStockAvailable(Long mouseId, Integer quantity) {
        Optional<Mouse> mouseOpt = mouseRepository.findById(mouseId);
        return mouseOpt.map(mouse -> mouse.getStockQuantity() >= quantity).orElse(false);
    }
}
