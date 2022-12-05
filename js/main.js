$('.gnb li a').mouseenter(function(){
    var bar = $(this).position().left;
    //console.log(bar)
    var widNum=$(this).width();
    console.log(widNum)
    // $('.bar').animate({
    //     'left':bar + 'px',
    //     'width':widNum + 'px',
    //     'opacity':1
    // },300)
});

/* $('.gnb').mouseleave(function(){
    $('.bar').animate({
        'left':0,
        'width':0,
        'opacity':0
    },10)
}); */

$('.animate').scrolla({
    // default
    mobile: true, //모바일 버전시 활성화
    once: false, // 스크롤시 한 번만 할 것인지 영역이 보일 때마다 실행할 것인지
});

/* menuOpen 열기 */

/* $('.menuOpen button.open').on('click',function(){});
= $('.menuOpen button.open').click(function(){});
 */

// ★ hover icon 열고 닫기 script

$('.menuOpen button.open').click(function(){
    $('.menuOpen .menuWrap').addClass('on');
});

$('.menuWrap .close').click(function(){
    $('.menuOpen .menuWrap').removeClass('on')
});


// ★ hover icon section 1~6 연결 script

$('.menuWrap ul li').click(function(){
    $('.menuOpen .menuWrap').removeClass('on')
});


//

$(".content-wrap .click-content .content").eq(0).addClass("on");

$(".header .nav ul li").eq(2).addClass("on");

$(".content-wrap .click-content .content").click(function(){
    let i=$(".content-wrap .click-content .content").index(this)
    $(".img-content>div").hide().eq(i).fadeIn();

    $(".content-wrap .click-content .content").removeClass("on").eq(i).addClass("on");
})

