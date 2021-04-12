package com.web.toosome.admin.memberManagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ManagementController {
	@GetMapping("/admin/member-management") // 회원관리 - 회원리스트
	public String memberManagement() {
		return "adminpages/subpages/memberManagement/memberManagement";
	}
}
