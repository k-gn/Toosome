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
	public String findId() { // 아이디 찾기
		return "subpages/signin/findId/findId";
	}
	
	@GetMapping("/find-pwd")
	public String findPwd() { // 비밀번호 찾기
		return "subpages/signin/findPwd/findPwd";
	}
	
	// 로그인 관련 `
}
