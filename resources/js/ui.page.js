;(function($, win, doc, undefined) {
    console.log('page.js  ======================================');

    'use strict';

    $plugins.page.template = function(){
        console.log('template')
    }

    //mian
    $plugins.page.owlcallback = function(event){
        var $id = $('#' + event.target.id),
            $wrap = $id.closest('.ui-owl');

        $wrap.removeClass('n1 n2 n3 n4 n5 n6 n7 n8 n9 n10').addClass('n'+ $wrap.find('.owl-dots button').length);

        $(doc).off('click.owlplay').on('click.owlplay', '.owl-control.play', function(){
            $(this).removeClass('play').addClass('stop');
            $(this).closest('.ui-owl').find('.owl-carousel').trigger('play.owl.autoplay', [6000]);
        })
        $(doc).off('click.owlstop').on('click.owlstop', '.owl-control.stop', function(){
            $(this).removeClass('stop').addClass('play');
           $(this).closest('.ui-owl').find('.owl-carousel').trigger('stop.owl.autoplay')
        });
    }

    var timer_resize;

    $(win).resize(function(){
        clearTimeout(timer_resize);
        timer_resize = setTimeout(function(){
            $('.ui-owl').each(function(){
                $(this).removeClass('n1 n2 n3 n4 n5 n6 n7 n8 n9 n10').addClass('n'+ $(this).find('.owl-dots button').length);
            })
        },300);
    });

    //메인
    $plugins.page.main = function(){
        console.log('main');

        $('#mainVisual').owlCarousel({
            loop:true,
            margin:0,
            dot:true,
            nav:true,
            autoplay:true,
            autoplayTimeout:6000,
            onInitialized : $plugins.page.owlcallback, 
            responsive:{
                0:{
                    items:1
                },
                768:{
                    items:1
                },
                1024:{
                    items:1
                }
            }
        });

        //연수원안내
        $plugins.uiTab({ id:'mainInfoTab', callback:tabSlideInfo, unres:true });
        function tabSlideInfo(v){
            $('#mainInfo').trigger('destroy.owl.carousel');
            $plugins.uiAjax({
                id: 'mainInfo',
                url: '../../html/main/info_'+ (v.current + 1) +'.html',
                page: true,
                callback: infoSlide
            });

            function infoSlide(){
                $('#mainInfo').owlCarousel({
                    loop: true,
                    margin:40,
                    dot: true,
                    nav: false,
                    autoplay:true,
                    autoplayTimeout:6000,
                    onInitialized : $plugins.page.owlcallback, 
                    responsive:{
                        0:{
                            items:1
                        },
                        768:{
                            items:2
                        },
                        1024:{
                            items:2
                        }
                    }
                });
            }
        }

        //연수원 이벤트
        $plugins.uiTab({ id:'mainEvntTab', callback:tabSlideEvnt, unres:true });
        function tabSlideEvnt(v){
            $('#mainEvent').trigger('destroy.owl.carousel');
            $plugins.uiAjax({
                id: 'mainEvent',
                url: '../../html/main/evnt_'+ (v.current + 1) +'.html',
                page: true,
                callback: infoSlide
            });

            function infoSlide(){
                $('#mainEvent').owlCarousel({
                    loop: false,
                    margin:26,
                    dot: true,
                    nav: false,
                    autoplay:true,
                    autoplayTimeout:6000,
                    onInitialized : $plugins.page.owlcallback, 
                    responsive:{
                        0:{
                            items:2
                        },
                        768:{
                            items:3
                        },
                        1024:{
                            items:4
                        }
                    }
                });
            }
        }

        //주변관광지
        $plugins.uiTab({ id:'mainPlaceTab', callback:tabSlidePlace, unres:true });
        function tabSlidePlace(v){
            $('#mainPlace').trigger('destroy.owl.carousel');
            $plugins.uiAjax({
                id: 'mainPlace',
                url: '../../html/main/place_'+ (v.current + 1) +'.html',
                page: true,
                callback: infoSlide
            });

            function infoSlide(){
                $('#mainPlace').owlCarousel({
                    loop: false,
                    margin:26,
                    dot: true,
                    nav: false,
                    autoplay:true,
                    autoplayTimeout:6000,
                    onInitialized : $plugins.page.owlcallback, 
                    responsive:{
                        0:{
                            items:2
                        },
                        768:{
                            items:3
                        },
                        1024:{
                            items:4
                        }
                    }
                });
            }
        }

        
    }

    //관광정보
    $plugins.page.tour = function(){
        $plugins.uiTab({ id:'tourinfoTab', callback:tourSlideInfo });
         $('#uiSlideRoomInfo').find('.owl-carousel').each(function(i){
            $(this).attr('id', 'uiSlideRoomInfoItem' + i);
        });
        function tourSlideInfo(v){
            if (v.current === 2 && !$('#uiSlideRoomInfo').data('load')) {
                console.log('한번실행');
                $('#uiSlideRoomInfo').data('load',true)

                $('#uiSlideRoomInfo').find('.owl-carousel').each(function(){
                    console.log($(this).attr('id'));
                    $('#' + $(this).attr('id')).owlCarousel({
                        loop: true,
                        dot: false,
                        nav: true,
                        margin:10,
                        responsive:{
                            0:{
                                items:3,
                            },
                            500:{
                                items:4,
                            },
                            1024:{
                                items:5,
                            }
                        }
                    });
                });
            }
            if (v.current === 3 && !$('#tourImg').data('load')) {
                console.log('한번실행');
                $('#tourImg').data('load',true).owlCarousel({
                    loop: true,
                    dot: false,
                    nav: true,
                    responsive:{
                        0:{
                            items:3,
                            margin:10,
                        },
                        500:{
                            items:3,
                            margin:10,
                        },
                        1024:{
                            items:6,
                            margin:19,
                        }
                    }
                });
                
            }

            $(document).on('click', '.img-slide-area .item a', function(e){
                e.preventDefault();
                var $this = $(this),
                    imgUrl = $this.attr('href');

                $this.addClass('active').closest('.ui-bigimg-slide').find('.img-slide-area .item a').removeClass('active');
                $this.addClass('active').closest('.ui-bigimg-slide').find('.big-img-area img').attr('src',imgUrl);
            });
        }
    }
    //관광정보
    $plugins.page.idpw = function(){
        $plugins.uiTab({ id:'idpwTab' });
    }
        



})(jQuery, window, document);