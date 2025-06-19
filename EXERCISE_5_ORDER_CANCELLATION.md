# 🚫 Exercise 5: Order Cancellation Functionality

## 🎯 Objective
Implement robust order cancellation functionality with proper error handling, authentication, and user experience considerations.

## 📋 Current System Analysis

### ✅ Verified Backend Implementation
The DELETE `/api/v1/orders/{orderId}` endpoint exists with these specifications:

**Endpoint**: `DELETE /api/v1/orders/{orderId}`
**Authentication**: JWT Token required (USER role)
**Authorization**: Users can only cancel their own orders
**Business Logic**: Only PENDING orders can be cancelled
**Stock Management**: Automatically restores inventory upon cancellation

### 🔍 API Response Formats

**Success Response (200 OK)**:
```json
{
  "message": "Order deleted successfully"
}
```

**Error Responses**:
- **401 Unauthorized**: Missing or invalid JWT token
- **403 Forbidden**: User doesn't have permission to cancel this order
- **404 Not Found**: Order doesn't exist or doesn't belong to user
- **400 Bad Request**: Order cannot be cancelled (not PENDING status)
```json
{
  "message": "Only pending orders can be deleted"
}
```

## 🧠 Modern Prompting Techniques for Implementation

### 1. Role-Based Expert Prompting
```
You are a senior frontend developer specializing in e-commerce order management systems. Your expertise includes:
- API integration with proper error handling
- User experience optimization for order cancellation flows
- Authentication state management
- Real-time UI updates after API operations

Task: Implement order cancellation with professional-grade error handling and user feedback.
```

### 2. Chain of Thought API Integration
```
When implementing order cancellation, follow this systematic approach:

1. **Pre-cancellation Validation**:
   - Verify user is authenticated
   - Check order belongs to current user
   - Confirm order status is PENDING
   - Display confirmation dialog with order details

2. **API Request Chain**:
   - Prepare DELETE request with proper headers
   - Include JWT token in Authorization header
   - Handle loading states during request
   - Process response based on status code

3. **Post-cancellation Actions**:
   - Update UI to remove cancelled order
   - Show success notification
   - Refresh order list if needed
   - Handle any inventory-related UI updates
```

### 3. Self-Consistency Error Handling
Test your implementation against these scenarios:

**Scenario A**: Valid cancellation
- User cancels their own PENDING order
- Expected: Success message, order removed from UI

**Scenario B**: Invalid order status
- User tries to cancel SHIPPED order
- Expected: Error message "Only pending orders can be deleted"

**Scenario C**: Unauthorized access
- User tries to cancel another user's order
- Expected: 403 Forbidden error

**Scenario D**: Network failure
- API request fails due to network issues
- Expected: Retry option or clear error message

### 4. Few-Shot Error Handling Examples

```javascript
// Example 1: Comprehensive error handling
const cancelOrder = async (orderId) => {
  try {
    setLoading(true);
    
    const response = await fetch(`/api/v1/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      showSuccess(result.message);
      removeOrderFromUI(orderId);
    } else {
      const error = await response.json();
      showError(error.message || 'Failed to cancel order');
    }
  } catch (error) {
    showError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};

// Example 2: Status-specific error handling
const handleCancellationError = (response) => {
  switch (response.status) {
    case 400:
      return 'This order cannot be cancelled (may have already been processed)';
    case 401:
      return 'Please log in to cancel orders';
    case 403:
      return 'You can only cancel your own orders';
    case 404:
      return 'Order not found';
    default:
      return 'An unexpected error occurred';
  }
};
```

## 🛠️ Implementation Tasks

### Task 1: Add Cancel Order Function
Create a robust cancellation function with:
- Proper authentication headers
- Comprehensive error handling
- Loading states
- User feedback

### Task 2: UI Integration
- Add cancel buttons to order list (only for PENDING orders)
- Implement confirmation dialog
- Show loading indicators
- Display success/error messages

### Task 3: Order Status Validation
- Only show cancel option for PENDING orders
- Disable cancel button for SHIPPED/DELIVERED orders
- Provide clear status indicators

### Task 4: Error Recovery
- Implement retry mechanisms for network failures
- Provide fallback actions for different error types
- Maintain UI consistency during error states

## 🧪 Testing Methodology

### Step-by-Step Testing Approach:

1. **Authentication Testing**:
   ```bash
   # Test without token
   curl -X DELETE http://localhost:8080/api/v1/orders/1
   
   # Test with invalid token
   curl -X DELETE http://localhost:8080/api/v1/orders/1 \
     -H "Authorization: Bearer invalid_token"
   ```

2. **Authorization Testing**:
   ```bash
   # Test cancelling another user's order
   curl -X DELETE http://localhost:8080/api/v1/orders/999 \
     -H "Authorization: Bearer ${YOUR_TOKEN}"
   ```

3. **Business Logic Testing**:
   ```bash
   # Test cancelling non-pending order
   curl -X DELETE http://localhost:8080/api/v1/orders/shipped_order_id \
     -H "Authorization: Bearer ${YOUR_TOKEN}"
   ```

### UI Testing Checklist:
- [ ] Cancel button only appears for PENDING orders
- [ ] Confirmation dialog shows order details
- [ ] Loading state during API request
- [ ] Success message after cancellation
- [ ] Order removed from UI after cancellation
- [ ] Error messages are user-friendly
- [ ] Retry mechanism for network failures

## 🎨 UX Considerations

### User Experience Best Practices:
1. **Clear Cancellation Criteria**: Explain when orders can be cancelled
2. **Confirmation Dialog**: Show order details before cancellation
3. **Immediate Feedback**: Update UI instantly after successful cancellation
4. **Graceful Error Handling**: Provide actionable error messages
5. **Loading States**: Show progress during API requests

### Progressive Enhancement:
- Basic functionality works without JavaScript
- Enhanced experience with proper loading states
- Optimistic UI updates where appropriate
- Offline handling for better reliability

## 🔧 Advanced Features (Optional)

### Bonus Implementations:
1. **Bulk Cancellation**: Cancel multiple orders at once
2. **Cancellation Reasons**: Allow users to specify why they're cancelling
3. **Refund Integration**: Handle refund processing automatically
4. **Email Notifications**: Send cancellation confirmations
5. **Analytics Tracking**: Track cancellation patterns for business insights

## 📊 Success Metrics

Your implementation should achieve:
- ✅ 100% success rate for valid cancellations
- ✅ Proper error handling for all edge cases
- ✅ User-friendly error messages
- ✅ Consistent UI behavior across all scenarios
- ✅ Optimal loading states and feedback

## 🚀 Next Steps

After completing this exercise:
1. Review error handling patterns for other API endpoints
2. Consider implementing similar patterns for order modifications
3. Explore advanced features like partial cancellations
4. Test with real user scenarios and gather feedback

---

*This exercise focuses on production-ready implementation with modern development practices and comprehensive error handling.*
