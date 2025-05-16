package com.maxgen.petshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class CategoryMenu {
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
		
		private String catImg;
		
		@NotNull(message = "category name cannot be null")
		private String catName;

		
		
		
		public Long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

		public String getCatImg() {
			return catImg;
		}

		public void setCatImg(String catImg) {
			this.catImg = catImg;
		}

		public String getCatName() {
			return catName;
		}

		public void setCatName(String catName) {
			this.catName = catName;
		}

		
		
		
}
