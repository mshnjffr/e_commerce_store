package com.example.laptopstore.controller;

import com.example.laptopstore.dto.*;
import com.example.laptopstore.entity.User;
import com.example.laptopstore.service.UserService;
import com.example.laptopstore.security.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserCreateDto userCreateDto) {
        try {
            UserResponseDto userResponse = userService.createUser(userCreateDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponseDto(e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginDto userLoginDto) {
        try {
            Optional<User> userOpt = userService.findByUsername(userLoginDto.getUsername());
            
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponseDto("Invalid username or password"));
            }
            
            User user = userOpt.get();
            
            if (!userService.validatePassword(userLoginDto.getPassword(), user.getPasswordHash())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponseDto("Invalid username or password"));
            }
            
            String token = jwtTokenProvider.generateToken(user.getUsername());
            
            JwtResponseDto jwtResponse = new JwtResponseDto(token, user.getId(), user.getUsername());
            return ResponseEntity.ok(jwtResponse);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponseDto("Login failed: " + e.getMessage()));
        }
    }
}
