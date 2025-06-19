package com.example.laptopstore.service;

import com.example.laptopstore.entity.Laptop;
import com.example.laptopstore.repository.LaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class LaptopService {
    
    @Autowired
    private LaptopRepository laptopRepository;
    
    public List<Laptop> getAllLaptops() {
        return laptopRepository.findAll();
    }
    
    public Optional<Laptop> getLaptopById(Long id) {
        return laptopRepository.findById(id);
    }
    
    public List<Laptop> getAvailableLaptops() {
        return laptopRepository.findAvailableLaptops();
    }
    
    public List<Laptop> searchLaptops(String searchTerm) {
        return laptopRepository.searchLaptops(searchTerm);
    }
    
    public List<Laptop> getLaptopsByBrand(String brand) {
        return laptopRepository.findByBrandIgnoreCase(brand);
    }
    
    @Transactional
    public void updateStock(Long laptopId, Integer quantity) {
        Optional<Laptop> laptopOpt = laptopRepository.findById(laptopId);
        if (laptopOpt.isPresent()) {
            Laptop laptop = laptopOpt.get();
            int newStock = laptop.getStockQuantity() - quantity;
            if (newStock < 0) {
                throw new RuntimeException("Insufficient stock for laptop: " + laptop.getBrand() + " " + laptop.getModel());
            }
            laptop.setStockQuantity(newStock);
            laptopRepository.save(laptop);
        } else {
            throw new RuntimeException("Laptop not found with id: " + laptopId);
        }
    }
    
    public boolean isStockAvailable(Long laptopId, Integer quantity) {
        Optional<Laptop> laptopOpt = laptopRepository.findById(laptopId);
        return laptopOpt.map(laptop -> laptop.getStockQuantity() >= quantity).orElse(false);
    }
}
