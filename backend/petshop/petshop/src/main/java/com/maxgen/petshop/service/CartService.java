package com.maxgen.petshop.service;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.maxgen.petshop.entity.Cart;
import com.maxgen.petshop.entity.Product;
import com.maxgen.petshop.entity.User;
import com.maxgen.petshop.repository.CartRepository;

@Service
public class CartService {

	@Autowired
	 private CartRepository cartRepository;
	 
	 
	 // add to cart product and increase product quantity
	
	public String addToCart(User user, Product product, int quantityToAdd, double productPrice, String size, String weight) {
	    try {
	        Optional<Cart> existingCartOpt = cartRepository.findByUserAndProductAndSizeAndWeight(user, product, size, weight);

	        if (existingCartOpt.isPresent()) {
	            Cart existingCart = existingCartOpt.get();
	            int newQty = existingCart.getProductQuantity() + quantityToAdd;
	            existingCart.setProductQuantity(newQty);
	            existingCart.setTotalPrice(newQty * productPrice);
	            cartRepository.save(existingCart);
	            return "Existing product quantity updated.";
	        } else {
	            Cart newCart = new Cart();
	            newCart.setUser(user);
	            newCart.setProduct(product);
	            newCart.setProductQuantity(quantityToAdd);
	            newCart.setSize(size);
	            newCart.setWeight(weight);
	            newCart.setTotalPrice(quantityToAdd * productPrice);
	            cartRepository.save(newCart);
	            return "New product added to cart.";
	        }
	    } catch (Exception ex) {
	        ex.printStackTrace();
	        return "Error occurred while adding product to cart.";
	    }
	}

	
	
	
	//add to cart product  Reduce quantity
	
	public String removeFromCart(User user , Product product , int quantityToRemove) {
		
		
		try {
			
			 Optional<Cart> cartOpt = cartRepository.findByUserAndProduct(user, product);
				
			   if(cartOpt.isPresent()) {
				   
				  Cart existingCartOpt = cartOpt.get();
				  int currentQty = existingCartOpt.getProductQuantity();
				  
				  if(quantityToRemove  >= currentQty) {
					  
					  cartRepository.delete(existingCartOpt);
					  return "Product removed from cart.";
					  
				  }else {
					  
					  int newQty = currentQty-quantityToRemove;
					  existingCartOpt.setProductQuantity(newQty);
					  existingCartOpt.setTotalPrice(newQty * product.getPrice());
					  cartRepository.save(existingCartOpt);
					  return "Product quantity reduced in cart.";
					  
				  }
				   
			   }else {
				   return "Product not found in user's cart.";
			   }
			 
			
		} catch (Exception e) {
		     e.printStackTrace();
		      return "Error occurred while removing product from cart.";
		}
		
	}
	
	
	
	// remove product from cart 
	
	public String removeIteamFromCart(Long cartId) {
		
		if(cartRepository.existsById(cartId)) {
			cartRepository.deleteById(cartId);
			return "Product removed from cart";
		}else {
			  return "product not found";
		}
			    
	}
	
	
	//cart find by user
	
	public List<Cart> getCartByUser(User user){
		
		return cartRepository.findByUser(user) ;
	}
	
    // cart item count by user 
	
	public int cartItemCount(User user) {
		
		 List<Cart> CartUser = cartRepository.findByUser(user);
		 
		 return CartUser.size();
		 
	}
	
	public List<Cart> getAllcart(){
		return cartRepository.findAll();
	}
	
}
