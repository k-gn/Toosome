package com.web.toosome.user.menu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.web.toosome.user.member.service.IMemberService;
import com.web.toosome.user.member.vo.MemberVO;
import com.web.toosome.user.membership.service.MembershipService;
import com.web.toosome.user.membership.vo.MembershipVO;
import com.web.toosome.user.menu.service.IMenuService;
import com.web.toosome.user.menu.vo.MenuVO;

@Controller
public class MenuController {
	
	private final String basicImagePath = "https://toosome.s3.ap-northeast-2.amazonaws.com/";

	@Autowired
	private IMenuService menuService;

	@Autowired
	private IMemberService memberService;

	@Autowired
	private MembershipService memberShipService;

	@GetMapping("/menu-new") // 이거 cafe로 변경 요망
	public String menuNew(MenuVO menuVO, Model model) {
		System.out.println("신메뉴 출력");
		List<MenuVO> menuNewList = menuService.getnewList(menuVO);
		model.addAttribute("menuNewList", menuNewList);
		System.out.println(model);
		return "subpages/menu/menuNew";
	}

	@GetMapping("/menu-beverage")
	public String menuBeverage(MenuVO menuVO, Model model) {
		System.out.println("음료 메뉴 출력");
		List<MenuVO> menuBeverageList = menuService.getbeverageList(menuVO);
		model.addAttribute("menuBeverageList", menuBeverageList);
		System.out.println(model);
		return "subpages/menu/menuBeverage";
	}

	@GetMapping("/menu-delhi")
	public String menuDelhi(MenuVO menuVO, Model model) {
		System.out.println("델리 메뉴 출력");
		List<MenuVO> menuDelhiList = menuService.getdelhiList(menuVO);
		model.addAttribute("menuDelhiList", menuDelhiList);
		System.out.println(model);
		return "subpages/menu/menuDelhi";
	}

	@GetMapping("/menu-dessert")
	public String menuDessert(MenuVO menuVO, Model model) {
		System.out.println("디저트 메뉴 출력");
		List<MenuVO> menuDessertList = menuService.getdessertList(menuVO);
		model.addAttribute("menuDessertList", menuDessertList);
		System.out.println(model);
		return "subpages/menu/menuDessert";
	}

	@GetMapping("/menu-wholecake")
	public String menuWholecake(MenuVO menuVO, Model model) {
		System.out.println("홀케이크 메뉴 출력");
		List<MenuVO> menuWholecakeList = menuService.getwholecaketList(menuVO);
		model.addAttribute("menuWholecakeList", menuWholecakeList);
		System.out.println(model);
		return "subpages/menu/menuWholecake";
	}

	@GetMapping("/nutrient1") // 영양성분표 페이지1
	public String nutrient1(MenuVO vo, Model model) {
		System.out.println("영양 성분표 1");
		List<MenuVO> nutrient1 = menuService.getIatListOne(vo);
		model.addAttribute("nutrient1", nutrient1);
		System.out.println(model);
		return "subpages/nutrient/nutrient1";
	}

	@RequestMapping("/nutrient1/search") // 영양성분표1 검색기능
	public String searchNutrient1(MenuVO vo, Model model) {
		System.out.println("영양 성분표 1");
		List<MenuVO> nutrient1 = menuService.getSearchIatListOne(vo);
		model.addAttribute("nutrient1", nutrient1);
		return "subpages/nutrient/nutrient1";
	}

	@GetMapping("/nutrient2") // 영양성분표 페이지2
	public String nutrient2(MenuVO vo, Model model) {
		System.out.println("영양성분표2");
		List<MenuVO> nutrient2 = menuService.getIatListTwo(vo);
		model.addAttribute("nutrient2", nutrient2);
		System.out.println(model);
		return "subpages/nutrient/nutrient2";
	}

	@RequestMapping("/nutrient2/search") // 영양성분표2 검색기능
	public String searchNutrient2(MenuVO vo, Model model) {
		System.out.println("영양 성분표 2");
		List<MenuVO> nutrient2 = menuService.getSearchIatListTwo(vo);
		model.addAttribute("nutrient2", nutrient2);
		return "subpages/nutrient/nutrient2";
	}

	@GetMapping("/nutrient3") // 영양성분표 페이지3
	public String nutrient3(MenuVO vo, Model model) {
		System.out.println("영양성분표3");
		List<MenuVO> nutrient3 = menuService.getIatListThree(vo);
		model.addAttribute("nutrient3", nutrient3);
		System.out.println(model);
		return "subpages/nutrient/nutrient3";
	}

	@RequestMapping("/nutrient3/search") // 영양성분표3 검색기능
	public String searchNutrient3(MenuVO vo, Model model) {
		System.out.println("영양 성분표 3");
		List<MenuVO> nutrient3 = menuService.getSearchIatListThree(vo);
		model.addAttribute("nutrient3", nutrient3);
		return "subpages/nutrient/nutrient3";
	}

	@GetMapping("/nutrient4") // 영양성분표 페이지4
	public String nutrient4(MenuVO vo, Model model) {
		System.out.println("영양성분표4");
		List<MenuVO> nutrient4 = menuService.getIatListFour(vo);
		model.addAttribute("nutrient4", nutrient4);
		System.out.println(model);
		return "subpages/nutrient/nutrient4";
	}

	@RequestMapping("/nutrient4/search") // 영양성분표4 검색기능
	public String searchNutrient4(MenuVO vo, Model model) {
		System.out.println("영양 성분표 4");
		List<MenuVO> nutrient4 = menuService.getSearchIatListFour(vo);
		model.addAttribute("nutrient4", nutrient4);
		return "subpages/nutrient/nutrient4";
	}

	@GetMapping("/menuDetail") // menu Detail page
	public String beverageDetail(MenuVO menuVO, Model model) {
		System.out.println("음료 메뉴 디테일 출력");
		MenuVO menubeverageDetail = menuService.getbeverageDetail(menuVO);
		model.addAttribute("menubeverageDetail", menubeverageDetail);
		System.out.println(model);
		return "subpages/menu/menuDetail/menuDetail";
	}

	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/import1") // 결제 화면...
	public String import1(MenuVO menuVO, Model model, HttpSession session, int menuEndPrice, int menusal) {
		System.out.println("결제화면 호출");
		System.out.println(menuEndPrice);
		Integer id = (Integer) session.getAttribute("id");
		MenuVO importList = menuService.getimportList(menuVO);
		model.addAttribute("importList", importList);
		model.addAttribute("menuEndPrice", menuEndPrice);
		model.addAttribute("menusal", menusal);
		System.out.println(importList);
		System.out.println(id);
		System.out.println(menusal);
		MemberVO memberImportList = memberService.getUserById(id);
		model.addAttribute("memberImportList", memberImportList);
		return "import";
	}

	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/menuorder")
	public String menuorder(MenuVO menuVO, Model model, HttpSession session) {
		System.out.println("메뉴 결제정보 페이지 호출");
		Integer id = (Integer) session.getAttribute("id");
		MenuVO menuOrderList = menuService.getimportList(menuVO);  // 여기 메뉴금액...
		model.addAttribute("menuOrderList", menuOrderList);
		double menuPrice = menuService.getimportList(menuVO).getMenuPrice();
		double ms = memberShipService.getMembershipInfo(id).getLevel().getLevelDiscountRate();
		double msi = menuPrice * (ms / 100);
		double menusal = menuPrice - msi;   // 결제 금액....
		model.addAttribute("msi", (int) msi);
		model.addAttribute("menusal", (int) menusal);
		double point = menuPrice * 0.01;
		model.addAttribute("point", (int) point);
		MembershipVO memberPoint = memberShipService.getMembershipInfo(id);
		model.addAttribute("memberPoint", memberPoint);
		System.out.println(id);
		MemberVO memberOrderList = memberService.getUserById(id);
		model.addAttribute("memberOrderList", memberOrderList);
		return "subpages/menu/menuOrder/menuOrder";
	}

	@PreAuthorize("hasRole('ROLE_USER')")
	@ResponseBody
	@GetMapping("/stackpoint")
	public String stackPoint(MenuVO menuVO,HttpSession session, Integer menusalt, Integer menuEndPrice) {
		System.out.println("포인트 적립");
		Integer id = (Integer) session.getAttribute("id");
		double menuPrice = menuService.getimportList(menuVO).getMenuPrice();
		double imsipoint = menuPrice * 0.01;
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("id", id);
		map.put("imsipoint", (int)imsipoint);
		System.out.println((int)imsipoint);
		memberShipService.getStackPoint(map);
		System.out.println("getStackPoint 실행 완료");
		Integer usedPoint = menusalt - menuEndPrice;
		System.out.println(usedPoint);
		map.put("usedPoint", usedPoint);
		memberShipService.getDownPoint(map);
		System.out.println("getDownPoint 실행 완료");
		return "OK";
	}
	
	@ResponseBody
	@GetMapping("/saveGift")
	public String saveGift(MenuVO menuVO,HttpSession session, Integer menuEndPrice, String phone, String merchantUid, Integer menuId, Integer menusalt) {
		System.out.println("saveGift 메서드 실행");
		Integer id = (Integer) session.getAttribute("id");
		menuVO.setMemberId(id);
		menuVO.setMenuPrice(menuEndPrice);
		menuVO.setMemberName(memberService.getUserById(id).getMemberName());
		menuVO.setMemberPhone(phone);
		menuVO.setMerchantUid(merchantUid);
		menuVO.setMenuMainTitle(menuService.getMenuMainTitle(menuId));
		menuVO.setMemberEmail(memberService.getUserById(id).getMemberEmail());
		String imageName = menuService.getMenuImagePath(menuId).getMenuImageName();
		String imageExtention = menuService.getMenuImagePath(menuId).getMenuImageExtention();
		String imageRoute = menuService.getMenuImagePath(menuId).getMenuImageRoute();
		String imagePath = basicImagePath + imageRoute + "/" + imageName + "." + imageExtention;
		System.out.println(imageName);
		System.out.println(imageExtention);
		System.out.println(imageRoute);
		menuVO.setMenuImagePath(imagePath);
		System.out.println(imagePath);
		int num = menuService.saveGift(menuVO);
		menuVO.setOrdersId(menuService.getOrdersId(id));
		menuVO.setMenuPrice(menuService.getMenuPrice(menuId));
		int num2 = menuService.giftSendOrder(menuVO);
		if(num > 0 & num2 > 0) {
			return "OK";
		}else {
			return "NO";
		}
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/menuordercomplete")
	public String menuordercomplete(MenuVO menuVO, Model model, HttpSession session, Integer menusalt, Integer menuEndPrice) {
		System.out.println("결제 완료 페이지 호출");
		Integer id = (Integer) session.getAttribute("id");
		MenuVO menuOrderCompleteList = menuService.getimportList(menuVO);
		Integer menuPrice = menuService.getimportList(menuVO).getMenuPrice(); 	// 상품 금액
		model.addAttribute("menuOrderCompleteList", menuOrderCompleteList);
		model.addAttribute("menusalt", menusalt);   							// 결제 금액
		model.addAttribute("menuEndPrice", menuEndPrice); 						// 최종 결제 금액
		Integer usedPoint = menusalt - menuEndPrice; 
		Integer salprice = menuPrice - menusalt;
		double sPoint = menuPrice * 0.01;
		model.addAttribute("usedPoint", usedPoint);
		model.addAttribute("salprice", salprice);
		model.addAttribute("sPoint", (int)sPoint);
		System.out.println(menuEndPrice);
		System.out.println(menusalt);
		System.out.println(id);
		MemberVO memberOrderCompleteList = memberService.getUserById(id);
		model.addAttribute("memberOrderCompleteList", memberOrderCompleteList);
		return "subpages/menu/menuOrder/menuOrderComplete/menuOrderComplete";
	}

	// Menu Order & Menu Refund

}
