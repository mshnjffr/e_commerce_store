package com.example.laptopstore.controller;

import com.example.laptopstore.dto.MessageResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class HealthController {
    
    @GetMapping("/")
    public ResponseEntity<MessageResponseDto> healthCheck() {
        return ResponseEntity.ok(new MessageResponseDto("Laptop Store API is running"));
    }
    
    @GetMapping("/health")
    public ResponseEntity<MessageResponseDto> health() {
        return ResponseEntity.ok(new MessageResponseDto("OK"));
    }
}
