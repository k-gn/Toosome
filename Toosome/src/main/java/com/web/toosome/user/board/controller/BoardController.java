package com.web.toosome.user.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardController {
	@GetMapping("/event") // �̺�Ʈ ���� �Խ���
	public String event() {
		return "subpages/event/event";
	}

	@GetMapping("/faq")
	public String faq() {
		return "subpages/faq/faq";
	}

	@GetMapping("/notice")
	public String notice() {
		return "subpages/notice/notice";
	}

	@GetMapping("/news")
	public String news() {
		return "subpages/news/news";
	}

	@GetMapping("/qna")
	public String qna() {
		return "subpages/qna/qna";
	}

	@GetMapping("/iat") // ���км�ǥ
	public String iat() {
		return "subpages/iat/iat";
	}

	@GetMapping("/notice-detail")	// notice �� ������
	public String noticeDetail() {
		return "subpages/notice/noticeDetail/noticeDetail";
	}

	@GetMapping("/news-detail")		// news �� ������
	public String newsDetail() {
		return "subpages/news/newsDetail/newsDetail";
	}

	@GetMapping("/qna-detail")		// qna �� ������
	public String qnaDetail() {
		return "subpages/qna/qnaDetail/qnaDetail";
	}
	
	@GetMapping("/qna-enrollment")		// qna ��� ������
	public String qnaEnrollment() {
		return "subpages/qna/qnaEnrollment/qnaEnrollment";
	}
}
