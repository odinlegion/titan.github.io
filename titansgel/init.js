var isMobileType = $(window).width() >= 976;
var isMobileType2 = $(window).width() >= 700;

$(document).ready(function () {
 
    ts = new Date(2027, 11, 1);
    $('#countdown').countdown({
        timestamp: ts
    });

    ts2 = new Date(2027, 10, 8);
    $('#countdown2').countdown({
        timestamp: ts2
    });

    ts3 = new Date(2027, 10, 8);
    $('#countdown3').countdown({
        timestamp: ts3
    });

//    $(".form_wrap_bann").clone()
//    .appendTo(".form-clone"); 
//    
//    $(".aside_block").clone()
//    .appendTo(".form-clone"); 
//    
    $(window).resize(function() {
    var getWindowWidth = $(window).width();

    if (getWindowWidth < 992){
      var height = $(".aside_block").outerHeight();
    }
    });
    

    if (typeof ymaps != "undefined") {
        //ymaps.ready(init);
        function init() {
            if ($('#map').length) {
                var myMap = new ymaps.Map("map", {
                    center: [55.804122, 37.755697],
                    zoom: 13,
                    controls: [' ']
                            //controls: ['zoomControl']
                });


                myMap.geoObjects
                        .add(new ymaps.Placemark([55.804122, 37.755697], {
                            balloonContent: 'г.Москва, район Гольяново, Щелковское шосе, дом 5, офис 18',
                            hintContent: 'Москва!'
                        }, {
                            // Опции.
                            // Необходимо указать данный тип макета.
                            iconLayout: 'default#image',
                            // Своё изображение иконки метки.
                            iconImageHref: 'myIcon.png'/*tpa=http://titansgel.cn/js0/images/myIcon.png*/,
                            iconImageSize: [30, 41],
                            iconImageOffset: [-5, -38]
                        }))
            }
        }
        ymaps.ready(init);
    }

    $('.pagin .tab a:first').addClass('klicked');

    $('.tabs:not(:first)').hide();

    $('.pagin .tab a').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('klicked')) {


            $('.tabs').css({display: "none"});

            curDiv = $('.tabs[data-att=' + $(this).attr('data-attr') + ']');


            $(curDiv).css({
                'opacity': 0,
                'display': 'block'
            });

            var objShow = {
                opacity: '1'
            };



            $(curDiv).animate(objShow, 1000);
            $('.pagin .tab a').removeClass('klicked');
            $(this).addClass('klicked');


            $('html, body').stop(true, true).animate({
                scrollTop: $('.views').offset().top
            }, 1000);
        }



    });


    var arr = $('.pagin .tab a');

    $('.last').click(function (e) {
        e.preventDefault();
        var previndex;
        var nextindex;

        $.each(arr, function (i, val) {
            if ($(arr[i]).hasClass('klicked')) {
                previndex = i;
                nextindex = i + 1;
            }
        });
        if (nextindex < arr.length) {
            $(arr[previndex]).removeClass('klicked');
            $(arr[nextindex]).removeClass('klicked').trigger('click');
        }
        $('html, body').stop(true, true).animate({
            scrollTop: $('.views').offset().top
        }, 1000);
    });

    $('.first').click(function (e) {
        e.preventDefault();
        var previndex;
        var nextindex;

        $.each(arr, function (i, val) {
            if ($(arr[i]).hasClass('klicked')) {
                previndex = i;
                nextindex = i - 1;
            }
        });
        if (nextindex >= 0) {
            $(arr[previndex]).removeClass('klicked');
            $(arr[nextindex]).removeClass('klicked').trigger('click');
        }
        $('html, body').stop(true, true).animate({
            scrollTop: $('.views').offset().top
        }, 1000);
    });




    $('.sly').click(function () {
        var target = $(this).attr('href');
        $('html, body').stop(true, true).animate({
            scrollTop: $(target).offset().top
        }, 1500);
        return false;
    });



    $(".head_menu .block-toggle_nav").click(function () {
        if (!$(this).hasClass('open')) {
            $(this).addClass("open");
            $('#toggle').addClass("on");
            $("#menu1").stop(true, true).fadeIn('slow');
        }
        else {
            $('#toggle').removeClass("on");
            $("#menu1").fadeOut('slow');
            $(this).removeClass("open");
        }

    });



    $(".foot_menu .block-toggle_nav").click(function () {
        if (!$(this).hasClass('open')) {
            $(this).addClass("open");
            $('#toggle2').addClass("on");
            $("#menu2").stop(true, true).slideDown('slow');
        }
        else {
            $('#toggle2').removeClass("on");
            $("#menu2").slideUp('slow');
            $(this).removeClass("open");
        }

    });


    Mobile();
    Mobile2();



    $('#link1').click(function (event) {
        event.preventDefault();
        if (!$(this).hasClass('open')) {
            $('#hidd1').slideDown();
            $(this).html('Свернуть').addClass('open');
        }
        else {
            $('#hidd1').slideUp();
            $(this).html('Читать подробнее').removeClass('open');
        }
    });
    
    
    $('#link2').click(function (event) {
        event.preventDefault();
        if (!$(this).hasClass('open')) {
            $('#hidd2').slideDown();
            $(this).html('Свернуть').addClass('open');
        }
        else {
            $('#hidd2').slideUp();
            $(this).html('Читать подробнее').removeClass('open');
        }
    });

	$.validator.methods.phoneUS = function(value, element) {
      return (value.indexOf('_') == -1);
    };

    $("#formm").validate({
        rules: {
            name: {
                required: true,
                minlength: 10,
                maxlength: 50
            },
            phone: {
                required: true,
                minlength: 10,
                maxlength: 17,
                phoneUS: true
            }


        },
        messages: {
            name: {
                required: "Заполните",
                minlength: "Меньше 10 символов",
                maxlength: "Много символов"
            },
            phone: {
                required: "Заполните",
                minlength: "Заполните",
                phoneUS: "Невер. формат",
                maxlength: "Много символов"
            }
        },
        submitHandler: function () {
            $.ajax({
                url: '/blocks/ajax',
                method: 'POST',
                async: false,
                data: {
                    name: $("#formm").find('input[name=name]').val(),
                    phone: $("#formm").find('input[name=phone]').val(),
                    count: $('input[name=count]').val(),
                    order: '1'
                },
                success: function (response) {
                    // console.log(response)
                    $("#formm").find('input[name=name]').val('');
                    $("#formm").find('input[name=phone]').val('');
                    showMessage('Спасибо за Ваш заказ, в скором времени наш менеджер свяжется с Вами для уточнения деталей по доставке товара.');
                    ga('send', 'event', 'order','send');
                    yaCounter34762115.reachGoal('order');
                }
            });
        }

    });
    $("#formmb").validate({
        rules: {
            name: {
                required: true,
                minlength: 10,
                maxlength: 50
            },
            phone: {
                required: true,
                minlength: 10,
                maxlength: 17,
                phoneUS: true
            }


        },
        messages: {
            name: {
                required: "Заполните",
                minlength: "Меньше 10 символов",
                maxlength: "Много символов"
            },
            phone: {
                required: "Заполните",
                minlength: "Заполните",
                phoneUS: "Невер. формат",
                maxlength: "Много символов"
            }
        },
        submitHandler: function () {
            $.ajax({
                url: 'blocks/ajax',
                method: 'POST',
                async: false,
                data: {
                    name: $("#formmb").find('input[name=name]').val(),
                    phone: $("#formmb").find('input[name=phone]').val(),
                    count: $('input[name=countb]').val(),
                    order: '1'
                },
                success: function (response) {
                    // console.log(response)
                    $("#formmb").find('input[name=name]').val('');
                    $("#formmb").find('input[name=phone]').val('');
                    showMessage('Спасибо за Ваш заказ, в скором времени наш менеджер свяжется с Вами для уточнения деталей по доставке товара.');
                    ga('send', 'event', 'order','send');
                    yaCounter34762115.reachGoal('order');
                }
            });
        }

    });
    
    $("#form_call").validate({
        rules: {
            name: {
                required: true,
                minlength: 10,
                maxlength: 50
            },
            phone2: {
                required: true,
                minlength: 15,
                phoneUS: true
            },
            message: {
                required: true
            }


        },
        messages: {
            name: {
                required: "Заполните",
                minlength: "Меньше 10 символов",
                maxlength: "Много символов"
            },
            phone2: {
                required: "Заполните",
                minlength: "Заполните",
                phoneUS: "Неверный формат",
            },
            message: {
                required: "Заполните",
            }
        },
        submitHandler: function () {
            $.ajax({
                url: 'blocks/ajax',
                method: 'POST',
                async: false,
                data: {
                    name: $("#form_call").find('input[name=name]').val(),
                    phone1: $("#form_call").find('select[name=phone1]').val(),
                    phone2: $("#form_call").find('input[name=phone2]').val(),
                    time1: $("#form_call").find('select[name=time1]').val(),
                    time2: $("#form_call").find('select[name=time2]').val(),
                    message: $("#form_call").find('textarea[name=message]').val(),
                    call: '1'
                },
                success: function (response) {
                    $.fancybox.close();
                    $("#form_call").find('input[name=name]').val('');
                    $("#form_call").find('input[name=phone2]').val('');
                    $("#form_call").find('textarea[name=message]').val('');
                    showMessage('Спасибо, запрос отправлен, в скором времени мы свяжемся с Вами и ответим на все вопросы.');
					ga('send', 'event', 'call','send');
					yaCounter34762115.reachGoal('call');
                }
            });
        }

    });

    $('input[name="count"]').keydown(function (e) {
        if (!checkDigits(e)) {
            e.preventDefault();
        }
    })

    $('input[name="count"]').keyup(function (e) {
        recalculateTotal($(this));
    })
    
    $('input[name="countb"]').keydown(function (e) {
        if (!checkDigits(e)) {
            e.preventDefault();
        }
    })

    $('input[name="countb"]').keyup(function (e) {
        recalculateTotalb($(this));
    })

    $("#plus").click(function() {
        var cnt = parseInt($('input[name="count"]').val(),10);
        $('input[name="count"]').val(cnt+1);
        recalculateTotal($('input[name="count"]'));
        return false;
    });

    $("#plusb").click(function() {
        var cnt = parseInt($('input[name="countb"]').val(),10);
        $('input[name="countb"]').val(cnt+1);
        recalculateTotalb($('input[name="countb"]'));
        return false;
    });
    $("#minus").click(function() {
        var cnt = parseInt($('input[name="count"]').val(),10);
        ncnt = cnt-1;
        if(ncnt > 0) {
            $('input[name="count"]').val(ncnt);
            recalculateTotal($('input[name="count"]'));
        }
        return false;
    });
    $("#minusb").click(function() {
        var cnt = parseInt($('input[name="countb"]').val(),10);
        ncnt = cnt-1;
        if(ncnt > 0) {
            $('input[name="countb"]').val(ncnt);
            recalculateTotalb($('input[name="countb"]'));
        }
        return false;
    });

        //$('input[name="phone"]').inputmask('+7 (999) 999-99-99');
        //$('input[name="phone2"]').inputmask('(999) 999-99-99');

    
    $('input[name="phone"]').bind("change keyup input click", function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});
    
    $('input[name="phone2"]').bind("change keyup input click", function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});
    
    
    $("#forms").validate({
        rules: {
            name: {
                required: true,
                minlength: 4,
                maxlength: 30
            },
            email: {
                required: true,
                email: true,
                maxlength: 30
            }


        },
        messages: {
            name: {
                required: "Заполните",
                minlength: "Меньше 4 символов",
                maxlength: "Много символов"
            },
            email: {
                required: "Заполните",
                email: "Укажите электронный адрес",
                maxlength: "Много символов"
            }
        },
        submitHandler: function () {
            $.ajax({
                url: 'mail/ajax',
                method: 'POST',
                async: false,
                data: {
                    pages: $("#forms").find('input[name=formname]').val(),
                    action: $("#forms").find('input[name=action]').val(),
                    name: $("#forms").find('input[name=name]').val(),
                    mail: $("#forms").find('input[name=email]').val(),
                    info: $("#forms").find('textarea[name=info]').val()
                },
                success: function (response) {
                    // console.log(response)
                    $("#forms").find('input[name=name]').val('');
                    $("#forms").find('input[name=email]').val('');
                    $("#forms").find('textarea[name=info]').val('');
                    showMessage('Спасибо, Ваше сообщение отправлено, ожидайте пожалуйста ответ на свою электронную почту.');
                }
            });
        }

    });


    $(window).resize(function () {
        Mobile();
        Mobile2();
    });

    function trr() {
        if($('#popup_toggle').length > 0) {
            $('#popup_toggle').trigger('click');
        }
    }

    setTimeout(trr, 60000);


    $('.fancybox').fancybox();
    $('#popup_toggle').fancybox({
        wrapCSS: "wrap",
    });

});

var slickParams = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true
};

function Mobile() {
    if ((!window.isMobileType) && $(window).width() < 976) {
        window.isMobileType = true;
        $("#menu1").css('display', 'none');
        $('#toggle').removeClass("on");
        $("#menu1").fadeOut('slow');
        $(".head_menu .block-toggle_nav").removeClass("open");

    }
    if (window.isMobileType && $(window).width() >= 976) {
        window.isMobileType = false;
        $("#menu1").css('display', 'block');

    }

};

function Mobile2() {
    if ((!window.isMobileType2) && $(window).width() < 700) {
        window.isMobileType2 = true;
        $("#menu2").css('display', 'none');
        $('#toggle2').removeClass("on");
        $("#menu2").fadeOut('slow');
        $(".foot_menu .block-toggle_nav").removeClass("open");
        $('.slider_decript').slick(slickParams);
        $('.slider_compos').slick(slickParams);
        $('.slider_step').slick(slickParams);
        $('#link1').html('Читать подробнее').removeClass('open').css('display', 'block');
        $("#hidd1").css('display', 'none');
        
        $('#link2').html('Читать подробнее').removeClass('open').css('display', 'block');
        $("#hidd2").css('display', 'none');
        
    
    }
    if (window.isMobileType2 && $(window).width() >= 700) {
        window.isMobileType2 = false;
        $("#menu2").css('display', 'block');

        if ($('.slider_decript').hasClass('slick-initialized')) {
            $('.slider_decript').slick('unslick');
        }
        if ($('.slider_step').hasClass('slick-initialized')) {
            $('.slider_step').slick('unslick');
        }
        if ($('.slider_compos').hasClass('slick-initialized')) {
            $('.slider_compos').slick('unslick');
        }


        $('#link1').html('Свернуть').addClass('open').css('display', 'none');
        $("#hidd1").css('display', 'inline');
        
        $('#link2').html('Свернуть').addClass('open').css('display', 'none');
        $("#hidd2").css('display', 'inline');
    }
}

function checkDigits(e) {
// Allow: backspace, delete, tab, escape, enter and .
if (jQuery.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                        (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return true;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            return false;
        }
        return true;
    }

	
// 01.03.17


var isMobileType3 = $(window).width() >= 700;
var isMobileType4 = $(window).width() >= 1000;

$(document).ready(function() {

    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        recalculateTotal($input);
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        recalculateTotal($input);
        return false;
    });


$('.fancy_frew').on('click', function(e){
    e.preventDefault();
});


    $('.fancy_frew').click(function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        $.fancybox({
            wrapCSS:"wrap2",
            href: href,
            'scrolling':'visible',
            beforeLoad: function() {
                setTimeout(function() {
                $('input, select').trigger('refresh');
            }, 1)
            }
        });

    });

     if ($('.select').length) {
        $('.select').styler();
        $('.select').trigger('refresh');
    }




    Mobile3();
    Mobile4();

    $(window).resize(function () {
        Mobile3();
        Mobile4();
    });

});

        var paramslick2 = {
              slidesToShow: 3,
              slidesToScroll: 1,
              dots: false,
              arrows:true,
              responsive: [
                  {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                  }
              ]
          }






   function Mobile3() {
        if ((!window.isMobileType3) && $(window).width() < 768) {

            $('.pr_icon').slick(slickParams);
        
            $('.slider_lend').slick(slickParams);
            $('.slider_lend2').slick(slickParams);
            $('.slider_lend3').slick(slickParams);
            $('.slider_lend33').slick(slickParams);
            $('.slider_lend4').slick(slickParams);
            $('.slid_icon').slick(slickParams);
            $('.slid_col5').slick(slickParams);
            // $('.slid_col6').slick(slickParams);
             window.isMobileType3 = true;
        }
        if (window.isMobileType3 && $(window).width() >= 767) {
            
            if ($('.pr_icon').hasClass('slick-initialized')){
                $('.pr_icon').slick('unslick');
            };
            if ($('.slider_lend').hasClass('slick-initialized')){
                $('.slider_lend').slick('unslick');
            }
            if ($('.slider_lend2').hasClass('slick-initialized')){
                $('.slider_lend2').slick('unslick');
            }
            if ($('.slider_lend3').hasClass('slick-initialized')){
                $('.slider_lend3').slick('unslick');
            }
            if ($('.slider_lend33').hasClass('slick-initialized')){
                $('.slider_lend33').slick('unslick');
            };
            if ($('.slider_lend4').hasClass('slick-initialized')){
                $('.slider_lend4').slick('unslick');
            };
            if ($('.slid_icon').hasClass('slick-initialized')){
                $('.slid_icon').slick('unslick');
            };
             if ($('.slid_col5').hasClass('slick-initialized')){
                $('.slid_col5').slick('unslick');
            };
            // if ($('.slid_col6').hasClass('slick-initialized')){
            //     $('.slid_col6').slick('unslick');
            // };
            
            window.isMobileType3 = false;
        }


    };


   function Mobile4() {
        if ((!window.isMobileType4) && $(window).width() < 1000) {
            window.isMobileType4 = true;
            $('.slider_l8').slick(paramslick2);
        }
        if (window.isMobileType4 && $(window).width() >= 1000) {
            window.isMobileType4 = false;
            if ($('.slider_l8').hasClass('slick-initialized')){
                $('.slider_l8').slick('unslick');
            }
        }


    };

function recalculateTotal(input) {
    var price = input.data('price');
    var delivery = input.data('delivery');
    var count = input.val();
    $('.order-total').html(price*count);
    $('.order-grand-total').html(price*count + delivery);
}
function recalculateTotalb(input) {
    var price = input.data('price');
    var delivery = input.data('delivery');
    var count = input.val();
    $('.order-total-b').html(price*count);
    $('.order-grand-total').html(price*count + delivery);
}
    
    function showMessage(message) {
    
    var top = 15;

    if (jQuery('.alert_message').length) {
        jQuery('.alert_message').map(function () {
            top += 15 + jQuery(this).outerHeight();
        });
    }

    var message = '<div style="top:' + top + 'px;" class="alert alert_message alert-success" role="alert">' + message + '</div>';

    jQuery('body').prepend(message);

    setTimeout(function () {
        jQuery('.alert_message').first().fadeOut(500).remove();
    }, 7000);
}



	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{  

     $('#meta_viewport').attr({'content':'minimum-scale=1.0, width=device-width, maximum-scale=1, user-scalable=no'});

}