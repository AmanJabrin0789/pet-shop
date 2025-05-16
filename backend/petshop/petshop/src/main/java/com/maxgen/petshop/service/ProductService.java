package com.maxgen.petshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maxgen.petshop.entity.Category;
import com.maxgen.petshop.entity.Product;
import com.maxgen.petshop.repository.CategoryRepository;
import com.maxgen.petshop.repository.ProductRepository;

@Service
public class ProductService {

	 @Autowired
	  private CategoryRepository categoryRepository;
	 
	 @Autowired
	  private ProductRepository productRepository;
	  
	  
	 // add product 
	
	 public String addProduct(Long catId ,String brandName , String productName , double price , Integer stockQuantity , String description , String productImg) {
		 
		 try {
		        Category findCategory = categoryRepository.findById(catId).orElse(null);

		        if(findCategory != null) {
		            Product product = new Product();
		            
		            product.setBrandName(brandName.toUpperCase());
		            product.setProductName(productName.toUpperCase());
		            product.setPrice(price);
		            product.setStockQuantity(stockQuantity);
		            product.setDescription(description.toUpperCase());
		            product.setCategory(findCategory);
		            product.setProductImg(productImg);

		            productRepository.save(product);
		            
		            return "Product Added successfully";
		            
		        } else {
		            return "Category not found";
		        }

		    } catch (Exception e) {
		        e.printStackTrace(); 
		        return "Error: " + e.getMessage();
		    }
	 }	
	 
	 
	 //show all product 
	 
	 public List<Product> showAllProduct(){
		 return productRepository.findAll();		 
	 }
	
	 //count product
	 
	 public Long productCount() {
		 return productRepository.count();
	 }
	 
	 
	 //delete product
	 
	 public String deleteProduct(Long id) {
		 if(productRepository.existsById(id)) {
			 productRepository.deleteById(id);
			 return "Product Delete successfully!!";
		 }else {
			 return "Product Not Found!!";
		 }
	 }
	 
	 // product by id 
	 
	 public Optional<Product> productById(Long id) {
		 Optional<Product> findProduct = productRepository.findById(id);
		 return findProduct;
	 }
	 
	 
	 //update Product
	 
	 public String updateProduct(Long id , Long catId , String brandName , String productName , double price , Integer stockQuantity , String description , String productImg) {
		  
		   Product findProduct = productRepository.findById(id).orElse(null);
		   
		   if(findProduct != null) {
			   
			   Category findCategory = categoryRepository.findById(catId).orElse(null);
			   
			   if(findCategory != null) {
				    
				    findProduct.setCategory(findCategory);
				    findProduct.setBrandName(brandName.toUpperCase());
				    findProduct.setProductName(productName.toUpperCase());
				    findProduct.setPrice(price);
				    findProduct.setStockQuantity(stockQuantity);
				    findProduct.setDescription(description.toUpperCase());
				    findProduct.setProductImg(productImg);
				    
				    productRepository.save(findProduct);
				    
				    return "Product Update successfully!!";
				    
			   }else {
				   return "Category not found";
			   }
		   }else {
			   return "Product Not Found!!";
		   }
		 
	 }
	
}
