<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <jsp:include page="/WEB-INF/views/subpages/share/head/head.jsp"></jsp:include>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/resources/css/subpages/qna/qna.css">
  	<script src="/resources/js/subpages/qna/qna.js" defer></script>
    <title>A TOOSOME PLACE</title>
</head>
<body>
    <div id="container">
        <jsp:include page="/WEB-INF/views/subpages/share/nav/nav.jsp"></jsp:include>
		<!-- section start -->
        <section>
        	<div class="sub-header-container">
        		<h3>QnA</h3>
        		<nav class="navigation-container">
        			<ul>
        				<li><a href="#">HOME</a></li>
        				<li><a href="#">WHAT'S NEWS</a></li>
        				<li><a href="#">QnA</a></li>
        			</ul>
        		</nav>
        	</div>
			<p>고객 한 분 한 분의 의견에 귀 기울이는 투썸플레이스가 되겠습니다</p>
        	<div class="search-container">
        		<div class="search-wrapper">
        			<input type="search" placeholder="검색어를 입력하세요">
        			<button>검색</button>
        			<button onclick="location.href='/qna-enrollment'">등록</button>
        		</div>
        	</div>
        	<table summary="qna" class="qna-table">
        		<caption class="qna-cap">qna 번호,잠금여부,제목,날짜,조회수</caption>
        		<colgroup>
        			<col width="5%">
        			<col width="10%">
        			<col width="65%">
        			<col width="10%">
        			<col width="10%">
        		</colgroup>
        		<thead>
        			<tr>
        				<th scope="col">NO</th>
        				<th scope="col">잠금여부</th>
        				<th scope="col">제목</th>
        				<th scope="col">날짜</th>
        				<th scope="col">조회수</th>
        			</tr>
        		</thead>
        		<tbody id="qna">
        		</tbody>
        	</table>
        	<div id="pagination"></div>
        </section>
		<!-- section end -->
        <jsp:include page="/WEB-INF/views/subpages/share/footer/footer.jsp"></jsp:include>
    </div>
</body>
</html>