package com.maxgen.petshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maxgen.petshop.entity.Address;
import com.maxgen.petshop.service.AddressService;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping("api/address")
public class AddressController {

	@Autowired
	private AddressService addressService;
	
	
	
	@GetMapping("/test")
	public String addressTest() {
		return "api working address";
	}
	
	 // Save or update address
    @PostMapping("/save")
    public String saveAddress(
        @RequestParam Long userId,
        @RequestParam String fullName,
        @RequestParam String phone,
        @RequestParam(required = false) String alternatePhone,
        @RequestParam String pinCode,
        @RequestParam String state,
        @RequestParam String city,
        @RequestParam String houseNo,
        @RequestParam(required = false) String buildingName,
        @RequestParam String roadNameAreaColony,
        @RequestParam String typeofAddress
    ) {
        return addressService.sevAddress(userId, fullName, phone, alternatePhone, pinCode, state, city, houseNo, buildingName, roadNameAreaColony, typeofAddress);
    }

    
    // Get addresses of a user
    @GetMapping("/user/{userId}")
    public List<Address> getUserAddresses(@PathVariable Long userId) {
        return addressService.getAddressesByUserId(userId);
    }
	
	
}
