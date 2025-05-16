package com.maxgen.petshop.controller;

import com.maxgen.petshop.entity.User;
import com.maxgen.petshop.service.ContectMsgService;
import com.maxgen.petshop.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") 
public class UserController {

	@Autowired
    private  UserService userService;
    
	@Autowired
	private ContectMsgService contectMsgService;
	
   @GetMapping("/test")
	public String testUser() {
		return "working user api";
	}
	
    @PostMapping("/register")
    public String registerUser(@RequestParam String name, @RequestParam String email, @RequestParam String password) throws MessagingException {
        return userService.registerUser(name, email, password);
    }

    @PostMapping("/verify-otp")
    public String verifyOTP(@RequestParam String email, @RequestParam String otp) {
        return userService.verifyOTP(email, otp);
    }
    
    
   @PostMapping("/forgot-password")
   public String forgotPassword(@RequestParam String email) {
	   return userService.forgotPassword(email);
   } 
    
   
   @PostMapping("/verify-otp-forgot-password")
   public String verifyOTPforgotPassword(@RequestParam String email , @RequestParam String otp , @RequestParam String newPassword ) {
	   
	   return userService.verifyOTPforgotPassword(email, otp, newPassword);
   }
    
    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestParam String email , @RequestParam String password) {
    	 User findUser =  userService.userLogin(email, password);
    	 
    	 if(findUser != null) {
    		 return ResponseEntity.ok(findUser);
    	 }else {
    		 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    	 }
    }
    
    
    @PostMapping("/contect")
    public ResponseEntity<String> contactMsg(@RequestParam String name, @RequestParam String email, @RequestParam String msg) {
        String response = contectMsgService.contectMsg(name, email, msg);
        return ResponseEntity.ok(response);
    }
    
}