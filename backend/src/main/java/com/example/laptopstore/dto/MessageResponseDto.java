package com.example.laptopstore.dto;

public class MessageResponseDto {
    
    private String message;
    
    public MessageResponseDto() {}
    
    public MessageResponseDto(String message) {
        this.message = message;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}
