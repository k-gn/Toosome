<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<title>���� ����</title>
</head>
<body>
	<input type="text" name="phone" id="phone" placeholder="�޴� ��� ��ȣ" />
	<button onclick="sendSms();">����</button>
	<br />
	<br />
	<input type="text" name="sms" id="sms" placeholder="���� ��ȣ �Է�" />
	<button onclick="phoneCheck();">����</button>
	<script>
	function sendSms() {
		$.ajax({ 
			url: "<%=request.getContextPath()%>/sendSms",
				data : {
					receiver : $("#phone").val()
				},
				type : "post",
				success : function(result) {
					if (result == "true") {
						console.log(result);
					} else {
						alert("������ȣ ���� ����");
					}
				}
			});
		}
		function phoneCheck() {
			$.ajax({
				url : "<%=request.getContextPath()%>/smsCheck",
				type : "post",
				data : {
					code : $("#sms").val()
				},
				success : function(result) {
					if (result == "ok") {
						alert("��ȣ ���� ����");
					} else {
						alert("��ȣ ���� ����");
					}
				}
			});
		}
	</script>
</body>
</html>
