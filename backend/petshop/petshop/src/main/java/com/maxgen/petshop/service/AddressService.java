package com.maxgen.petshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maxgen.petshop.entity.Address;
import com.maxgen.petshop.entity.User;
import com.maxgen.petshop.repository.AddressRepository;
import com.maxgen.petshop.repository.UserRepository;

@Service
public class AddressService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AddressRepository addressRepository;

	// sev address user

	public String sevAddress(Long userId, String fullName, String phone, String alternatePhone, String pinCode,
			String state, String city, String houseNo, String buildingName, String roadNameAreaColony,
			String TypeofAddress) {

		try {
			Optional<User> finduser = userRepository.findById(userId);
			if (finduser.isPresent()) {
				Address address = addressRepository.findTopByUserIdAndHouseNo(userId, houseNo).orElse(new Address());

				address.setUser(finduser.get());
				address.setFullName(fullName);
				address.setPhone(phone);
				address.setAlternatePhone(alternatePhone);
				address.setPinCode(pinCode);
				address.setState(state);
				address.setCity(city);
				address.setHouseNo(houseNo);
				address.setBuildingName(buildingName);
				address.setRoadNameAreaColony(roadNameAreaColony);
				address.setTypeofAddress(TypeofAddress);

				addressRepository.save(address);
				return "Address saved/updated successfully!";
			} else {
				return "User Not found";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Address saving failed!";
		}
	}

	//  Get All Addresses for a User
	public List<Address> getAddressesByUserId(Long userId) {
		return addressRepository.findByUserId(userId);
	}

}
