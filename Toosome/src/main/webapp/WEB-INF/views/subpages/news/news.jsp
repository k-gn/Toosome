<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <jsp:include page="/WEB-INF/views/subpages/share/head/head.jsp"></jsp:include>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.css"/>
    <link rel="stylesheet" href="/resources/css/subpages/news/news.css">
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.min.js"></script>
  	<script src="/resources/js/subpages/news/news.js" defer></script>
    <title>A TOOSOME PLACE</title>
</head>
<body>
    <div id="container">
        <jsp:include page="/WEB-INF/views/subpages/share/nav/nav.jsp"></jsp:include>
		<!-- section start -->
		<!-- 뉴스 시작 -->
        <section>
        	<div class="sub-header-container">
        		<h3>뉴스</h3>
        		<!-- 뉴스 navigation -->
        		<div class="navigation-container">
        			<ul>
        				<li><a href="/">HOME</a></li>
        				<li><a href="/event">WHAT'S NEWS</a></li>
        				<li><a href="/news">뉴스</a></li>
        			</ul>
        		</div>
        	</div>
			<p>TOOSOME PLACE의 뉴스를 확인하세요</p>
			<!-- 검색기능 -->
        	<div class="search-container">
        		<select class="search-select" onchange="selectHandler(this);">
        			<option value="0">번호순</option>
        			<option value="1">작성일순</option>
        			<option value="2">조회수순</option>
        		</select>
        		<div class="search-wrapper">
        			<input id="search-input" type="search" placeholder="검색어를 입력하세요">
        			<button id="search-btn">검색</button>
        		</div>
        	</div>
        	<table summary="news" class="news-table">
        		<caption class="news-cap">뉴스 번호,이미지,제목,날짜,조회수</caption>
        		<colgroup>
        			<col width="5%">
        			<col width="30%">
        			<col width="45%">
        			<col width="10%">
        			<col width="10%">
        		</colgroup>
        		<thead>
        			<tr>
        				<th scope="col">NO</th>
        				<th scope="col">이미지</th>
        				<th scope="col">제목</th>
        				<th scope="col">날짜</th>
        				<th scope="col">조회수</th>
        			</tr>
        		</thead>
        		<!-- 내용 출력 -->
        		<tbody id="news">
        		</tbody>
        	</table>
        	<!-- 페이징 처리 -->
        	<div id="pagination"></div>
        </section>
		<!-- section end -->
        <jsp:include page="/WEB-INF/views/subpages/share/footer/footer.jsp"></jsp:include>
    </div>
</body>
</html>