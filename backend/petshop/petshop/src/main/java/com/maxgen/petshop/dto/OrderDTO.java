package com.maxgen.petshop.dto;

import java.time.LocalDate;
import java.util.List;

public class OrderDTO {
	
	private Long id;
	private LocalDate orderDate;
	private double totalAmount;
	private String status;
	private String paymentType;
	private AddressDTO orderAddress;
	private List<ProductOrderDTO> productOrders;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalDate getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}
	public double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public AddressDTO getOrderAddress() {
		return orderAddress;
	}
	public void setOrderAddress(AddressDTO orderAddress) {
		this.orderAddress = orderAddress;
	}
	public List<ProductOrderDTO> getProductOrders() {
		return productOrders;
	}
	public void setProductOrders(List<ProductOrderDTO> productOrders) {
		this.productOrders = productOrders;
	}
	
	
}
