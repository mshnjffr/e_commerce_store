package com.example.laptopstore.controller;

import com.example.laptopstore.entity.Laptop;
import com.example.laptopstore.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/laptops")
@CrossOrigin(origins = "*")
public class LaptopController {
    
    @Autowired
    private LaptopService laptopService;
    
    @GetMapping
    public ResponseEntity<List<Laptop>> getAllLaptops() {
        List<Laptop> laptops = laptopService.getAllLaptops();
        return ResponseEntity.ok(laptops);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Laptop> getLaptopById(@PathVariable Long id) {
        Optional<Laptop> laptop = laptopService.getLaptopById(id);
        return laptop.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<Laptop>> getAvailableLaptops() {
        List<Laptop> laptops = laptopService.getAvailableLaptops();
        return ResponseEntity.ok(laptops);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Laptop>> searchLaptops(@RequestParam String q) {
        List<Laptop> laptops = laptopService.searchLaptops(q);
        return ResponseEntity.ok(laptops);
    }
    
    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<Laptop>> getLaptopsByBrand(@PathVariable String brand) {
        List<Laptop> laptops = laptopService.getLaptopsByBrand(brand);
        return ResponseEntity.ok(laptops);
    }
}
