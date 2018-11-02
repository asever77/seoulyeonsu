$( function() {
    $( ".inp-date" ).datepicker({
        showOn: "button",
        dateFormat: "yy-mm-dd",
    });
} );

$.datepicker.setDefaults({
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames:  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //월 이름
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '.'
});

