package com.web.toosome.user.menu.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class MenuController {
	@GetMapping("/menu")   // �̰� cafe�� ���� ���
	public String menu() {
		return "subpages/menu/menu";
	}
}
