package com.web.toosome.admin.orderManagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OrderManagementController {
	
	@GetMapping("/admin/order-totallist") // 주문 통합 리스트
	public String OrderTotalList() {
		return "adminpages/subpages/orderManagement/orderTotalList";
	}
	
	@GetMapping("/admin/order-finishlist") // 주문 결제완료 리스트
	public String OrderFinishList() {
		return "adminpages/subpages/orderManagement/orderFinishList";
	}
	
	@GetMapping("/admin/order-product-readylist") // 주문 접수완료 리스트
	public String OrderProductReadyList() {
		return "adminpages/subpages/orderManagement/orderProductReadyList";
	}
	
	@GetMapping("/admin/order-delivery-readylist") // 주문 배송준비중 리스트
	public String OrderDeliveryReadyList() {
		return "adminpages/subpages/orderManagement/orderDeliveryReadyList";
	}
	
	@GetMapping("/admin/order-delivery-inglist") // 주문 배송중 리스트
	public String OrderDeliveryIngList() {
		return "adminpages/subpages/orderManagement/orderDeliveryIngList";
	}
	
	@GetMapping("/admin/order-delivery-finishlist") // 주문 배송완료 리스트
	public String OrderDeliveryFinishList() {
		return "adminpages/subpages/orderManagement/orderDeliveryFinishList";
	}
	
	@GetMapping("/admin/order-confirm-finishlist") // 주문 기프티콘 리스트
	public String OrderConfirmFinishList() {
		return "adminpages/subpages/orderManagement/orderConfirmFinishList";
	}
	
	@GetMapping("/admin/order-cancellist") // 주문 취소 리스트
	public String OrderCancelList() {
		return "adminpages/subpages/orderManagement/orderCancelList";
	}
	
}
