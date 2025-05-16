package com.maxgen.petshop.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.maxgen.petshop.entity.Admin;
import com.maxgen.petshop.entity.Category;
import com.maxgen.petshop.entity.CategoryMenu;
import com.maxgen.petshop.entity.ContectMsg;
import com.maxgen.petshop.entity.Product;
import com.maxgen.petshop.entity.User;
import com.maxgen.petshop.helper.FileUploadHelper;
import com.maxgen.petshop.repository.ContectMsgRepository;
import com.maxgen.petshop.service.AdminService;
import com.maxgen.petshop.service.CategoryMenuService;
import com.maxgen.petshop.service.CategoryService;
import com.maxgen.petshop.service.ProductService;
import com.maxgen.petshop.service.UserService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000") 
public class AdminController {
 
	@Autowired
	private AdminService adminService;
	
	@Autowired
	 private CategoryMenuService categorymenuService;
	 
	@Autowired
	 private UserService userService;
	
	@Autowired
	 private FileUploadHelper fileUploadHelper;
	
	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ContectMsgRepository contectMsgRepository;
	
	@GetMapping("/test")
	public String testAdmin() {
		return "working admin api";
	}
	
	//admin 
	
	@PostMapping("/addadmin")
	public String addAdmin(@RequestParam String adminName ,@RequestParam String adminEmail ,@RequestParam String password) {
		return adminService.addAdmin(adminName, adminEmail, password);

	}
	
	
	
	@PostMapping("/adminlogin")
	public ResponseEntity<?> adminLogin(@RequestParam String adminEmail , @RequestParam String password) {
		 Admin admin = adminService.adminLogin(adminEmail, password);
		 
		 if(admin != null) {
			 return ResponseEntity.ok(admin);
		 }else {
			 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		 }
	}
	
	
	
	// add category menu slider
	
	 @PostMapping("/addcategorymenu")
	 public String addCategory(@RequestParam("catImg") MultipartFile catImg, @RequestParam String catName) {
	        try {
	            String filename = fileUploadHelper.uploadFile(catImg);
	            return categorymenuService.addCategoryMenu(filename, catName);
	        } catch (Exception e) {
	            return "Error uploading image";
	        }
	    }
	    
	
	
	@GetMapping("/showallcategorymenu")
	public List<CategoryMenu> showAllCategoryMenu(){
		return categorymenuService.showAllCategoryMenu();
	}
	
	
	@GetMapping("/categorymenucount")
	public Long showCategoryMenuCount() {
		return categorymenuService.showCategoryCount();
	}
	
	@GetMapping("/showalluser")
	public List<User> showAllUser(){
		return userService.showAllUser();
	}
	
	
	@GetMapping("/usercount")
	public Long showUserCount() {
	 return userService.showUserCount();
	}
	
	
	@GetMapping("/deletecategorymenu/{id}")
	public String deleteCategoryMenu(@PathVariable Long id) {
		return categorymenuService.deleteCategoryMenu(id);
	}
	
	
	@GetMapping("/categorymenu/{id}")
	public Optional<CategoryMenu> getCategoryMenuById(@PathVariable Long id) {
		return categorymenuService.categoryMenuById(id);
	}

	
	 @PostMapping("/updatecategorymenu")
	 public String updateCategory(@RequestParam Long id,@RequestParam(required = false) MultipartFile imgUrl, @RequestParam String catName) {
	        try {
	            String filename = null;
	            if (imgUrl != null && !imgUrl.isEmpty()) {
	                filename = fileUploadHelper.uploadFile(imgUrl);
	            }
	            return categorymenuService.updateCategoryMenu(id, filename, catName);
	        } catch (Exception e) {
	            return "Error updating image";
	        }
	    }
	
	 
	 
	 // product category 
	 
	 @PostMapping("/addcategory")
	 public String addCategory(@RequestParam String catName) {
		 return categoryService.addCategory(catName);
	 }
	 
	 @GetMapping("/showallcategory")
	 public List<Category> showAllCategory(){
		 return categoryService.showAllCategory();
	 }
	 	 
	 @GetMapping("/categorycount")
	 public Long showCategoryCount() {
		return categoryService.showCategoryCount();
	 }
	 
	 @GetMapping("/deletecategory/{id}")
	 public String deleteCategory(@PathVariable Long id) {
		 return categoryService.deleteCategory(id);
	 }
	 
	 
	 @GetMapping("/category/{id}")
	 public Optional<Category> getCategoryById(@PathVariable Long id) {
		 return categoryService.getCetegoryByid(id);
	 }
	 	
	 
	 @PostMapping("/updatecategory")
	 public String updateCategory(@RequestParam Long id , @RequestParam String catName) {
		 return categoryService.updateCategory(id, catName);
	 }
	 
	 
	 // product 
	 
	 @PostMapping("/addproduct")
	 public String addProduct(@RequestParam Long catId ,@RequestParam String brandName,@RequestParam String productName ,@RequestParam double price ,@RequestParam Integer stockQuantity ,@RequestParam String description ,@RequestParam("productImg") MultipartFile productImg ) {

		 try {
			
			  String filename = fileUploadHelper.uploadFile(productImg);
				 
				 return productService.addProduct(catId, brandName, productName, price, stockQuantity, description, filename);
			 
		} catch (Exception e) {
			 return "Error uploading image";
		}
		 	
	 }
	 
	 
	 @GetMapping("/showallproduct")
	 public List<Product> showAllProduct(){
		 return productService.showAllProduct();
	 }
	 
	 
	 @GetMapping("/productcount")
	 public Long productCount() {
		 return productService.productCount();
	 }
	 
	@GetMapping("/deleteproduct/{id}")
	 public String deleteProduct(@PathVariable Long id) {
		 return productService.deleteProduct(id);
	 }
	 
	
	@GetMapping("/product/{id}")
	public Optional<Product> productById(@PathVariable Long id) {
		 return productService.productById(id);
	}
	
	
	@PostMapping("/updateproduct")
	public String updateProduct(@RequestParam Long id ,@RequestParam Long catId ,@RequestParam String brandName ,@RequestParam String productName ,@RequestParam double price ,@RequestParam Integer sqstockQuantity ,@RequestParam String description  ,@RequestParam("productImg") MultipartFile productimg ) {
		
		 try {
			
			  String image = null;
			  
			   if(productimg != null && !productimg.isEmpty()) {
				   image = fileUploadHelper.uploadFile(productimg);
			   }
			  
			   return productService.updateProduct(id, catId, brandName, productName, price, sqstockQuantity, description, image);
			 
		} catch (Exception e) {
			return "Error updating image";
		}
				
	}
	
	
	@GetMapping("/contect/messages")
	public ResponseEntity<List<ContectMsg>> getAllContactMessages() {
	    List<ContectMsg> messages = contectMsgRepository.findAll();
	    return ResponseEntity.ok(messages);
	}

	
}
