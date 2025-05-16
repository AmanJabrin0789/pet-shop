package com.maxgen.petshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maxgen.petshop.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{

	List<Address> findByUserId(Long userId);
	
    Optional<Address> findTopByUserIdAndHouseNo(Long userId, String houseNo);
	
}
