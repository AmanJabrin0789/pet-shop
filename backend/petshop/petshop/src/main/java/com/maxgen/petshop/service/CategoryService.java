package com.maxgen.petshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maxgen.petshop.entity.Category;
import com.maxgen.petshop.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	//Add category 
	public String addCategory(String catName) {

		Category existingCategory = categoryRepository.findByCatName(catName.toUpperCase());
		
		if(existingCategory != null) {
			return "Category Name Already Registered!";
		}
		
		 Category category = new Category();
		 
		 category.setCatName(catName.toUpperCase());
		
		  categoryRepository.save(category);
		  
		return "Category Added Successfully";
	}
	
	
	//show all category
	public List<Category> showAllCategory(){
		return categoryRepository.findAll();
	}
	
	
	//delete category
	public String deleteCategory(Long id) {
		if(categoryRepository.existsById(id)) {
			categoryRepository.deleteById(id);
			return "Category Delete successfully!!";
		}else {
			return "Category not found!!"+id;
		}
	}
	
	// category count
	public Long showCategoryCount() {
		return categoryRepository.count();
	}
	
	
	//category find by id
	public Optional<Category> getCetegoryByid(Long id) {
		Optional<Category> findCategory = categoryRepository.findById(id);
		return findCategory;
	}
	
	// update category 
	public String updateCategory(Long id , String catName) {
		Category findCategory = categoryRepository.findById(id).orElse(null);
		
		if(findCategory !=null) {
			 findCategory.setCatName(catName.toUpperCase());
			 categoryRepository.save(findCategory);
		  return "Category Update successfully!!";
	    }
		   return "Category Not Found!!";
   }
	
}
