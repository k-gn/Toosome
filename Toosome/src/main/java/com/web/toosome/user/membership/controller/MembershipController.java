package com.web.toosome.user.membership.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.toosome.user.membership.service.IMembershipService;
import com.web.toosome.user.membership.vo.MembershipVO;

@Controller
public class MembershipController {

	@Autowired
	private IMembershipService service;
	
	// 멤버쉽 가입 페이지 이동
	@GetMapping("/membership") 
	public String memberShip(HttpSession session, RedirectAttributes ra) {
		int id = (Integer) session.getAttribute("id");
		MembershipVO ms = service.getMembershipInfo(id);
		if(ms != null) {
			ra.addFlashAttribute("msg", "already");
			return "redirect:/mypage"; // 나중에 마이 멤버쉽으로 바꾸기
		}
		else return "subpages/memberShip/memberShip";
	}

	// 멤버십 가입완료 페이지 이동 및 가입 처리
	@PostMapping("/membership/ms")
	public String successmembership(Integer id) {
		service.registerMembership(id);
		return "subpages/memberShip/successMembership/successMembership";
	}
	
	// 마이 멤버쉽 페이지 이동
}
