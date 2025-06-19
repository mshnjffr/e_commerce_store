package com.example.laptopstore.service;

import com.example.laptopstore.dto.UserCreateDto;
import com.example.laptopstore.dto.UserResponseDto;
import com.example.laptopstore.entity.User;
import com.example.laptopstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public UserResponseDto createUser(UserCreateDto userCreateDto) {
        if (userRepository.existsByUsername(userCreateDto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        if (userRepository.existsByEmail(userCreateDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        String encodedPassword = passwordEncoder.encode(userCreateDto.getPassword());
        
        User user = new User(
            userCreateDto.getUsername(),
            userCreateDto.getEmail(),
            encodedPassword
        );
        
        User savedUser = userRepository.save(user);
        return new UserResponseDto(savedUser);
    }
    
    @Transactional(readOnly = true)
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
