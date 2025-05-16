package com.maxgen.petshop.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maxgen.petshop.dto.AddressDTO;
import com.maxgen.petshop.dto.OrderDTO;
import com.maxgen.petshop.dto.ProductOrderDTO;
import com.maxgen.petshop.entity.Address;
import com.maxgen.petshop.entity.Cart;
import com.maxgen.petshop.entity.OrderMaster;
import com.maxgen.petshop.entity.OrderRequest;
import com.maxgen.petshop.entity.ProductOrder;
import com.maxgen.petshop.entity.User;
import com.maxgen.petshop.repository.AddressRepository;
import com.maxgen.petshop.repository.CartRepository;
import com.maxgen.petshop.repository.OrderMasterRepository;
import com.maxgen.petshop.repository.ProductOrderRepository;

@Service
public class OrderService {

	 
	@Autowired
	private ProductOrderRepository orderRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private OrderMasterRepository orderMasterRepository;
	
	
	public String saveOrder(User user, OrderRequest orderRequest) {
	    try {
	        List<Cart> cartsData = cartRepository.findByUser(user);
	        double totalAmount = cartsData.stream().mapToDouble(Cart::getTotalPrice).sum();
	        BigDecimal roundedAmount = new BigDecimal(totalAmount).setScale(2, RoundingMode.HALF_UP);
	        totalAmount = roundedAmount.doubleValue();

	        Address address = new Address();
	       
	        address.setFullName(orderRequest.getFullName());
	        address.setPhone(orderRequest.getPhone());
	        address.setAlternatePhone(orderRequest.getAlternatePhone());
	        address.setPinCode(orderRequest.getPinCode());
	        address.setState(orderRequest.getState());
	        address.setCity(orderRequest.getCity());
	        address.setHouseNo(orderRequest.getHouseNo());
	        address.setBuildingName(orderRequest.getBuildingName());
	        address.setRoadNameAreaColony(orderRequest.getRoadNameAreaColony());
	        address.setTypeofAddress(orderRequest.getTypeofAddress());
	        address.setUser(user);
	        
//	        addressRepository.save(address);
	        address.setUser(user);
	        addressRepository.save(address);

	        OrderMaster masterOrder = new OrderMaster();
	        masterOrder.setOrderDate(LocalDate.now());
	        masterOrder.setTotalAmount(totalAmount);
	        masterOrder.setStatus("pending");
	        masterOrder.setPaymentType(orderRequest.getPaymentType());
	        masterOrder.setUser(user);
	        masterOrder.setOrderAddress(address);

	        List<ProductOrder> orderList = new ArrayList<>();
	        for(Cart cart : cartsData) {
	            ProductOrder order = new ProductOrder();
	            order.setProduct(cart.getProduct());
	            order.setQuantity(cart.getProductQuantity());
	            order.setPrice(cart.getTotalPrice());
	            order.setUser(user);
	            order.setStatus("pending");
	            order.setPaymentType(orderRequest.getPaymentType());
	            // Remove this line since address is now only in OrderMaster
	            // order.setOrderAddress(address);
	            order.setOrderMaster(masterOrder);
	            orderList.add(order);
	        }

	        masterOrder.setProductOrders(orderList);
	        orderMasterRepository.save(masterOrder); // This will cascade to ProductOrder
	        orderRepository.saveAll(orderList); 

	        // Clear the cart after successful order
	        cartRepository.deleteAll(cartsData);
	        
	        return "success";
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "problem...?";
	    }
	}
	

	// find orders by user 
	  public List<OrderDTO> getOrderByUser(User user) {
	        List<OrderMaster> orders = orderMasterRepository.findByUser(user);

	        return orders.stream().map(order -> {
	            OrderDTO dto = new OrderDTO();
	            dto.setId(order.getId());
	            dto.setOrderDate(order.getOrderDate());
	            dto.setTotalAmount(order.getTotalAmount());
	            dto.setStatus(order.getStatus());
	            dto.setPaymentType(order.getPaymentType());

	            AddressDTO addressDTO = new AddressDTO();
	            Address addr = order.getOrderAddress();
	            addressDTO.setFullName(addr.getFullName());
	            addressDTO.setPhone(addr.getPhone());
	            addressDTO.setPinCode(addr.getPinCode());
	            addressDTO.setState(addr.getState());
	            addressDTO.setCity(addr.getCity());
	            addressDTO.setHouseNo(addr.getHouseNo());
	            addressDTO.setBuildingName(addr.getBuildingName());
	            addressDTO.setRoadNameAreaColony(addr.getRoadNameAreaColony());
	            dto.setOrderAddress(addressDTO);

	            List<ProductOrderDTO> productDTOs = order.getProductOrders().stream().map(p -> {
	                ProductOrderDTO pdto = new ProductOrderDTO();
	                pdto.setProductName(p.getProduct().getProductName());
	                pdto.setBrandName(p.getProduct().getBrandName());
	                pdto.setPrice(p.getPrice());
	                pdto.setQuantity(p.getQuantity());
	                pdto.setProductImage(p.getProduct().getProductImg());
	                return pdto;
	            }).collect(Collectors.toList());

	            dto.setProductOrders(productDTOs);

	            return dto;
	        }).collect(Collectors.toList());
	    }
	  
	  
	  // Fetch an order by orderId and map it to OrderDTO
	  public OrderDTO getOrderById(Long orderId) {
	        Optional<OrderMaster> order = orderMasterRepository.findById(orderId);
	        if (!order.isPresent()) {
	            return null;  // Order not found
	        }

	        // Convert OrderMaster to OrderDTO
	        OrderMaster orderEntity = order.get();
	        OrderDTO dto = new OrderDTO();
	        dto.setId(orderEntity.getId());
	        dto.setOrderDate(orderEntity.getOrderDate());
	        dto.setTotalAmount(orderEntity.getTotalAmount());
	        dto.setStatus(orderEntity.getStatus());
	        dto.setPaymentType(orderEntity.getPaymentType());

	        // Map Address
	        AddressDTO addressDTO = new AddressDTO();
	        addressDTO.setFullName(orderEntity.getOrderAddress().getFullName());
	        addressDTO.setPhone(orderEntity.getOrderAddress().getPhone());
	        addressDTO.setPinCode(orderEntity.getOrderAddress().getPinCode());
	        addressDTO.setState(orderEntity.getOrderAddress().getState());
	        addressDTO.setCity(orderEntity.getOrderAddress().getCity());
	        addressDTO.setHouseNo(orderEntity.getOrderAddress().getHouseNo());
	        addressDTO.setBuildingName(orderEntity.getOrderAddress().getBuildingName());
	        addressDTO.setRoadNameAreaColony(orderEntity.getOrderAddress().getRoadNameAreaColony());
	        dto.setOrderAddress(addressDTO);

	        // Map Product Orders (convert ProductOrder to ProductOrderDTO)
	        List<ProductOrderDTO> productOrderDTOs = orderEntity.getProductOrders().stream().map(productOrder -> {
	            ProductOrderDTO productOrderDTO = new ProductOrderDTO();
	            productOrderDTO.setProductName(productOrder.getProduct().getProductName());
	            productOrderDTO.setBrandName(productOrder.getProduct().getBrandName());
	            productOrderDTO.setPrice(productOrder.getPrice());
	            productOrderDTO.setQuantity(productOrder.getQuantity());
	            productOrderDTO.setProductImage(productOrder.getProduct().getProductImg());
	            return productOrderDTO;
	        }).collect(Collectors.toList());

	        dto.setProductOrders(productOrderDTOs);

	        return dto;
	    }

	  
	
	  
	  // count order by users
	  public Long countOrdersByUser(User user) {
		    return orderMasterRepository.countByUser(user);
		}
	  
	  public Long countOrder() {
		  return orderMasterRepository.count();
	  }
	  
	  
	  public boolean updateOrderStatus(Long orderId, String status) {
		    Optional<OrderMaster> optionalOrder = orderMasterRepository.findById(orderId);
		    if (optionalOrder.isPresent()) {
		        OrderMaster order = optionalOrder.get();
		        order.setStatus(status);
		        orderMasterRepository.save(order);
		        return true;
		    }
		    return false;
		}

}
