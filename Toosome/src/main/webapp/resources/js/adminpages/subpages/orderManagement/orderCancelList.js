const searchType = document.querySelector('#searchType'); // 검색어 선택
const searchInput = document.querySelector('#search-text'); // 검색어 인풋
const orderDate = document.querySelector('#orderDate'); // 주문일자 선택
const orderDatePeriod = document.querySelector('#orderDatePeriod'); // 주문일자 기간선택 버튼박스
const orderPeriods = document.querySelectorAll('.period.order'); // 주문일자 기간 버튼들
const orderCalendar = document.querySelector('#calendar1'); // 주문일자 달력1
const orderCalendar2 = document.querySelector('#calendar2'); // 주문일자 달력2
const orderCancelDate = document.querySelector('#orderCancelDate'); // 주문취소일자 선택
const orderCancelDatePeriod = document.querySelector('#orderCancelDatePeriod'); // 주문취소일자 기간선택 버튼박스
const orderCancelPeriods = document.querySelectorAll('.period.orderCancel'); // 주문취소일자 기간 버튼들
const orderCalendar3 = document.querySelector('#calendar3'); // 주문취소일자 달력1
const orderCalendar4 = document.querySelector('#calendar4'); // 주문취소일자 달력2
const resetBtn = document.querySelector('#search-reset'); // 검색 초기화 버튼
const submitBtn = document.querySelector('#search-submit'); // 검색 버튼
const searchResult = document.querySelector('#search-result'); // 검색 결과 건수
const memberList = document.querySelectorAll('#member-table tbody tr'); // 회원 리스트
const profileContainer = document.querySelector('#profile-modal'); // 프로필 컨테이너
const modalCancelBtn = document.querySelector('#modal-cancel'); // 모달 취소 버튼
const listTable = document.querySelector('#list-table-tbody'); // 테이블

let condition = ''; // 검색 타입
let keyword = ''; // 검색어
let startDate = ''; // 검색 시작날짜
let endDate = ''; // 검색 종료날짜
let cancelstartDate = ''; // 검색 시작날짜
let cancelendDate = ''; // 검색 종료날짜
let rows = 10000;
let orders = {};

// 기간선택 handler
const changeHandler = (e) => {
	const option = e.options[e.selectedIndex].value;
	// 옵션 선택이 use(기간선택)일 경우
	if(option === 'order-use') {
		orderDatePeriod.style.display = 'inline';
	} else {
		orderDatePeriod.style.display = 'none';
	};
};

// 기간선택 handler
const changeCancelHandler = (e) => {
	const option = e.options[e.selectedIndex].value;
	// 옵션 선택이 use(기간선택)일 경우
	if(option === 'Cancel-use') {
		orderCancelDatePeriod.style.display = 'inline';
	} else {
		orderCancelDatePeriod.style.display = 'none';
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
	removeOn(orderPeriods);
	removeOn(orderCancelPeriods);
	const today = moment().format('YYYY-MM-DD');
	orderCalendar.value = today;
	orderCalendar2.value = today;
	orderCalendar3.value = today;
	orderCalendar4.value = today;
};

// 기간 버튼 event hook
orderPeriods.forEach((period) => {
	period.addEventListener('click', (e) => {
		e.preventDefault();
		removeOn(orderPeriods);
		period.classList.toggle('on');
		let val = period.value;
		calcDate(val, orderCalendar);
	});
});

// 기간 버튼 event hook
orderCancelPeriods.forEach((period) => {
	period.addEventListener('click', (e) => {
		e.preventDefault();
		removeOn(orderCancelPeriods);
		period.classList.toggle('on');
		let val = period.value;
		calcDate(val, orderCalendar3);
	});
});

// 리셋 버튼 핸들러
const resetHandler = () => {
	searchType.options[0].selected = 'true';
	searchInput.value = '';
	orderDate.options[0].selected = 'true';
	orderDatePeriod.style.display = 'none';
	orderCancelDate.options[0].selected = 'true';
	orderCancelDatePeriod.style.display = 'none';
	calendarInit();
};

resetBtn.addEventListener('click', resetHandler);

// 리스트 출력하기
const showList = (result, wrapper) => {
	wrapper.innerHTML = ''; // 테이블 초기화
	
	// 검색 결과가 없을 경우
	if(result.length === 0) {
		let newItem = document.createElement('tr');
		let itemElement = `
			<td colspan="7">검색 결과가 없습니다.</td>
		`;
		newItem.innerHTML = itemElement;
		wrapper.appendChild(newItem);
		return;
	};
	
	// loop를 돌며 element 생성 후 삽입
	for (let i = 0; i < result.length; i++) {
		let newEl = document.createElement('tr');
		newEl.setAttribute( 'onclick', 'listHandler(this)'); // onClick 이벤트 세팅
		let content = `
          <td>
            ${result[i].ordersId}
          </td>
          <td>
            ${result[i].ordersState}
          </td>
          <td>
            ${result[i].ordersMemberEmail}
          </td>
          <td>
            ${result[i].ordersReceiver}
          </td>
          <td>
            ${result[i].ordersProductName}
          </td>
		  <td>
            ${result[i].ordersAmount}
          </td>
          <td>
            ${result[i].ordersPayment}
          </td>
          <td>
            ${result[i].ordersOrderDate}
          </td>
          <td>
            ${result[i].ordersCancelDate}
          </td>
		`;
		newEl.innerHTML = content;
		wrapper.appendChild(newEl);
	};			
};

// 페이징 처리 후 데이터 출력
const setData = (result, wrapper, rows) => {
	$('#pagination').pagination({
	    dataSource: result,
	    pageSize: rows,
	    pageNumber: 1,
	    callback: function(data, pagination) {
			showList(data, wrapper);					
	    }
	});
};

// AJAX 검색 리스트 불러오기
const getList = (orders, wrapper, rows) => {
	// AJAX 요청
	$.ajax({
		type: "get", //서버에 전송하는 HTTP요청 방식
		url: "/admin/orderCancelList", //서버 요청 URI
		headers: {
			"Content-Type": "application/json"
		}, //요청 헤더 정보
		dataType: "json", //응답받을 데이터의 형태
		data: orders, //서버로 전송할 데이터
		success: (result) => { //함수의 매개변수는 통신성공시의 데이터가 저장될 곳.
			// 검색 건수 출력
			let count = `검색 결과 : ${result.length}건`
			searchResult.innerText = count;
			// 리스트 출력
			setData(result, wrapper, rows);	
		}, 
		error: function() {
			alert('시스템과에 문의하세요');
			alert('시스템과에 문의하세요');
			history.back();
		} 
	});
};

// 검색 버튼 핸들러
const submitHandler = () => {
	condition = ''; 		// 검색 타입
	keyword = ''; 			// 검색어
	startDate = ''; 		// 검색 시작날짜
	endDate = ''; 			// 검색 종료날짜
	cancelstartDate = ''; 	// 주문 취소 날짜
	cancelendDate = '';   	// 주문 취소 날짜
	
	// 검색 타입, 검색어
	if(searchType.options[searchType.selectedIndex].value === 'o-id') { // 아이디로 검색시
		if(searchInput.value !== '') {
			condition = searchType.options[searchType.selectedIndex].value;
			keyword = searchInput.value;	
		}
	} else if(searchType.options[searchType.selectedIndex].value === 'o-name') { // 이름으로 검색시
		if(searchInput.value !== '') {
			condition = searchType.options[searchType.selectedIndex].value;
			keyword = searchInput.value;			
		}
	}else if(searchType.options[searchType.selectedIndex].value === 'o-phone') { // 이름으로 검색시
		if(searchInput.value !== '') {
			condition = searchType.options[searchType.selectedIndex].value;
			keyword = searchInput.value;			
		}
	}else if(searchType.options[searchType.selectedIndex].value === 'r-name') { // 이름으로 검색시
		if(searchInput.value !== '') {
			condition = searchType.options[searchType.selectedIndex].value;
			keyword = searchInput.value;			
		}
	}else if(searchType.options[searchType.selectedIndex].value === 'r-phone') { // 이름으로 검색시
		if(searchInput.value !== '') {
			condition = searchType.options[searchType.selectedIndex].value;
			keyword = searchInput.value;			
		}
	};
	
	// 결제일자
	if(orderDate.options[orderDate.selectedIndex].value === 'order-use') {
		startDate = moment(orderCalendar.value).format('YYYY-MM-DD');
		endDate = moment(orderCalendar2.value).format('YYYY-MM-DD');
	}
		
	// 결제취소일자
	if(orderCancelDate.options[orderCancelDate.selectedIndex].value === 'Cancel-use') {
		cancelstartDate = moment(orderCalendar3.value).format('YYYY-MM-DD');
		cancelendDate = moment(orderCalendar4.value).format('YYYY-MM-DD');
	}

	// JSON Data
	const orders = {
		condition,
		keyword,
		startDate,
		endDate,
		cancelstartDate,
		cancelendDate,
	};
	
	rows = 10000;
	getList(orders, listTable, rows);
};

submitBtn.addEventListener('click', submitHandler);

// 리스트 항목 클릭 핸들러
const listHandler = (e) => {
	const tds = e.children;
	const id = tds[0].innerText;
	
	/* index로 AJAX 요청 */
	$.ajax({
		type: "get", //서버에 전송하는 HTTP요청 방식
		url: "/admin/orderCancel/" + id, //서버 요청 URI
		headers: {
			"Content-Type": "application/json"
		}, //요청 헤더 정보
		dataType: "json", //응답받을 데이터의 형태
		success: (res) => { //함수의 매개변수는 통신성공시의 데이터가 저장될 곳.
			
			if(res.ordersAddress == null) {
				res.ordersAddress = 'Gift Buy';
			}
			if(res.ordersPostcode == null) {
				res.ordersPostcode = 'Gift Buy';
			}
			if(res.ordersDelivery == null) {
				res.ordersDelivery = 'Gift Buy';
			}
			$("input[name=ordersId]").val(res.ordersId);
			$("input[name=memberName]").val(res.memberVO.memberName);
			$("input[name=memberPhone]").val(res.memberVO.memberPhone);
			$("input[name=ordersState]").val(res.ordersState);
 			$("input[name=ordersProductPay]").val(res.ordersProductPay);
			$("input[name=ordersAmount]").val(res.ordersAmount);
			$("input[name=ordersReceiver]").val(res.ordersReceiver);
			$("input[name=ordersPhone]").val(res.ordersPhone);
			$("input[name=ordersPostcode]").val(res.ordersPostcode);
			$("input[name=ordersAddress]").val(res.ordersAddress);
			$("input[name=ordersDelivery]").val(res.ordersDelivery);
			$("input[name=ordersUsePoint]").val(res.ordersUsePoint);
			$("input[name=ordersSal]").val(res.ordersSal);
			$("input[name=ordersPayment]").val(res.ordersPayment);	
			$("input[name=ordersOrderDate]").val(res.ordersOrderDate);
			$("input[name=ordersCancelDate]").val(res.ordersCancelDate);
			$("input[name=ordersId]").val(res.ordersId);			
			
			if(res!=null){
				$.ajax({
					type: "get", //서버에 전송하는 HTTP요청 방식
					url: "/admin/orderCancelDetail/" + id, //서버 요청 URI
					headers: {
						"Content-Type": "application/json"
					}, //요청 헤더 정보
					dataType: "json", //응답받을 데이터의 형태
					success: (results) => {
						console.log(results);
						console.log(id);
						const tableBody = document.querySelector(`.under-table`);
						tableBody.innerHTML = '';
						let new2El = document.createElement('tr');
						new2El.classList.add('text-bold');
						let content2 = `
							<td>이미지</td>
				           	<td colspan="2">상품명</td>
				           	<td>수량</td>
				           	<td>상품가격</td>
			            	<td>배송상태</td>
						`;
						new2El.innerHTML = content2;
						tableBody.appendChild(new2El);
						results.forEach(result => {
							let newEl = document.createElement('tr');
							newEl.classList.add('under-tr');
							let content = `
								<td><img src="${result.ordersDetailImagePath}" alt="" width="60px"></td>
					            <td colspan="2"><span class="pro-name">${result.ordersDetailName}</span></td>
					            <td><span class="pro-count">${result.ordersDetailAmount}</span></td>
					            <td><span class="pro-pay">${result.ordersDetailPrice}</span></td>
					            <td><span class="post-status">${result.ordersDetailState}</span></td>
							`;
							newEl.innerHTML = content;
							tableBody.appendChild(newEl);
						})
					}
				});	
			}		
		}, 
		error: () => {
			alert('시스템과에 문의하세요');
			alert('시스템과에 문의하세요');
			history.back();
		} 
	});
	
	profileContainer.style.display = 'block';
	$("input[name=memberName]").focus();
	
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
	getList(orders, listTable, rows)

}); 
