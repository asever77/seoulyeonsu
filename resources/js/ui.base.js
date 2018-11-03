;(function ($, win, doc, undefined) {
    console.log('base.js ======================================')

    var script_file = '';

    script_file += '<script src="../../resources/js/lib/jquery.smoothwheel.js"></script>';
    script_file += '<script src="../../resources/js/lib/owl.carousel.js"></script>';

    script_file += '<script src="../../resources/js/ui.plugins.js"></script>';
    script_file += '<script src="../../resources/js/ui.common.js"></script>';
    script_file += '<script src="../../resources/js/ui.page.js"></script>';


    $('head').append(script_file);

})(jQuery, window, document);	