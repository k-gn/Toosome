package com.web.toosome.user.member.dao;

import com.web.toosome.user.member.vo.MemberVO;

public interface IMemberMapper {

	// �̸��� �ߺ� üũ
	public Integer emailDupCheck(String email);

	// ȸ�� ���
	public void register(MemberVO member);

	// �̸��Ϸ� ȸ�� ��ȸ
	public MemberVO getUserByEmail(String email);
}
