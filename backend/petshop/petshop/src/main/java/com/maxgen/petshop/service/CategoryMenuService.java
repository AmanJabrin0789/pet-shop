package com.maxgen.petshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maxgen.petshop.entity.CategoryMenu;
import com.maxgen.petshop.repository.CategoryMenuRepository;


@Service
public class CategoryMenuService {

		@Autowired	
		private CategoryMenuRepository categoryRepository;
	
		
		
		// add category
		public String addCategoryMenu(String catImg, String catName) {
			
			
			  Optional<CategoryMenu> existingCategory = categoryRepository.findByCatName(catName.toUpperCase());
			
			  if(existingCategory.isPresent()) {
				return "Category name already registered!";
			  }else {
			
			
			CategoryMenu category = new CategoryMenu();
			
			category.setCatImg(catImg);
			category.setCatName(catName.toUpperCase());
			
			categoryRepository.save(category);
			
			return "category added successfully";
			} 
			
			
		}
		
		
		//show all category
		 public List<CategoryMenu> showAllCategoryMenu(){
			 return categoryRepository.findAll();
		 }	
	
		
	   //show category count
		public Long showCategoryCount() {
			return categoryRepository.count();
		} 
		
		
		//delete category 
		public String deleteCategoryMenu(Long id) {
			
			 if(categoryRepository.existsById(id)) {
				  categoryRepository.deleteById(id);
				  return "Category Delete successfully!!";
			 }else {
					return "Category not found!!"+id;
				}
			
		}
		 
		
		
		//find category by id 
		public Optional<CategoryMenu> categoryMenuById(Long id) {
			
			Optional<CategoryMenu> findbyId = categoryRepository.findById(id);
			
			return findbyId;
		}
		
		
		//category update 
		public String updateCategoryMenu(Long id, String imgUrl, String catName) {
		    CategoryMenu exitCategory = categoryRepository.findById(id).orElse(null);
		    
		    if (exitCategory != null) {
		       
		        if (imgUrl != null && !imgUrl.isEmpty()) {
		            exitCategory.setCatImg(imgUrl);  
		        }
		        exitCategory.setCatName(catName.toUpperCase());
		        
		        categoryRepository.save(exitCategory); 
		        
		        return "Category Update successfully!!";
		    }
		    
		    return "Category Not Found!!";
		}


		

		
}
