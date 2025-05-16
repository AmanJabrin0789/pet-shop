package com.maxgen.petshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.maxgen.petshop.entity.CategoryMenu;

@Repository
public interface CategoryMenuRepository extends JpaRepository<CategoryMenu, Long> {

	Optional<CategoryMenu> findByCatName(String catName);   
	
	
    
}
