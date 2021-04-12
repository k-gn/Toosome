<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/WEB-INF/views/subpages/share/head/head.jsp"></jsp:include>
    <link rel="stylesheet" href="/resources/css/subpages/menu/menu.css">
    <title>A TOOSOME PLACE</title>
</head>
<body>
    <div id="container">
        <jsp:include page="/WEB-INF/views/subpages/share/nav/nav.jsp"></jsp:include>

        <div class="menu-container">
            <div class="title-container">
                <img class="title-logo" src="/resources/img/subpages/share/banner.png" alt="">
                <span class="menu-title">MENU</span>
            </div>

            <div class="tab-container">
                <div class="menu-btn">
                    <ul class="btn-tab">
                        <li><a href="/menu-new">NEW</a></li>
                        <li><a href="/menu-beverage">beverage</a></li>
                        <li><a href="/menu-dessert">dessert</a></li>
                        <li class="select"><a href="/menu-delhi">delhi</a></li>
                        <li><a href="/menu-wholecake">whole cake</a></li>
                    </ul>
                </div>
                <div class="menu-content">
                    <ul id="delhi" class="cf">
                        <h3>delhi</h3>
                        <li><a href="/delhidetail"><span>델리1</span></a></li>
                        <li><a href="#"><span>델리2</span></a></li>
                        <li><a href="#"><span>델리3</span></a></li>
                        <li><a href="#"><span>델리4</span></a></li>
                        <li><a href="#"><span>델리5</span></a></li>
                    </ul>
                </div>
            </div>
        </div>

        <jsp:include page="/WEB-INF/views/subpages/share/footer/footer.jsp"></jsp:include>
    </div>
</body>
</html>