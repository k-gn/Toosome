package com.web.toosome.user.login.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
	@GetMapping("/signin")
	public String signin() {
		return "subpages/signin/signin";
	}
	
	@GetMapping("/find-id")
	public String findId() { // ���̵� ã��
		return "subpages/signin/findId/findId";
	}
	
	@GetMapping("/find-pwd")
	public String findPwd() { // ��й�ȣ ã��
		return "subpages/signin/findPwd/findPwd";
	}
	
	// �α��� ���� 
}
