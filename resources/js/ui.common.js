;
(function ($, win, doc, undefined) {

    'use strict';

    $plugins.common = {
        init: function () {
            console.log('common.js  ======================================');

            $plugins.uiAjax({
                id: 'baseHeader',
                url: '../../html/inc/header.html',
                page: true,
                callback: $plugins.common.header
            });
            $plugins.uiAjax({
                id: 'baseFooter',
                url: '../../html/inc/footer.html',
                page: true,
                callback: $plugins.common.footer
            });


            // datepicker jquery-ui
            $(".inp-date").datepicker({
                showOn: "button",
                dateFormat: "yy-mm-dd",
            });
            $.datepicker.setDefaults({
                prevText: '이전 달',
                nextText: '다음 달',
                monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //월 이름
                monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                showMonthAfterYear: true,
                yearSuffix: '.'
            });

        },

        header: function () {
            console.log('load - header ');
            
        },

        footer: function () {
            console.log('load - footer');
        }
    };

    //modal
    $plugins.modal = {
        alert: function (v) {
            //console.log(v);
        }
    }

    //page 
    $plugins.page = {}

    //callback
    $plugins.callback = {
        modal: function (modalId) {
            switch (modalId) {
                case 'modalID':
                    break;
            }
        }
    }

    $(doc).ready(function () {
        $plugins.common.init();
    });
})(jQuery, window, document);
