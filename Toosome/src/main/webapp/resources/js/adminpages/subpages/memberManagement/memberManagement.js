const searchType = document.querySelector('#searchType'); // 검색어 선택
const searchInput = document.querySelector('#search-text'); // 검색어 인풋
const memberType = document.querySelector('#memberType'); // 멤버 선택
const joinDate = document.querySelector('#joinDate'); // 회원가입일 기간선택
const joinDatePeriod = document.querySelector('#joinDatePeriod'); // 회원가입일 기간선택 버튼박스
const joinPeriods = document.querySelectorAll('.period.join'); // 회원가입일 기간 버튼들
const joinCalendar = document.querySelector('#calendar1'); //회원가입일 달력
const joinCalendar2 = document.querySelector('#calendar2'); //회원가입일 달력
const loginDate = document.querySelector('#loginDate'); // 로그인일자 기간선택
const loginDatePeriod = document.querySelector('#loginDatePeriod'); // 로그인일자 기간선택 버튼박스
const loginPeriods = document.querySelectorAll('.period.login'); // 로그인일자 기간 버튼들
const loginCalendar = document.querySelector('#calendar3'); // 로그인일자 달력
const loginCalendar2 = document.querySelector('#calendar4'); // 로그인일자 달력
const resetBtn = document.querySelector('#search-reset'); // 검색 초기화 버튼
const submitBtn = document.querySelector('#search-submit'); // 검색 버튼
const searchResult = document.querySelector('#search-result'); // 검색 결과 건수
const memberList = document.querySelectorAll('#member-table tbody tr'); // 회원 리스트
const profileContainer = document.querySelector('#profile-modal'); // 프로필 컨테이너
const modalCancelBtn = document.querySelector('#modal-cancel'); // 모달 취소 버튼
let member = {};
let viewCount = 10;
let condition = '';
let keyword = '';
let platFormType = ''; // 가입유형
let startRegDate = ''; // 회원가입 검색 시작일
let endRegDate = ''; // 회원가입 검색 종료일
let startLoginDate = ''; // 로그인 검색 시작일
let endLoginDate = ''; // 로그인 검색 종료일
const status = 1;
	
// 기간선택 handler
const joinChangeHandler = (e) => {
	const option = e.options[e.selectedIndex].value;
	// 옵션 선택이 use(기간선택)일 경우
	if(option === 'join-use') {
		joinDatePeriod.style.display = 'inline';
	} else {
		joinDatePeriod.style.display = 'none';
	};
};

// 기간선택 handler
const logChangeHandler = (e) => {
	const option = e.options[e.selectedIndex].value;	
	// 옵션 선택이 use(기간선택)일 경우
	if(option === 'log-use') {
		loginDatePeriod.style.display = 'inline';
	} else {
		loginDatePeriod.style.display = 'none';
	};
};

// on 클래스 제거
const removeOn = (periods) => {
	periods.forEach((period) => {
		if(period.classList.contains('on')) {
			period.classList.remove('on');			
		}
	});
};

// 날짜 계산 (moment.js)
const calcDate = (value, calendar) => {
	const [num, unit] = value.split('');
	const today = moment();
	const newDate = moment(today).subtract(num, unit).format('YYYY-MM-DD');
	calendar.value = newDate;
};

// init
const calendarInit = () => {
	removeOn(joinPeriods);
	removeOn(loginPeriods);
	const today = moment().format('YYYY-MM-DD');
	joinCalendar.value = today;
	joinCalendar2.value = today;
	loginCalendar.value = today;
	loginCalendar2.value = today;
};

// 기간 버튼 event hook
joinPeriods.forEach((period) => {
	period.addEventListener('click', (e) => {
		e.preventDefault();
		removeOn(joinPeriods);
		period.classList.toggle('on');
		let val = period.value;
		calcDate(val, joinCalendar);
	});
});

// 기간 버튼 event hook
loginPeriods.forEach((period) => {
	period.addEventListener('click', (e) => {
		e.preventDefault();
		removeOn(loginPeriods);
		period.classList.toggle('on');
		let val = period.value;
		calcDate(val, loginCalendar);
	});
});

// 리셋 버튼 핸들러
const resetHandler = () => {
	searchType.options[0].selected = 'true';
	searchInput.value = '';
	memberType.options[0].selected = 'true';
	joinDate.options[0].selected = 'true';
	joinDatePeriod.style.display = 'none';
	loginDate.options[0].selected = 'true';
	loginDatePeriod.style.display = 'none';
	calendarInit();
};

resetBtn.addEventListener('click', resetHandler);

// AJAX 검색 리스트 불러오기
const getList = (member) => {
	// AJAX 요청
	$.ajax({
		type: "get", //서버에 전송하는 HTTP요청 방식
		url: "/admin/memberList", //서버 요청 URI
		headers: {
			"Content-Type": "application/json"
		}, //요청 헤더 정보
		dataType: "json", //응답받을 데이터의 형태
		data: member, //서버로 전송할 데이터
		success: function(result) { //함수의 매개변수는 통신성공시의 데이터가 저장될 곳.
			// 리스트 생성 후 삽입
			const listTable = document.querySelector('#list-table-tbody');
			listTable.innerHTML = '';
			result.forEach(res => {
			
				if(res.lastLoginDate == null) {
					res.lastLoginDate = '';
				}
			
				let newEl = document.createElement('tr');
				newEl.setAttribute( 'onclick', 'listHandler(this)' )
				let content = `
                  <td>
                    ${res.memberId}
                  </td>
                  <td>
                    ${res.platFormType}
                  </td>
                  <td>
                    ${res.memberEmail}
                  </td>
                  <td>
                    ${res.memberName}
                  </td>
                  <td>
                    ${res.memberPhone}
                  </td>
                  <td>
                    ${res.regDate}
                  </td>
                  <td>
                    ${res.lastLoginDate}
                  </td>
				`;
				newEl.innerHTML = content;
				listTable.appendChild(newEl);
			});		
		}, 
		error: function() {
			alert('시스템과에 문의하세요');
			history.back();
		} 
	});
};

// 검색 버튼 핸들러
const submitHandler = () => {

	// 검색 이름 & 검색 이메일
	if(searchType.options[searchType.selectedIndex].value === 'id') { // 아이디로 검색시
		if(searchInput.value !== '') {
			condition = searchType.options[searchType.selectedIndex].value;
			keyword = searchInput.value;	
		}
	} else if(searchType.options[searchType.selectedIndex].value === 'name') { // 이름으로 검색시
		if(searchInput.value !== '') {
			condition = searchType.options[searchType.selectedIndex].value;
			keyword = searchInput.value;			
		}
	};
	
	// 검색 유형
	if(memberType.options[memberType.selectedIndex].value === 'simple') {
		platFormType = 'sns';
	}else if(memberType.options[memberType.selectedIndex].value === 'normal')  {
		platFormType = 'normal';
	}else {
		platFormType = 'all';
	}	
	
	// 가입일자
	if(joinDate.options[joinDate.selectedIndex].value === 'join-use') {
		startRegDate = moment(joinCalendar.value).format('YYYY-MM-DD');
		endRegDate = moment(joinCalendar2.value).format('YYYY-MM-DD');
	}
	
	// 로그인일자
	if(loginDate.options[joinDate.selectedIndex].value === 'log-use') {
		startLoginDate = moment(loginCalendar.value).format('YYYY-MM-DD');
		endLoginDate = moment(loginCalendar2.value).format('YYYY-MM-DD');
	}
	// JSON Data
	member = {
		condition,
		keyword,
		platFormType,
		startRegDate,
		endRegDate,
		startLoginDate,
		endLoginDate,
		viewCount,
		status
	};
	getList(member);
};

submitBtn.addEventListener('click', submitHandler);

// 리스트 항목 클릭 핸들러
const listHandler = (e) => {
	const tds = e.children;
	const id = tds[0].innerText;
	/* index로 AJAX 요청 */
	$.ajax({
		type: "get", //서버에 전송하는 HTTP요청 방식
		url: "/admin/member/" + id, //서버 요청 URI
		headers: {
			"Content-Type": "application/json"
		}, //요청 헤더 정보
		dataType: "json", //응답받을 데이터의 형태
		success: function(res) { //함수의 매개변수는 통신성공시의 데이터가 저장될 곳.
			$("input[name=memberEmail]").val(res.memberEmail);			
			$("input[name=memberName]").val(res.memberName);			
			$("input[name=memberPhone]").val(res.memberPhone);			
			$("input[name=regDate]").val(res.regDate);			
			$("input[name=lastLoginDate]").val(res.lastLoginDate);			
			$("input[name=memberAddress]").val(res.memberAddress);			
			$("input[name=memberPostcode]").val(res.memberPostcode);			
			$("input[name=memberBirth]").val(res.memberBirth);			
			$("input[name=platFormType]").val(res.platFormType);			
			$("input[name=memberId]").val(res.memberId);			
		}, 
		error: function() {
			alert('시스템과에 문의하세요');
			history.back();
		} 
	});
	
	profileContainer.style.display = 'block';
};

// loop 돌며 list에 event hook
memberList.forEach(list => {
	list.addEventListener('click', listHandler);
});

// 모달 취소 버튼 핸들러
modalCancelBtn.addEventListener('click', (e) => {
	e.preventDefault();
	profileContainer.style.display = 'none';
})

// 엑셀 다운로드
const excelDownload = (id, title) => {
	let content = `
		<html xmlns:x="urns:schemas-microsoft-com:office:excel">
			<head>
				<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
				<xml>
					<x:ExcelWorkbook>
						<x:ExcelWorksheets>
							<x:ExcelWorksheet>
								<x:Name>Sheet</x:Name>
									<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions>
							</x:ExcelWorksheet>
						</x:ExcelWorksheets>
					</x:ExcelWorkbook>
				</xml>
			</head>
			<body>
				<table border="1px">
	`;
	const exportTable = $('#' + id).clone();
	exportTable.find('input').each((index, elem) => {
		$(elem).remove();
	});
	content += exportTable.html();
	content += `
		</table></body></html>
	`;
	const data_type = 'data:application/vnd.ms-excel';
	const ua = window.navigator.userAgent;
	const msie = ua.indexOf('MSIE');
	const fileName = title + '.xls';
	
	// IE 환경에서 다운로드
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		if(window.navigator.msSaveBlob) {
			const blob = new Blob([content], {
				type: "application/csv;charset=UTF-8"
			});
			navigator.msSaveBlob(blob, fileName);
		}
	} else {
		const blob2 = new Blob([content], {
			type: "application/csv;charset=UTF-8"
		});
		const filename = fileName;
		const elem = window.document.createElement('a');
		elem.href = window.URL.createObjectURL(blob2);
		elem.download = filename;
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	}
};

// 기간선택 달력 Jquery
$(document).ready(() => {
	calendarInit();
	getList(member);
}); 


function changeSelect() {
	const viewSelect = document.getElementById("memberList-select");
	viewCount = viewSelect.options[viewSelect.selectedIndex].value;
	console.log(viewCount);
	
	member = {
		condition,
		keyword,
		platFormType,
		startRegDate,
		endRegDate,
		startLoginDate,
		endLoginDate,
		viewCount,
		status
	};
	
	getList(member);
}
