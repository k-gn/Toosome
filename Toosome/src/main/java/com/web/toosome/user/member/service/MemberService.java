package com.web.toosome.user.member.service;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
public class MemberService {
	public void certifiedPhoneNumber(String phoneNumber, String num) {
		String api_key = "NCSYDBSNPVO2LUFF";
		String api_secret = "KX2XFULHJHUWMWIETWORN3ZN0TD3K4LD";
		Message coolsms = new Message(api_key, api_secret);
		System.out.println("3");
		// 4 params(to, from, type, text) are mandatory. must be filled
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("to", phoneNumber); // �߽Ź�ȣ
		params.put("from", "01056592176"); // ���Ź�ȣ
		params.put("type", "SMS");
		params.put("text", "CoolSMS<br>" + "���� ��ȣ�� " + num + "�Դϴ�." + "�ش� ������ȣ�� ������ȣ Ȯ�ζ��� �����Ͽ� �ּ���.");
		params.put("app_version", "test app 1.2"); // application name and version
		System.out.println("4");
		try {
			JSONObject obj = (JSONObject) coolsms.send(params);
			System.out.println(obj.toString());
		} catch (CoolsmsException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCode());
		}
	}
}
