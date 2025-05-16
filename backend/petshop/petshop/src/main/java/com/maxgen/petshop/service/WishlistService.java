package com.maxgen.petshop.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.maxgen.petshop.entity.Product;
import com.maxgen.petshop.entity.User;
import com.maxgen.petshop.entity.Wishlist;
import com.maxgen.petshop.repository.WishlistRepository;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    public List<Wishlist> getWishlistByUserId(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    public boolean isProductInWishlist(Long userId, Long productId) {
        return wishlistRepository.findByUserId(userId).stream()
                .anyMatch(w -> w.getProduct().getId().equals(productId));
    }

    public Wishlist addToWishlist(User user, Product product) {
        if (isProductInWishlist(user.getId(), product.getId())) {
            return null; // Already exists
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setProduct(product);
        return wishlistRepository.save(wishlist);
    }

    public void removeFromWishlist(Long wishlistId) {
        wishlistRepository.deleteById(wishlistId);
    }
}
