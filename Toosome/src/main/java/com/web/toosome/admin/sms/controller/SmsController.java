package com.web.toosome.admin.sms.controller;

import java.util.Random;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class SmsController {
	
//
//	// �׷� ���ڸ� ���� ����
//	public void createGroup() {
//		GroupMessage coolsms = new GroupMessage("NCSYDBSNPVO2LUFF", "KX2XFULHJHUWMWIETWORN3ZN0TD3K4LD");
//
//		// Optional parameters for your own needs
//		HashMap<String, String> params = new HashMap<String, String>();
//		UUID uuid = UUID.randomUUID();
//		params.put("charset", "utf8"); // utf8, euckr default value is utf8
//		params.put("srk", uuid.toString()); // Solution key
//		params.put("mode", "test"); // If 'test' value, refund cash to point
//		params.put("delay", "10"); // '0~20' delay messages
//		params.put("force_sms", "true"); // true is always send sms ( default true )
//		params.put("app_version", "test app 1.2"); // App version
//
//		try {
//			JSONObject createdGroup = (JSONObject) coolsms.createGroup(params); // create group
//			System.out.println(createdGroup.toString());
//		} catch (CoolsmsException e) {
//			System.out.println(e.getMessage());
//			System.out.println(e.getCode());
//
//		}
//	}
//
//	// �׷� ���ڸ� ���� list���
//	public void getGroupList() {
//		GroupMessage coolsms = new GroupMessage("NCSYDBSNPVO2LUFF", "KX2XFULHJHUWMWIETWORN3ZN0TD3K4LD");
//
//		try {
//			JSONObject obj = (JSONObject) coolsms.getGroupList();
//			System.out.println(obj.toString());
//		} catch (CoolsmsException e) {
//			System.out.println(e.getMessage());
//			System.out.println(e.getCode());
//		}
//	}
//
//	// �׷쿡 �޼��� ����
//	public void putMessageToGroup(String groupId) {
//
//		GroupMessage coolsms = new GroupMessage("NCSYDBSNPVO2LUFF", "KX2XFULHJHUWMWIETWORN3ZN0TD3K4LD");
//
//		HashMap<String, String> params1 = new HashMap<String, String>();
//		HashMap<String, String> params2 = new HashMap<String, String>();
//		HashMap<String, String> params3 = new HashMap<String, String>();
//		// options(to, from, text) are mandatory. must be filled
//		params1.put("to", "01037220151");
//		params1.put("from", "01056592176");
//		params1.put("text", "Springboot group sms send test by soohyeon");
//		params1.put("group_id", groupId); // Group ID
//
//		// options(to, from, text) are mandatory. must be filled
//		params2.put("to", "01040178803");
//		params2.put("from", "01056592176");
//		params2.put("text", "Springboot group sms send test by soohyeon");
//		params2.put("group_id", groupId); // Group ID
//
//		try {
//			JSONObject obj = (JSONObject) coolsms.addMessages(params1);
//			System.out.println(obj.toString());
//			JSONObject obj3 = (JSONObject) coolsms.addMessages(params3);
//			System.out.println(obj3.toString());
//		} catch (CoolsmsException e) {
//			System.out.println(e.getMessage());
//			System.out.println(e.getCode());
//		}
//	}
//
//	// �׷쿡 ����� �޼����� ��ü ����
//	public void sendGroupSms(String groupId) {
//		GroupMessage coolsms = new GroupMessage("NCSYDBSNPVO2LUFF", "KX2XFULHJHUWMWIETWORN3ZN0TD3K4LD");
//
//		// group_id, message_ids are mandatory.
//		String group_id = groupId; // Group ID
//
//		try {
//			JSONObject obj = (JSONObject) coolsms.sendGroupMessage(group_id);
//			System.out.println(obj.toString());
//		} catch (CoolsmsException e) {
//			System.out.println(e.getMessage());
//			System.out.println(e.getCode());
//		}
//	}

	@Autowired
	private JavaMailSenderImpl mailSender;

	// �̸��� ����
	@RequestMapping(value = "/emailCheck", method = RequestMethod.GET)
	@ResponseBody
	public String emailCheck(String email) throws Exception {

		Random random = new Random();
		int checkNum = random.nextInt(899999) + 100000;

		/* �̸��� ������ */
		String setFrom = "qkd2186@naver.com"; // �߽��� ����
		String toMail = email; // ������ ����
		String title = "ȸ������ ���� �̸��� �Դϴ�."; // ���� ����
		String content = "Ȩ�������� �湮���ּż� �����մϴ�." + "<br><br>" + "���� ��ȣ�� " + checkNum + "�Դϴ�." + "<br>" // ���� ����
				+ "�ش� ������ȣ�� ������ȣ Ȯ�ζ��� �����Ͽ� �ּ���.";
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8"); // true ������� : �ܼ� �ؽ��� �������� true��
																						// ������� �ʾƵ� �ȴ�. html ����� �ǹ�
			helper.setFrom(setFrom);
			helper.setTo(toMail);
			helper.setSubject(title);
			helper.setText(content, true); // true ������� : �ܼ� �ؽ��� �������� true�� ������� �ʾƵ� �ȴ�. html ����� �ǹ�
			mailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
		String num = Integer.toString(checkNum);

		return num;
	}

}
