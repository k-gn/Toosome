package com.web.toosome.user.member.service;

import com.web.toosome.user.member.vo.MemberVO;

public interface IMemberService {

	// �씠硫붿씪 以묐났 泥댄겕
	public boolean emailDupCheck(String email);

	// �씪諛� �쉶�썝媛��엯
	public void register(MemberVO member);

	// �쉶�썝 議고쉶
	public MemberVO getUserByEmail(String email);
	
	public void certifiedPhoneNumber(String phoneNumber, String num);
}
