const pagination = document.getElementById('pagination');
const newsBoard = document.getElementById('news');
const searchBtn = document.getElementById('search-btn'); // 검색 버튼
const searchInput = document.getElementById('search-input'); // 검색 인풋창

let result = []; // AJAX 결과 복사할 빈 배열
let currentPage = 1; // 현재 페이지
let rows = 10; // 한 페이지에 보여줄 게시글 수
let url = ''; // URL

// 게시판 상세 페이지로 이동 함수
const locateNewsDetail = (index) => {
	// index를 갖고 상세 페이지로 이동
	window.location.href = '/news-detail?index='+index;
}

// 리스트 출력
const displayList = (items, wrapper, rowsPerPage, page) => {
	wrapper.innerHTML = ""; // 테이블 초기화
	page--;
	
	// 검색 결과가 없을 경우
	if(items.length === 0) {
		let newItem = document.createElement('tr');
		let itemElement = `
			<td colspan="4">검색 결과가 없습니다.</td>
		`;
		newItem.innerHTML = itemElement;
		wrapper.appendChild(newItem);
	}
	
	let start = rowsPerPage * page; // 시작 번호
	let end = start + rowsPerPage; // 끝 번호
	// 데이터를 rows만큼 끊어온다
	let paginatedItems = items.slice(start, end);
	// loop를 돌며 element 생성 후 삽입
	for (let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i];
		
		// 날짜 변환
		let date = new Date(item.newsBoardRegdate);
		let newDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		
		let newItem = document.createElement('tr');
		let itemElement = `
			<tr>
				<td>${item.newsBoardId}</td>
				<td><a href="#" onclick="locateNewsDetail(${item.newsBoardId})"><img class="img" src="https://toosome.s3.ap-northeast-2.amazonaws.com/img/pages/subpages/news/${item.newsBoardImageRoute}/${item.newsBoardImageName}.${item.newsBoardImageExtention}"></a></td>
				<td class="left"><a href="#" onclick="locateNewsDetail(${item.newsBoardId})">${item.newsBoardTitle}</a></td>
				<td>${newDate}</td>
				<td>${item.newsBoardViewCount}</td>
			</tr>
		`;
		newItem.innerHTML = itemElement;
		wrapper.appendChild(newItem);
	};
};

// 페이지네이션 세팅
const setPagination = (items, wrapper, rowsPerPage) => {
	wrapper.innerHTML = ""; // 테이블 초기화
	
	// 총 페이징 숫자
	let pageCount = Math.ceil(items.length / rowsPerPage);
	for(let i = 1; i < pageCount + 1; i++) {
		let btn = paginationBtn(i, items);
		wrapper.appendChild(btn);
	};
};

// 페이지네이션 버튼 생성 후 반환
const paginationBtn = (page, items) => {
	let btn = document.createElement('button');
	btn.innerText = page;
	// 현재 페이지에서 active 활성화
	if(currentPage == page) {
		btn.classList.add('active');
	};
	
	btn.addEventListener('click', (e) => btnHandler(e,items,page));
	return btn;
};

// 페이지네이션 버튼 핸들러
const btnHandler = (e,items,page) => {
	// 현재 페이지 이동
	currentPage = page;
	// 누른 페이지 데이터 출력
	displayList(items, newsBoard, rows, currentPage);
	// 이전 버튼 비활성화
	let currentBtn = document.querySelector('#pagination button.active');
	currentBtn.classList.remove('active');
	// 누른 버튼 활성화
	e.target.classList.add('active');
};

// 정렬 select 핸들러
const selectHandler = (select) => {
	// selected value
	let value = select.options[select.selectedIndex].value;
	
	// init
	currentPage = 1;
	rows = 10;
	let temp = [...result]; // 배열 복사
	let newRes = []; // 정렬된 배열을 담을 빈 배열
	
	switch(value) {
		case '0': 
			displayList(temp, newsBoard, rows, currentPage);
			setPagination(temp, pagination, rows);
			break;
		case '1': // 작성일순 정렬 
			newRes = temp.sort((a,b) => {
				a = new Date(a.newsBoardRegdate);
				b = new Date(b.newsBoardRegdate);
				return b - a;
			});
			displayList(newRes, newsBoard, rows, currentPage);
			setPagination(newRes, pagination, rows);
			break;
		case '2': // 조회수순 정렬
			newRes = temp.sort((a,b) => {
				return b.newsBoardViewCount - a.newsBoardViewCount;
			});
			displayList(newRes, newsBoard, rows, currentPage);
			setPagination(newRes, pagination, rows);
			break;
	};
};

// AJAX 요청 함수
const getPage = (url) => {
	$.ajax({
		url,
		success: (res) => {
			result = [...res];
			const newRes = result.reverse();
			displayList(newRes, newsBoard, rows, currentPage);
			setPagination(newRes, pagination, rows);			
		}
	});
};

// 검색 버튼 핸들러
const searchHandler = () => {
	// 유효성 검사
	if(searchInput.value === '') {
		alert('검색어를 입력하세요.');
		return;
	} else { // 검색어값 있을시
		let keyword = searchInput.value;
		url = '/newssearch?keyword='+keyword;
		getPage(url);		
	}
};

// 검색 event hook
searchBtn.addEventListener('click', searchHandler);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
});

// onload시 AJAX 요청
$(document).ready(() => {
	url = '/newslist'
	getPage(url);
})

