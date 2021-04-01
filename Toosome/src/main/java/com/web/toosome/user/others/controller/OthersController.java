package com.web.toosome.user.others.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OthersController {
	@GetMapping("/franchise")	// â������ ������
	public String franchise() {
		return "subpages/franchise/franchise";
	}

	@GetMapping("/franchisepay")	// ������ ���� ������ǰ ������
	public String franchisepay() {
		return "subpages/franchisePay/franchisePay";
	}

	@GetMapping("/explanation")	// â�� ���� ������
	public String explanation() {
		return "subpages/explanation/explanation";
	}

	@GetMapping("/allbuy") // ��ü���� ������
	public String allBuy() {
		return "subpages/allBuy/allBuy";
	}

	@GetMapping("/sitemap")	// �޴��� Map ������
	public String sitemap() {
		return "subpages/siteMap/siteMap";
	}
}
