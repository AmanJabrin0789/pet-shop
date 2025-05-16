package com.maxgen.petshop.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OTPService {

    private final JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public OTPService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    // Generate 6-digit OTP
    public String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); 
        return String.valueOf(otp);
    }

    // Send OTP to user's email
    public void sendOTP(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Your OTP for Registration");
        message.setText("Your OTP for registration is: " + otp);
        emailSender.send(message);
    }
    

    
    // Send OTP To User's Forgot Password
     public void sendOtpForgetPassword(String toEmail , String otp) {
    	 SimpleMailMessage message = new SimpleMailMessage();
    	 message.setFrom(fromEmail);
    	 message.setTo(toEmail);
    	 message.setSubject("Password Reset");
    	 message.setText("Your OTP for Forgot Password is: "+otp);
    	 emailSender.send(message);
     }
    
}