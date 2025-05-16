package com.maxgen.petshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maxgen.petshop.entity.Admin;


@Repository
public interface AdminRepository extends JpaRepository<Admin, Long>{
  
	 Admin findByAdminEmail(String adminEmail); 
	
}
