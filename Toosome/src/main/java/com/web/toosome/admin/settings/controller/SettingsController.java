package com.web.toosome.admin.settings.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.toosome.admin.settings.service.ISettingService;
import com.web.toosome.user.terms.vo.TermsVO;

@Controller
@RequestMapping("/admin")
public class SettingsController {
	
	@Autowired
	private ISettingService service;
	
	@GetMapping("/banner-management") // 배너 관리
	public String BannerManagement() {
		return "adminpages/subpages/settings/bannerManagement";
	}
	
	@GetMapping("/term-management") // 약관 관리
	public String TermManagement(Model model) {
		model.addAttribute("termList", service.getTermList());
		return "adminpages/subpages/settings/termManagement";
	}
	
	@PostMapping("/addTerm")
	public String addTerm(TermsVO term, RedirectAttributes ra) {
		int result = service.addTerm(term);
		
		if(result > 0) {
			ra.addFlashAttribute("msg", "success");
		}else {
			ra.addFlashAttribute("msg", "fail");
		}
		return "redirect:/admin/term-management";
	}
}
