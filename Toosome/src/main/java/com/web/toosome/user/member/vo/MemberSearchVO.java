package com.web.toosome.user.member.vo;

import lombok.Data;

@Data
public class MemberSearchVO{
	
	private String condition;
	private String keyword;
	private String platFormType;
	private String startRegDate;
	private String endRegDate;
	private String startLoginDate;
	private String endLoginDate;
	
	private String startOutDate;
	private String endOutDate;
	
	private Integer viewCount;
	private Integer status;
}