  const orderSubmitBtn = document.querySelector('.order-submit');
// 우편번호 검색

function pCode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      var addr = ""; // 주소 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById("postcode").value = data.zonecode;
        document.getElementById("addr1").value = addr;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("addr2").focus();
      }
    },
  }).open();
}

function pCode2() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      var addr2 = ""; // 주소 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr2 = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr2 = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById("postcode2").value = data.zonecode;
        document.getElementById("addr3").value = addr2;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("addr4").focus();
      }
    },
  }).open();
}

// 포인트 사용

function chkPoint(amt, pnt, min, unit) {
  //input값을 전체 마일리지로 설정 > minusPoint
  //amt : 최초 결제 금액 / pnt : 사용가능,남은 포인트 / min : 사용 가능 최소 포인트 / unit : 사용단위
  var v_point = 0; //사용할 포인트 (input 입력값)

  if (document.getElementById("chk_use").checked) {
    if (pnt < min) {
      //최소 사용 단위보다 작을 때
      v_point = 0;
    } else {
      v_point = pnt - (pnt % unit); //사용할 포인트 = 전체 마일리지 중 최소단위 이하 마일리지를 뺀 포인트
    }

    if (pnt > amt) {
      //결제금액보다 포인트가 더 클 때
      v_point = amt - (amt % unit); //사용할 포인트는 결제금액과 동일하게 설정
    }
  }
  document.getElementById("use_pnt").value = v_point; //input 값 설정

  changePoint(amt, pnt, min, unit);
  document.getElementById("result_pnt").innerHTML = amt - v_point;
  
}

function changePoint(amt, pnt, min, unit) {
  //input값을 불러옴 > left_pnt 변경 > 최종결제 변경
  //amt : 최초 결제 금액 / pnt : 사용가능,남은 포인트 / min : 사용 가능 최소 포인트 / unit : 사용단위
  var v_point = parseInt(document.getElementById("use_pnt").value); //사용할 포인트 (input 입력값)

  if (v_point > pnt) {
    //입력값이 사용가능 포인트보다 클때
    v_point = pnt;
    document.getElementById("use_pnt").value = v_point; //input 값 재설정
  }

  if (v_point > amt) {
    //결제금액보다 포인트가 더 클 때
    v_point = amt; //사용할 포인트는 결제금액과 동일하게 설정
    document.getElementById("use_pnt").value = v_point; //input 값 재설정
  }

  if (v_point < min) {
    //최소 사용 단위보다 작을 때
    v_point = 0;
    document.getElementById("use_pnt").value = v_point; //input 값 재설정
  } else {
    v_point = v_point - (v_point % unit); //사용할 포인트 = 사용할 마일리지 중 최소단위 이하 마일리지를 뺀 포인트
  }

  var v_left = document.getElementsByName("left_pnt"); //사용가능 마일리지, 남은 포인트 값 설정
  for (var i = 0; i < v_left.length; i++) {
    v_left[i].innerHTML = pnt - v_point; //= 전체 포인트 중에 사용할 포인트빼고 남은 포인트
  }
  document.getElementById("result_pnt").innerHTML = amt - v_point; //최종 결제금액 = 결제금액 - 사용할 포인트

  var dlatl = amt - v_point;
  var menusal = document.getElementById("realPay").innerHTML;
  document.getElementById("abcd").href = "/import2?productEndPrice=" + dlatl + "&menusal=" + menusal;
}

function pointValidate() {
 var v_point = document.getElementById("use_pnt").value; //사용할 포인트 (input 입력값)
  if (v_point === '' || isNaN(v_point)) {
	v_point = 0;
	document.getElementById("use_pnt").value = v_point; //input 값 재설정
	document.getElementById("result_pnt").innerHTML = v_point;
	var v_left = document.getElementsByName("left_pnt"); //사용가능 마일리지, 남은 포인트 값 설정
    for (var i = 0; i < v_left.length; i++) {
      v_left[i].innerHTML = v_point; //= 전체 포인트 중에 사용할 포인트빼고 남은 포인트
    }
  }
}

$(function () {
  $("#same").click(function () {
    var same = this.checked;
    $("#orderName2").val(same ? $("#orderName").val() : "");
    $("#postcode2").val(same ? $("#postcode").val() : "");
    $("#addr3").val(same ? $("#addr1").val() : "");
    $("#addr4").val(same ? $("#addr2").val() : "");
    $("#tel2").val(same ? $("#tel").val() : "");
    $("#tel5").val(same ? $("#tel3").val() : "");
    $("#tel6").val(same ? $("#tel4").val() : "");

    if (same == true) {
      $("#order2 form .or2-wrap table input").attr("readonly", true);
      $("#order2 form .or2-wrap table input").filter("#postText").attr("readonly", false);
    } else {
      $("#order2 form .or2-wrap table input").attr("readonly", false);
    }
  });

  document.getElementById("use_pnt").addEventListener('change', pointValidate);
});

 orderSubmitBtn.addEventListener('click', orderSubmitBtnHandler);

const orderSubmitBtnHandler = (e) => {
    //받는 사람
	const name = $("#orderName2").val();
	//우편번호
	const postcode = $("#postcode2").val();
	//주소
	const addr3 = $("#addr3").val();
	//상세주소
	const addr4 = $("#addr4").val();
	// 핸드폰 번호
	const phone = $("#tel2").val() + $("#tel5").val() + $("#tel6").val();
	//배송 유의사항
	const content = $("#postText").val();
	
	const order = {
		memberEmail: email,
		memberPassword: password,
		memberName: name,
		memberBirth: birthDate,
		memberPhone: phone,
		memberPostcode: postcode,
		memberAddress: address
	};
	
	//클라이언트에서 서버와 통신하는 ajax함수(비동기 통신) 
	$.ajax({
		type: "POST", //서버에 전송하는 HTTP요청 방식
		url: "/signup", //서버 요청 URI
		headers: {
			"Content-Type": "application/json"
		}, //요청 헤더 정보
		dataType: "text", //응답받을 데이터의 형태
		data: JSON.stringify(member), //서버로 전송할 데이터
		success: function(result) { //함수의 매개변수는 통신성공시의 데이터가 저장될 곳.
			console.log("통신 성공!: " + result);
			if(result === "success") {
				alert("회원가입에 성공했습니다!");
				location.href="/signupcomplete";
			} else {
				alert("회원가입에 실패했습니다!");
				location.href="/signup";
			}
		}, 
		error: function() {
			console.log("통신 실패!");
		} 
	});
  };
