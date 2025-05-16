package com.maxgen.petshop.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maxgen.petshop.dto.OrderDTO;
import com.maxgen.petshop.dto.UserOrderDTO;
import com.maxgen.petshop.entity.OrderMaster;
import com.maxgen.petshop.entity.OrderRequest;
import com.maxgen.petshop.entity.User;
import com.maxgen.petshop.repository.UserRepository;
import com.maxgen.petshop.service.CartService;
import com.maxgen.petshop.service.OrderService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/order")
public class OrderController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/test")
	 public String orderTest() {
		 return "order api working..";
	 }
	
	@PostMapping("/saveorder")
	public String saveOrder(@RequestBody  OrderRequest request , @RequestParam Long userId ) {
		
		 Optional<User> findUser = userRepository.findById(userId);

//		/ System.out.println(request);
		
		return orderService.saveOrder(findUser.get(), request);
	}
	
	
	 @GetMapping("/orders/{userId}")
	 public List<OrderDTO> getOrderByUser(@PathVariable Long userId) {
	        Optional<User> user = userRepository.findById(userId);
	        return orderService.getOrderByUser(user.get());
	    }
	 
	 
	    @GetMapping("/ordersid/{orderId}")
	    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long orderId) {
	        OrderDTO orderDTO = orderService.getOrderById(orderId);
	        if (orderDTO == null) {
	            return ResponseEntity.notFound().build();  // Return 404 if order not found
	        }
	        return ResponseEntity.ok(orderDTO);  // Return 200 with order details
	    }
	 
	
	 @GetMapping("/orders/allusers")
	 public List<UserOrderDTO> getOrdersForAllUsers() {
	     List<User> users = userRepository.findAll();

	     return users.stream().map(user -> {
	         UserOrderDTO dto = new UserOrderDTO();
	         dto.setUserId(user.getId());
	         dto.setName(user.getName());
	         dto.setEmail(user.getEmail());

	         // Includes products and address for each order
	         dto.setOrders(orderService.getOrderByUser(user));
	         return dto;
	     }).collect(Collectors.toList());
	 }
	 
	 
    @GetMapping("/countorder")
	 public Long countOrder() {
		 return orderService.countOrder();
	 }
	 
	 @GetMapping("/orderscount/{userId}")
	 public Long getOrderCountByUser(@PathVariable Long userId) {
	        Optional<User> user = userRepository.findById(userId);
	        return orderService.countOrdersByUser(user.get());
	    }
	 
	 
	 @PutMapping("/orders/{orderId}/status")
	 public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
	     boolean updated = orderService.updateOrderStatus(orderId, status);
	     if (updated) {
	         return ResponseEntity.ok("Order status updated successfully");
	     } else {
	         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
	     }
	 }

	 @GetMapping("/user/{userId}")
	 public ResponseEntity<List<OrderDTO>> getUserOrdersById(@PathVariable Long userId) {
	     Optional<User> user = userRepository.findById(userId);

	     if (user.isEmpty()) {
	         return ResponseEntity.notFound().build();
	     }

	     List<OrderDTO> orders = orderService.getOrderByUser(user.get());
	     return ResponseEntity.ok(orders);
	 }

	 
}
