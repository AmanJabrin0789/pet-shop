package com.maxgen.petshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maxgen.petshop.entity.Wishlist;
import com.maxgen.petshop.service.WishlistService;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping("api/wishlist")
public class WishlistController {

	@Autowired
	private WishlistService wishlistService;
	
	@GetMapping("/test")
	public String WishlistTest() {
		return "Wishlist api working";
	}
	
	
	  @GetMapping("/{userId}")
	    public List<Wishlist> getWishlist(@PathVariable Long userId) {
	        return wishlistService.getWishlistByUserId(userId);
	    }

	    @PostMapping("/add")
	    public Wishlist addToWishlist(@RequestBody Wishlist wishlist) {
	        return wishlistService.addToWishlist(wishlist.getUser(), wishlist.getProduct());
	    }

	    @DeleteMapping("/remove/{wishlistId}")
	    public void removeFromWishlist(@PathVariable Long wishlistId) {
	        wishlistService.removeFromWishlist(wishlistId);
	    }
	
}
