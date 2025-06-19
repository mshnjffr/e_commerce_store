package com.example.laptopstore.controller;

import com.example.laptopstore.entity.Mouse;
import com.example.laptopstore.service.MouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/mice")
@CrossOrigin(origins = "*")
public class MouseController {
    
    @Autowired
    private MouseService mouseService;
    
    @GetMapping
    public ResponseEntity<List<Mouse>> getAllMice() {
        List<Mouse> mice = mouseService.getAllMice();
        return ResponseEntity.ok(mice);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Mouse> getMouseById(@PathVariable Long id) {
        Optional<Mouse> mouse = mouseService.getMouseById(id);
        return mouse.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<Mouse>> getAvailableMice() {
        List<Mouse> mice = mouseService.getAvailableMice();
        return ResponseEntity.ok(mice);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Mouse>> searchMice(@RequestParam String q) {
        List<Mouse> mice = mouseService.searchMice(q);
        return ResponseEntity.ok(mice);
    }
    
    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<Mouse>> getMiceByBrand(@PathVariable String brand) {
        List<Mouse> mice = mouseService.getMiceByBrand(brand);
        return ResponseEntity.ok(mice);
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Mouse>> getMiceByType(@PathVariable String type) {
        List<Mouse> mice = mouseService.getMiceByType(type);
        return ResponseEntity.ok(mice);
    }
}
