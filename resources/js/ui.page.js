;(function($, win, doc, undefined) {
    console.log('page.js  ======================================');

    'use strict';

    $plugins.page.template = function(){
        console.log('template')
    }

    //mian
     $plugins.page.main = function(){
        console.log('main');

        $plugins.uiTab({ id:'mainEventTab', callback:tabslide });

        $('#mainVisual').owlCarousel({
            loop:true,
            margin:0,
            dot:true,
            nav:true,
            autoplay:true,
            autoplayTimeout:6000,
            onInitialized : owlcallback, 
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });

        $('#mainEvent1').owlCarousel({
            loop: true,
            margin:40,
            dot: true,
            nav: true,
            autoplay:true,
            autoplayTimeout:6000,
            onInitialized : owlcallback, 
            responsive:{
                0:{
                    items:2
                },
                600:{
                    items:2
                },
                1000:{
                    items:2
                }
            }
        });

        function owlcallback(event){
            console.log(event.target.id);
            var $id = $('#' + event.target.id),
                $wrap = $id.closest('.ui-owl');

            $wrap.addClass('n'+ $wrap.find('.owl-dots button').length);

            $(doc).on('click', '.owl-control.play', function(){
                $(this).removeClass('play').addClass('stop');
                $id.trigger('play.owl.autoplay', [1000])
            })
            $(doc).on('click', '.owl-control.stop', function(){
                $(this).removeClass('stop').addClass('play');
                $id.trigger('stop.owl.autoplay')
            })
        }

        function tabslide(v){
            console.log(v)
        }
    }

    
        



})(jQuery, window, document);