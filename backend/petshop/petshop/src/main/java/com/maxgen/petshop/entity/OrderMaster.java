package com.maxgen.petshop.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class OrderMaster {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private LocalDate orderDate;

	    private Double totalAmount;

	    private String status;

	    private String paymentType;

	    @ManyToOne
	    private User user;

	    @OneToOne(cascade = CascadeType.ALL)
	    private Address orderAddress;

	    @OneToMany(mappedBy = "orderMaster", cascade = CascadeType.ALL)
	    private List<ProductOrder> productOrders = new ArrayList<>();

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

		public Double getTotalAmount() {
			return totalAmount;
		}

		public void setTotalAmount(Double totalAmount) {
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

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public Address getOrderAddress() {
			return orderAddress;
		}

		public void setOrderAddress(Address orderAddress) {
			this.orderAddress = orderAddress;
		}

		public List<ProductOrder> getProductOrders() {
			return productOrders;
		}

		public void setProductOrders(List<ProductOrder> productOrders) {
			this.productOrders = productOrders;
		}
	 
	    
	    
}
