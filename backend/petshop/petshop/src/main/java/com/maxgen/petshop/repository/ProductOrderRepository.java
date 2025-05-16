package com.maxgen.petshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maxgen.petshop.entity.ProductOrder;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder, Long>{
       
	  List<ProductOrder> findByUserId(Long userId);
	  
	  Optional<ProductOrder> findById(Long id);
	  
	  
}
