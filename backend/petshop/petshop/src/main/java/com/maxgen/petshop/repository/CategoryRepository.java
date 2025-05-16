package com.maxgen.petshop.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maxgen.petshop.entity.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
		Category  findByCatName(String catName);
}
