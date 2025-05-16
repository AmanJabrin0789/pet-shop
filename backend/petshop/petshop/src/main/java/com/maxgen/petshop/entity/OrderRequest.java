package com.maxgen.petshop.entity;


public class OrderRequest {

    private String fullName;
	
	private String phone;
	
	private String alternatePhone;
	
	private String pinCode;
	
	private String state;
	
	private String city;
	
	private String houseNo;
	
	private String buildingName;
	
	private String roadNameAreaColony;
	
	private String TypeofAddress;

	private String paymentType;
	
	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAlternatePhone() {
		return alternatePhone;
	}

	public void setAlternatePhone(String alternatePhone) {
		this.alternatePhone = alternatePhone;
	}

	public String getPinCode() {
		return pinCode;
	}

	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getHouseNo() {
		return houseNo;
	}

	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}

	public String getBuildingName() {
		return buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}

	public String getRoadNameAreaColony() {
		return roadNameAreaColony;
	}

	public void setRoadNameAreaColony(String roadNameAreaColony) {
		this.roadNameAreaColony = roadNameAreaColony;
	}

	public String getTypeofAddress() {
		return TypeofAddress;
	}

	public void setTypeofAddress(String typeofAddress) {
		TypeofAddress = typeofAddress;
	}
	
	
}
