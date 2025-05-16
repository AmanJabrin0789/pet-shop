package com.maxgen.petshop.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maxgen.petshop.entity.Cart;
import com.maxgen.petshop.entity.Product;
import com.maxgen.petshop.entity.User;
import com.maxgen.petshop.repository.ProductRepository;
import com.maxgen.petshop.repository.UserRepository;
import com.maxgen.petshop.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000") 
public class CartController {
	
	  @Autowired
	  private ProductRepository productRepository;
	
	  @Autowired
	  private UserRepository userRepository; 
	
	  @Autowired
	  private CartService cartService;
	  
	  
	 @GetMapping("/test")
	  public String testCart() {
		  return "cart api working...";
	  }
	
	 
	 @PostMapping("/addtocart")
	 public ResponseEntity<?> addToCart(@RequestParam Long userId,@RequestParam Long productId,@RequestParam int quantity, @RequestParam double productPrice, @RequestParam(required = false) String size, @RequestParam(required = false) String weight ) {
	     try {
	         Optional<User> userOpt = userRepository.findById(userId);
	         if (userOpt.isEmpty()) {
	             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
	         }

	         Optional<Product> productOpt = productRepository.findById(productId);
	         if (productOpt.isEmpty()) {
	             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found!");
	         }

	         String result = cartService.addToCart(userOpt.get(), productOpt.get(), quantity,productPrice,  size != null ? size : "", weight != null ? weight : "" );

	         return ResponseEntity.status(HttpStatus.CREATED).body(result);

	     } catch (Exception e) {
	         e.printStackTrace();
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
	     }
	 }

	 
	 
	 @PostMapping("/removefromcart")
	 public ResponseEntity<?> removeFromCart(@RequestParam Long userId , @RequestParam Long productId , @RequestParam(required = false , defaultValue = "0") int quantityToRemove){
		  
		try {
			  User user=null;
			  Product product=null;
			  
			// Check if the User exists
			  Optional<User> userOpt = userRepository.findById(userId);
			 
			   if(userOpt.isEmpty()) {
				   return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			   }else {
				   user=userOpt.get();
			   }
			   
			// Check if the Product exists
			   Optional<Product> productOpt = productRepository.findById(productId);
			   
			   if(productOpt.isEmpty()) {
				   return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
			   }else {
				   product = productOpt.get();		   
			   }
			   
			 String result = cartService.removeFromCart(user, product, quantityToRemove);
			   
			   return ResponseEntity.status(HttpStatus.CREATED).body(result);
		} catch (Exception e) {
			e.printStackTrace();
			  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
		}
	 }
	 
	 
	 @GetMapping("/getcartuser/{userId}")
	 public ResponseEntity<?> getCartByUser(@PathVariable Long userId){
		  
		  Optional<User> userOpt = userRepository.findById(userId);
		 
		   if(userOpt.isEmpty()) {
			   return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		   }else {
			   return ResponseEntity.ok(cartService.getCartByUser(userOpt.get()));
		   }
		   
	 }
	 
	 
	 @GetMapping("/getcartusercount/{userId}")
	 public int cartItemCount(@PathVariable Long userId) {
		 
		 Optional<User> userOpt = userRepository.findById(userId);
		 
		 if(userOpt.isPresent()) {
			 return cartService.cartItemCount(userOpt.get());
		 }else {
			 return 0;
		 }
		 
	 }
	 
	 
	 @PostMapping("/removecartitem")
	 public String removeCartItem(@RequestParam Long cartId) {
		 return cartService.removeIteamFromCart(cartId);
	 }
	 
	 
	 @GetMapping("/getallcart")
	 public List<Cart> getAllcart(){
		 return cartService.getAllcart();
	 }
}
