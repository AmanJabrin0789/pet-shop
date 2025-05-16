package com.maxgen.petshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maxgen.petshop.entity.Admin;
import com.maxgen.petshop.repository.AdminRepository;

@Service
public class AdminService {

	   @Autowired
	   private AdminRepository adminRepository;
	
	   
	   public String addAdmin(String adminName , String adminEmail , String password) {
		   
		    Admin existingAdmin = adminRepository.findByAdminEmail(adminEmail);
		    
		    if(existingAdmin != null) {
		    	 return "Email already registered!";
		    }else {
		    	Admin admin = new Admin();
		    	
		    	admin.setAdminName(adminName);
		    	admin.setAdminEmail(adminEmail);
		    	admin.setPassword(password);
		    	
		    	adminRepository.save(admin);
		    	
		    	return "Admin  registered successfully!";
		    }
		   
	   }
	   
	   
	   public Admin adminLogin(String adminEmail , String password) {
		   
		    Admin adminLogin = adminRepository.findByAdminEmail(adminEmail);
		    
		     if(adminLogin != null && password.equals(adminLogin.getPassword())) {
		    	 return adminLogin;
		     }else {
		    	 return null;
		     }
		   
	   } 
	   
	   
}
