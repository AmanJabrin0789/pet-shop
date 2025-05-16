package com.maxgen.petshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maxgen.petshop.entity.OrderMaster;
import com.maxgen.petshop.entity.User;

public interface OrderMasterRepository extends JpaRepository<OrderMaster, Long>{

	List<OrderMaster> findByUserOrderByOrderDateDesc(User user);

	List<OrderMaster> findByUser(User user);
	
	Long countByUser(User user);
}
