package com.maxgen.petshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maxgen.petshop.entity.Cart;
import com.maxgen.petshop.entity.Product;
import com.maxgen.petshop.entity.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long>{
	 Optional<Cart> findByUserAndProduct(User user, Product product);
	 
	  Optional<Cart> findByUserAndProductAndSizeAndWeight(User user, Product product, String size, String weight);
	 
	   List<Cart>  findByUser(User user);
	 
}
