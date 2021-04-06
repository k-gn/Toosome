package com.web.toosome.user.member.dao;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.web.toosome.user.member.vo.MemberVO;

@Repository
public class MemberDAO extends SqlSessionDaoSupport {
	
	@Autowired
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}

	public MemberVO getSMS(MemberVO vo) {
		System.out.println("---> MyBatis�� selectSMS() ��� ó��");
		return (MemberVO) getSqlSession().selectOne("MemberDAO.getSMS", vo);
	}
}
