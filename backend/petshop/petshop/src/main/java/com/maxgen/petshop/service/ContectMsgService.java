package com.maxgen.petshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maxgen.petshop.entity.ContectMsg;
import com.maxgen.petshop.repository.ContectMsgRepository;

@Service
public class ContectMsgService {

	 @Autowired
	 private ContectMsgRepository contectMsgRepository;
	
	
	
	 public String contectMsg(String name , String email , String msg) {
		 
		  ContectMsg cont = new ContectMsg();
		  
		  cont.setName(name);
		  cont.setUserEmail(email);
		  cont.setMSG(msg);
		  
		  contectMsgRepository.save(cont);
		 
		  return "send msg";
	 }
	
}
