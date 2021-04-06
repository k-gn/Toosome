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
	<input class="sms_phone_number_box" type="text" name="phoneNumber"
		placeholder="�ڵ��� ��ȣ�� �Է����ּ���">
	<input class="sms_name_box" type="text" name="smsName"
		placeholder="�̸��� �Է����ּ���" required />
	<input class="sms_phone_btn" type="button" value="����">
	<br />
	<br />
	<input class="sms_check_nember_box" type="text" name="sms"
		placeholder="������ȣ�� �Է����ּ���" />
	<input class="sms_check_btn" type="button" value="Ȯ��">
	<script>
        $('.sms_phone_btn').click(function() {
            let phoneNumber = $('.sms_phone_number_box').val();
            let smsName = $('.sms_name_box').val();
            $.ajax({                
            	type : "GET",
                url : "sendSms?phoneNumber=" + phoneNumber,
                data : {
                    "smsName" : smsName
                },
                success : function(res) {
                    if(res=="18"){
                        alert("�ڵ��� ��ȣ�� �̸��� ��ġ���� �ʽ��ϴ�.");
                    }else{
                        alert("���� ��ȣ ���� �Ϸ�")
                        $(".sms_check_btn").click(function() {
                            if ($.trim(res) == $(".sms_check_nember_box").val()) {
                                alert('���� ����')
                                $.ajax({
                                	type : "GET",
                                	url : "sendEmail?phoneNumber=" + phoneNumber,
                                	success : function(win) {
										alert("ȸ������ ���̵��"+ win +"�Դϴ�.");
		                                document.location.href = "/signin";
									}
                                });
                            } else {
                                alert('error')
                            }
                        })
                    }
                }
            })
        });
	</script>
</body>
</html>
