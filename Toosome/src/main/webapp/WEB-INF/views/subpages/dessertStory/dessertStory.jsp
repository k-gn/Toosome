<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <jsp:include page="/WEB-INF/views/subpages/share/head/head.jsp"></jsp:include>
    <link rel="stylesheet" href="/resources/css/subpages/dessertStory/dessertStory.css">
    <title>A TOOSOME PLACE</title>
</head>
<body>
    <div id="container">
        <jsp:include page="/WEB-INF/views/subpages/share/nav/nav.jsp"></jsp:include>

        <div class="dessertstory-container">
            <div class="title-container">
                <img class="title-logo" src="https://toosome.s3.ap-northeast-2.amazonaws.com/img/pages/share/banner.png" alt="">
                <span class="dessertstory-title">DessertStory</span>
            </div>

            <div class="contents">
                <img src="https://toosome.s3.ap-northeast-2.amazonaws.com/img/pages/subpages/dessertStory/img_dessertstory.gif" alt="">
            </div>
        </div>
        <img class="bg1" src="https://toosome.s3.ap-northeast-2.amazonaws.com/img/pages/subpages/dessertStory/dessert.png" alt="#">
        <img class="bg2" src="https://toosome.s3.ap-northeast-2.amazonaws.com/img/pages/subpages/dessertStory/juice.png" alt="#">
		<jsp:include page="/WEB-INF/views/subpages/share/footer/footer.jsp"></jsp:include>
    </div>
</body>
</html>