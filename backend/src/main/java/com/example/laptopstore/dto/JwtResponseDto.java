package com.example.laptopstore.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JwtResponseDto {
    
    @JsonProperty("access_token")
    private String accessToken;
    
    @JsonProperty("token_type")
    private String tokenType = "Bearer";
    
    private Long userId;
    private String username;
    
    public JwtResponseDto() {}
    
    public JwtResponseDto(String accessToken, Long userId, String username) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.username = username;
    }
    
    public String getAccessToken() {
        return accessToken;
    }
    
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    
    public String getTokenType() {
        return tokenType;
    }
    
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
}
