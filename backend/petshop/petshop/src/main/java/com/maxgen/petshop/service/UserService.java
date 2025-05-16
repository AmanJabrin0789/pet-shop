package com.maxgen.petshop.service;

import com.maxgen.petshop.entity.User;
import com.maxgen.petshop.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
	
    @Autowired
    private  UserRepository userRepository;
    
    @Autowired
    private  OTPService otpService;

    // Temporary storage for unverified users
    private final Map<String, User> unverifiedUsers = new HashMap<>();
    
    //  Temporary storage for  users OTP for Forgot Password
    private final Map<String , String> forgotPassword = new HashMap<>();
    
    
    // Register User and send OTP to email
    public String registerUser(String name, String email, String password) throws MessagingException {
        // Check if the email already exists in the database
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            return "Email already registered!";
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
     
        // Generate OTP
        String otp = otpService.generateOTP();
        user.setOtp(otp);

        // Store user temporarily
        unverifiedUsers.put(email, user);

        // Send OTP via email
        otpService.sendOTP(email, otp);
        return "OTP sent to your email!";
    }

    
    // Verify OTP and save user to database
    public String verifyOTP(String email, String otp) {
        User user = unverifiedUsers.get(email);
        if (user != null && user.getOtp().equals(otp)) {
            // Save user to database
            userRepository.save(user);
            // Remove from temporary storage
            unverifiedUsers.remove(email);
            return "OTP Verified successfully. User registered!";
        }
        return "Invalid OTP!";
    }
    
    
    
    //show all users
    
    public List<User> showAllUser(){
    	return userRepository.findAll();
    }
    
    //show user count
    
    public Long showUserCount() {
    	return userRepository.count();
    }
    
   // password forgot
    
    public String forgotPassword(String email) {
    	
    	User findUser = userRepository.findByEmail(email);
    	
    	if(findUser !=null) {
    		
    		String otp = otpService.generateOTP();
    		
    		forgotPassword.put(email, otp);
    		
    		otpService.sendOtpForgetPassword(email, otp);
    		
    		return "OTP sent to your email!";
    	}else {
    		return "please enter your registered email address!!";
    	}
    	
    }
    
    
    // Verify OTP and update user to database
    public String verifyOTPforgotPassword(String email,String otp,String newPassword) {
    	
    	String storOTP = forgotPassword.get(email);
    	
    	if(storOTP !=null && storOTP.equals(otp)) {
    		
    		User user = userRepository.findByEmail(email);
    		
    		if(user !=null) {
    			
    			user.setPassword(newPassword);
    			userRepository.save(user);
    			
    			forgotPassword.remove(email);
    			
    			return "Password updated successfully!";
    			
    		}else {
    			return "User not found!";
    		}
    	}else {
    		 return "Invalid OTP!";
    	}
    	
    	
    }
    
    
    // User Login
    
     public User userLogin(String email , String password) {
    	 
    	  User  logingUser= userRepository.findByEmail(email);
    	   
    	   if(logingUser != null &&  password.equals(logingUser.getPassword())) {
    		   
    		  return logingUser;  
    		   
    	   }else {
    		   return null;
    	   }
    	   
     }
    
    
    
}