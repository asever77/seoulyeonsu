//Polyfill
if (!Object.create) {
	Object.create = function (o) {
		if (arguments.length > 1) {
			throw new Error('Sorry the polyfill Object.create only accepts the first parameter.');
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
if (!Array.indexOf){ 
	Array.prototype.indexOf = function(obj){ 
		for(var i=0; i<this.length; i++){ 
			if(this[i]==obj){ return i; } 
		} 
		return -1; 
	}
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback,thisArg) {
		var T,k;
		if(this === null) {
			throw new TypeError('error');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if(typeof callback !== "function"){
			throw new TypeError('error');
		}
		if(arguments.length > 1){
			T = thisArg;
		}
		k = 0;
		while(k < len){
			var kValue;
			if(k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.isArray) {
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	}
}
if (!Object.keys){
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toDtring : null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;
		
		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non=object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}()); 
}

/*!
  * CodeGhost v1.0.1 
  * Copyright 2018-2018 The CodeGhost Authors (http://github.com/asever77)
  */

//utils module
;(function ($, win, doc, undefined) {
	console.log('plguins.js  ======================================');

	'use strict';

	var global = "$plugins", 
		namespace = "codeGhost.plugins",
		easings = {
			linear : function(t,b,c,d){return c*t/d+b;},
			easeInQuad : function(t,b,c,d){return c*(t/=d)*t+b;},
			easeOutQuad : function(t,b,c,d){return -c*(t/=d)*(t-2)+b;},
			easeInOutQuad : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*((--t)*(t-2)-1)+b;},
			easeOutInQuad : function(t,b,c,d){if(t < d/2)return easings.easeOutQuad(t*2,b,c/2,d);return easings.easeInQuad((t*2)-d,b+c/2,c/2,d);},
			easeInCubic : function(t,b,c,d){return c*(t/=d)*t*t+b;},
			easeOutCubic : function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
			easeInOutCubic : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
			easeOutInCubic : function(t,b,c,d){if(t<d/2)return easings.easeOutCubic(t*2,b,c/2,d);return easings.easeInCubic((t*2)-d,b+c/2,c/2,d);},
			easeInQuart : function(t,b,c,d){return c*(t/=d)*t*t*t+b;},
			easeOutQuart : function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},
			easeInOutQuart : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},
			easeOutInQuart : function(t,b,c,d){if(t<d/2)return easings.easeOutQuart(t*2,b,c/2,d);return easings.easeInQuart((t*2)-d,b+c/2,c/2,d);},
			easeInQuint : function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
			easeOutQuint : function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
			easeInOutQuint : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
			easeOutInQuint : function(t,b,c,d){if(t<d/2)return easings.easeOutQuint(t*2,b,c/2,d);return easings.easeInQuint((t*2)-d,b+c/2,c/2,d);},
			easeInSine : function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},
			easeOutSine : function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},
			easeInOutSine : function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},
			easeOutInSine : function(t,b,c,d){if(t<d/2)return easings.easeOutSine(t*2,b,c/2,d);return easings.easeInSine((t*2)-d,b+c/2,c/2,d);},
			easeInExpo : function(t,b,c,d){return (t==0)? b : c*Math.pow(2,10*(t/d-1))+b-c*0.001;},
			easeOutExpo : function(t,b,c,d){return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;},
			easeInOutExpo : function(t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b-c*0.0005;return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b;},
			easeOutInExpo : function(t,b,c,d){if(t<d/2)return easings.easeOutExpo(t*2,b,c/2,d);return easings.easeInExpo((t*2)-d,b+c/2,c/2,d);},
			easeInCirc : function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},
			easeOutCirc : function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},
			easeInOutCirc : function(t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},
			easeOutInCirc : function(t,b,c,d){if (t<d/2)return easings.easeOutCirc(t*2,b,c/2,d);return easings.easeInCirc((t*2)-d,b+c/2,c/2,d);},		
			easeInElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},
			easeOutElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);},
			easeInOutElastic : function(t,b,c,d,a,p){if(t==0)return b;if((t/=d/2)==2)return b+c;var s,p=d*(.3*1.5),a=0;var s,p=(!p||typeof(p)!='number')? d*(.3*1.5) : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},
			easeOutInElastic : function(t,b,c,d,a,p){if (t<d/2)return easings.easeOutElastic(t*2,b,c/2,d,a,p);return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p);},
			easeInBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*(t/=d)*t*((s+1)*t-s)+b;},
			easeOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
			easeInOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
			easeOutInBack : function(t,b,c,d,s){if(t<d/2)return easings.easeOutBack(t*2,b,c/2,d,s);return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s);},			
			easeInBounce : function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b;},
			easeOutBounce : function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},
			easeInOutBounce : function(t,b,c,d){if(t<d/2)return easings.easeInBounce(t*2,0,c,d)*.5+b;else return easings.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b;},
			easeOutInBounce : function(t,b,c,d){if(t<d/2)return easings.easeOutBounce(t*2,b,c/2,d);return easings.easeInBounce((t*2)-d,b+c/2,c/2,d);}
		},
		easing;

	//IIFE - device & browser setup check
	(function () {
		var width = document.documentElement.offsetWidth,
			devsize = [1024, 768],
			size_len = devsize.length,
			sizeMode,
			colClass = width > devsize[0] ? 'rsp-d' : width > devsize[1] ? 'rsp-t' : 'rsp-m',
			html5tags = ['article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'main', 'section', 'summary'],
			i = 0,
			max = html5tags.length,
			timer;

		deviceSizeClassName(width);

		for (i = 0; i < max; i++) {
			document.createElement(html5tags[i]);
		}

		document.documentElement.className += (' ' + colClass);

		$(win).resize(function () {
			clearTimeout(timer);
			timer = setTimeout(function () {
				width = $(win).outerWidth();

				colClass = width > devsize[0] ? 'rsp-d' : width > devsize[1] ? 'rsp-t' : 'rsp-m';
				$('html').removeClass('rsp-d');
				$('html').removeClass('rsp-t');
				$('html').removeClass('rsp-m').addClass(' ' + colClass);
			}, 100);
		});

		function deviceSizeClassName(w){
			for (var j = 0; j < size_len; j++) {
				if (w > devsize[j]) {
					sizeMode = devsize[j];
					break;
				} else {
					w < devsize[size_len - 1] ? sizeMode = 0 : '';
				}
			}
		}
	})();
	(function () {
		var ua = navigator.userAgent,
			ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
			filter = "win16|win32|win64|mac|macintel",
			uAgent = ua.toLowerCase(),
			deviceInfo_len = deviceInfo.length,
			browser = $.borwser,
			support = $.support,
			device = $.device,
			i = 0,
			version,
			j;

		!browser ? $.browser = browser = {} : '';

		for (i = 0; i < deviceInfo_len; i++) {
			if (uAgent.match(deviceInfo[i]) != null) {
				device = deviceInfo[i];
				break;
			}
		}
		
		browser.local = (/^http:\/\//).test(location.href);
		browser.firefox = (/firefox/i).test(ua);
		browser.webkit = (/applewebkit/i).test(ua);
		browser.chrome = (/chrome/i).test(ua);
		browser.opera = (/opera/i).test(ua);
		browser.ios = (/ip(ad|hone|od)/i).test(ua);
		browser.android = (/android/i).test(ua);
		browser.safari = browser.webkit && !browser.chrome;
		browser.app = ua.indexOf('appname') > -1 ? true : false;

		//touch, mobile 환경 구분
		support.touch = browser.ios || browser.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
		browser.mobile = support.touch && ( browser.ios || browser.android);
		//navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';
		
		//false 삭제
		// for (j in browser) {
		// 	if (!browser[j]) {
		// 		delete browser[j]
		// 	}
		// }
		
		//os 구분
		browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
		browser.os = browser.os ? browser.os[1].toLowerCase() : '';

		//version 체크
		if (browser.ios || browser.android) {
			version = ua.match(/applewebkit\/([0-9.]+)/i);
			version && version.length > 1 ? browser.webkitversion = version[1] : '';
			if (browser.ios) {
				version = ua.match(/version\/([0-9.]+)/i);
				version && version.length > 1 ? browser.ios = version[1] : '';
			} else if (browser.android) {
				version = ua.match(/android ([0-9.]+)/i);
				version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
			}
		}


		if (ie) {
			browser.ie = ie = parseInt( ie[1] || ie[2] );
			browser.oldie = false;
			browser.ie9 = false;
			( 9 > ie ) ? browser.oldie = true : ( 9 == ie ) ? browser.ie9 = true : '';
			( 11 > ie ) ? support.pointerevents = false : '';
			( 9 > ie ) ? support.svgimage = false : '';
		} else {
			browser.ie = false;
			browser.oldie = false;
			browser.ie9 = false;
		}

		//class 생성
		$('html')
		.addClass(browser.os)
		.addClass(browser.chrome? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : '')
		.addClass(browser.ie && 8 > browser.ie ? 'oldie' : '')
		.addClass(browser.ios ? "ios" : browser.android ? "android" : '')
		.addClass(browser.mobile ? 'ui-m' : 'ui-d')
		.addClass(browser.app ? 'ui-a' : '');
	})();

	//requestAnimationFrame
	win.requestAFrame = (function () {
		return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||
			//if all else fails, use setTimeout
			function (callback) {
				return win.setTimeout(callback, 1000 / 60); //shoot for 60 fp
			};
	})();
	win.cancelAFrame = (function () {
		return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame ||
			function (id) {
				win.clearTimeout(id);
			};
	})();

	//jquery easing add
	for (easing in easings) {
		$.easing[easing] = (function(easingname) {
			return function(x, t, b, c, d) {
				return easings[easingname](t, b, c, d);
			}
		})(easing);
	}

	//function
	function uiNameSpace(identifier, module){
		if (identifier === undefined) {
			return false;
		}
		
		var w = win, 
			name = identifier.split('.'), 
			p;
	
		if (!!identifier) {
			for (var i = 0; i < name.length; i += 1) {
				!w[name[i]] ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}
		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					throw new Error('module already exists! >> ' + p);
				}
			}
		}
		return w;
	}
	function uiComma(n) {
		var parts = n.toString().split(".");
			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
	}
	function partsAdd0(x, y, z) {
		var y = y === undefined ? 10 : y,
			z = z === undefined ? '0' : z;

		return ((x < 10) ? z + x : x);
	}

	//global namespace
	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	} else {
		win[global] = uiNameSpace(namespace, {});
	}

	//components option
	win[global].option = {
		keys: { 
			'tab': 9, 'enter': 13, 'alt': 18, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40,
		},
		effect: {
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		}
	};

	win[global] = uiNameSpace(namespace, {
		uiConsoleGuide: function (opt) {
			return createUiConsoleGuide(opt);
		},
		uiAjax: function (opt) {
			return createUiAjax(opt);
		},
		uiScroll: function (opt) {
			return createUiScroll(opt);
		},
		uiPara: function (v) {
			return createUiPara(v);
		},
		uiHasScrollBar: function (opt) {
			return createUiHasScrollBar(opt);
		},
		uiFocusTab: function (opt) {
			return createUiFocusTab(opt);
		},
		uiPopup: function (opt) {
			return createUiPopup(opt);
		}
	});
	function createUiConsoleGuide(opt) {
		if (!$.browser.ie) {
			console.log('');
			for (var i = 0; i < opt.length; i++) {
				(i === 0) ? console.log("%c" + opt[i], "background:#333; color:#ffe400; font-size:12px"): console.log(opt[i]);
			}
			console.log('');
		}
	}
	win[global].uiAjax.option = {
		page: true,
		add: false,
		prepend: false,
		type: 'GET',
		callback: false,
		errorCallback: false
	};
	function createUiAjax(opt) {
		if (opt === undefined) {
			return false;
		}

		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiAjax.option, opt),
			$id = $('#' + opt.id),
			callback = opt.callback === undefined ? false : opt.callback,
			errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;

		$.ajax({
			type: opt.type,
			url: opt.url,
			cache: false,
			async: false, //비동기 통신 여부 
			headers: {
				"cache-control": "no-cache",
				"pragma": "no-cache"
			},
			error: function (request, status, err) {
				errorCallback ? errorCallback() : '';
			},
			success: function (result) {
				opt.page ? opt.add ? opt.prepend ? $id.prepend(result) : $id.append(result) : $id.html(result) : '';
				callback ? callback(result) : '';
			}
		});
	}
	win[global].uiScroll.option = {
		value: 0,
		speed: 0,
		callback: false,
		ps: 'top',
		focus: false,
		target: false
	};
	function createUiScroll(opt){
		if (opt === undefined) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiScroll.option, opt),
			v = opt.value,
			s = opt.speed,
			c = opt.callback,
			p = opt.ps,
			overlap = false,
			f = typeof opt.focus === 'string' ? '#' + opt.focus : opt.focus,
			$target = opt.target === false ? $('html, body') : opt.target;
		
		if (p === 'top') {
			$target.stop().animate({ 
				scrollTop : v 
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrolltop:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? $(f).attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		} else if (p === 'left') {
			$target.stop().animate({ 
				scrollLeft : v 
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? $(f).attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		}
	}
	function createUiPara(paraname){
		var _tempUrl = win.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

		for (var i = 0, len = _tempArray_len; i < len; i++) {
			_keyValue = _tempArray[i].split('=');

			if (_keyValue[0] === paraname) {
				return _keyValue[1];
			}
		}
	}
	function createUiHasScrollBar(opt) {
		var $this = opt.selector;
		return ($this.prop('scrollHeight') == 0 && $this.prop('clientHeight') == 0) || ($this.prop('scrollHeight') > $this.prop('clientHeight'));
	}
	win[global].uiFocusTab.option = {
		focusitem : '.ui-select-tit, iframe, a:not([data-disabled]), button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), label, [role="button"]',
		callback: false,
		focusnot: false,
		type: 'hold' //'hold', 'sense'
	};
	function createUiFocusTab(opt){
		if (opt === undefined) {
			return false;
		}
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFocusTab.option, opt),
			$focus = $(opt.selector),
			$item = $focus.find(opt.focusitem),
			callback = opt.callback,
			focusnot = opt.focusnot,
			type = opt.type,
			timer; 

		if (!!$item.length) {
			$item.eq(0).addClass('ui-fctab-s').attr('tabindex', 0).attr('holds', true);
			$item.eq(-1).addClass('ui-fctab-e').attr('tabindex', 0).attr('holde', true);
		} else {
			$focus.prepend('<div class="ui-fctab-s" tabindex="0" holds="true"></div>');
			$focus.append('<div class="ui-fctab-e" tabindex="0" holde="true"></div>');
			$item = $focus.find('.ui-fctab-s, .ui-fctab-e');
		}
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			!focusnot ? $item.eq(0).focus() : '';
		},0);
		timer = '';

		$focus.find('.ui-fctab-s').off('keydown.holds').on('keydown.holds', function (e) {
			if (type === 'hold') {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-e').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(e.shiftKey && e.keyCode == 9) ? callback('before') : '';
			}
		});
		$focus.find('.ui-fctab-e').off('keydown.holde').on('keydown.holde', function (e) {
			if (type === 'hold') {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-s').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(!e.shiftKey && e.keyCode == 9) ? callback('after') : '';
			}
		});
	}
	win[global].uiPopup.option = {
		name: 'new popup',
		width: 790,
		height: 620,
		align: 'center',
		top: 0,
		left: 0,
		toolbar: 'no',
		location: 'no',
		memubar: 'no',
		status: 'no',
		resizable: 'no',
		scrolbars: 'yes'
	};
	function createUiPopup(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiPopup.option, opt),
			specs;

		if (opt.align === 'center') {
			opt.left = ($(win).outerWidth() / 2) - (opt.width / 2);
			opt.top = ($(win).outerHeight() / 2) - (opt.height / 2);
		}

		specs = 'width=' + opt.width + ', height='+ opt.height + ', left=' + opt.left + ', top=' + opt.top;
		specs += ', toolbar=' + opt.toolbar + ', location=' + opt.location + ', resizable=' + opt.resizable + ', status=' + opt.status + ', menubar=' + opt.menubar + ', scrollbars=' + opt.scrollbars;
		
		win.open(opt.link, opt.name , specs);
	}

	win[global] = uiNameSpace(namespace, {
		uiCookieSet: function (opt) {
			return creaeteUiCookieSet(opt);
		},
		uiCookieGet: function (opt) {
			return creaeteUiCookieGet(opt);
		},
		uiCookieDel: function (opt) {
			return creaeteUiCookieDel(opt);
		}
	});
	function creaeteUiCookieSet(opt){
		var cookieset = opt.name + '=' + opt.value + ';',
			expdate;
		if (opt.term) {
			expdate = new Date();
			expdate.setTime( expdate.getTime() + opt.term * 1000 * 60 * 60 * 24 ); // term 1 is a day
			cookieset += 'expires=' + expdate.toGMTString() + ';';
		}
		(opt.path) ? cookieset += 'path=' + opt.path + ';' : '';
		(opt.domain) ? cookieset += 'domain=' + opt.domain + ';' : '';
		document.cookie = cookieset;
	}
	function creaeteUiCookieGet(opt){
		var match = ( document.cookie || ' ' ).match( new RegExp(opt.name + ' *= *([^;]+)') );
		return (match) ? match[1] : null;
	}
	function creaeteUiCookieDel(opt){
		var expireDate = new Date();

		expireDate.setDate(expireDate.getDate() + -1);
		win[global].uiCookieSet({ name:opt.name, term:'-1' });
	}

	win[global] = uiNameSpace(namespace, {
		uiAccordion: function (opt) {
			return createUiAccordion(opt);
		},
		uiAccordionToggle: function (opt) {
			return createUiAccordionToggle(opt);
		}
	});
	win[global].uiAccordion.option = {
	 	current: null,
		autoclose: false,
		callback: false,
		level: 3
	};
	function createUiAccordion(opt){
		//option guide
		if (opt === undefined || !$('#' + opt.id).length) {
			return false;
		}
		var opt = $.extend(true, {}, win[global].uiTab.option, opt),
			id = opt.id,
			current = opt.current,
			callback = opt.callback,
			autoclose = opt.autoclose,
			level = opt.lavel,
			$acco = $('#' + id),
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl = $wrap.children('.ui-acco-pnl'),
			$tit = $wrap.children('.ui-acco-tit'),
			$btn = $tit.find('.ui-acco-btn'),
			len = $wrap.length, 
			keys = win[global].option.keys,
			i = 0, 
			optAcco;
		
		//set up
		!$pnl ? $pnl = $tit.children('.ui-acco-pnl') : '';
		$acco
			.attr('role','presentation')
			.data('opt', { 
				id:id, 
				close: autoclose, 
				callback: callback
			});
		$tit.attr('role','heading')
			.attr('aria-level', level);
		$pnl.attr('role','region');

		for (i = 0; i < len; i++) {
			var $accobtn = $wrap.eq(i).find('> .ui-acco-tit > .ui-acco-btn'),
				$accotit = $wrap.eq(i).find('> .ui-acco-tit'),
				$accopln = $wrap.eq(i).find('> .ui-acco-pnl');
			
			!$accopln ? $accopln = $accotit.children('.ui-acco-pnl') : '';
			$accotit.attr('id') === undefined ? $accobtn.attr('id', id + '-btn' + i) : '';
			$accopln.attr('id') === undefined ? $accopln.attr('id', id + '-pnl' + i) : '';
			
			$accobtn
				.data('selected', false)
				.attr('data-n', i)
				.attr('data-len', len)
				.attr('aria-expanded', false)
				.attr('aria-controls', $accopln.attr('id'))
				.removeClass('selected')
				.find('.ui-acco-txt').text('열기');
			$accopln
				.attr('data-n', i)
				.attr('data-len', len)
				.attr('aria-labelledby', $accobtn.attr('id'))
				.attr('aria-hidden', true).hide();

			i === 0 ? $accobtn.attr('acco-first', true) : '';
			i === len - 1 ? $accobtn.attr('acco-last', true) : ''
		}
		
		current !== null ? 
			win[global].uiAccordionToggle({ 
				id: id, 
				current: current, 
				motion: false 
			}) : '';

		//event
		$btn
			.off('click.uitab keydown.uitab')
			.on({
				'click.uitab': evtClick,
				'keydown.uitab': evtKeys
			});

		function evtClick(e) {
			if (!!$(this).closest('.ui-acco-wrap').find('.ui-acco-pnl').length) {
				e.preventDefault();
				var $this = $(this);

				optAcco = $this.closest('.ui-acco').data('opt');
				win[global].uiAccordionToggle({ 
					id: optAcco.id, 
					current: [$this.data('n')], 
					close: optAcco.close, 
					callback: optAcco.callback
				});
			}
		}
		function evtKeys(e) {
			var $this = $(this),
				n = Number($this.data('n')),
				m = Number($this.data('len')),
				id = $this.closest('.ui-acco').attr('id');

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				
				!$this.attr('acco-first') ?
				$('#' + id + '-btn' + (n - 1)).focus():
				$('#' + id + '-btn' + (m - 1)).focus();
			}
			function downRightKey(e) {
				e.preventDefault();

				!$this.attr('acco-last') ? 
				$('#' + id + '-btn' + (n + 1)).focus():
				$('#' + id + '-btn0').focus();
			}
			function endKey(e) {
				e.preventDefault();

				$('#' + id + '-btn' + (m - 1)).focus();
			}
			function homeKey(e) {
				e.preventDefault();
				$('#' + id + '-btn0').focus();
			}
		}
	}
	function createUiAccordionToggle(opt){
		if (opt === undefined) {
			return false;
		}
		
		var id = opt.id,
			$acco = $('#' + id),
			dataOpt = $acco.data('opt'),
			current = opt.current === undefined ? null : opt.current,
			callback = opt.callback === undefined ? dataOpt.callback : opt.callback,
			state = opt.state === undefined ? 'toggle' : opt.state,
			motion = opt.motion === undefined ? true : opt.motion,
			autoclose = dataOpt.close,
			allshow = opt.allshow,
			allhide = opt.allhide,
			open = null,
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl,
			$tit,
			$btn,
			len = $wrap.length,
			speed = 200,
			i, c = 0;
		
		(motion === false) ? speed = 0 : speed = 200;

		if (current !== 'all') {
			for (i = 0 ; i < current.length; i++) {
				$pnl = $wrap.eq(current[i]).children('.ui-acco-pnl');
				$tit = $wrap.eq(current[i]).children('.ui-acco-tit');
				$btn = $tit.find('.ui-acco-btn');
				
				if (state === 'toggle') {
					(!$btn.data('selected')) ? act('down') : act('up');
				} else {
					(state === 'open') ? act('down') : (state === 'close') ? act('up') : '';
				}
			}
			!!callback ? callback({ id:id, open:open, current:current}): '';
		} else if (current === 'all') {
			checking();
		}

		function checking() {
			c = 0;
			$wrap.each(function(i){
				c = ($wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').attr('aria-expanded') === 'true') ? c + 1 : c + 0;
			});
			if (state === 'open') {
				c = 0;
				$acco.data('allopen', false);
			} else if (state === 'close') {
				c = len;
				$acco.data('allopen', true);
			}
			if (c === 0 || !$acco.data('allopen')) {
				$acco.data('allopen', true);
				act('down');
			} else if (c === len || !!$acco.data('allopen')) {
				$acco.data('allopen', false);
				act('up');
			}
		}
		//모션
		function act(v) {
			var isDown = v === 'down',
				a = isDown ? true : false, 
				cls = isDown ? 'addClass' : 'removeClass', 
				updown = isDown ? 'slideDown' : 'slideUp',
				txt = isDown ? '닫기' : '열기';
			
			open = isDown ? true : false;

			if (autoclose === true && isDown) {
				$wrap.each(function(i){
					$wrap
						.eq(i)
						.find('> .ui-acco-tit .ui-acco-btn')
						.data('selected', false)
						.removeClass('selected')
						.attr('aria-expanded', false)
						.find('.ui-acco-txt')
						.text('열기');
					$wrap
						.eq(i)
						.find('> .ui-acco-pnl')
						.attr('aria-hidden',true)
						.stop()
						.slideUp(speed);
				});
			}
			if (current === 'all') {
				$wrap.each(function(i){
					$wrap
						.eq(i)
						.find('> .ui-acco-tit .ui-acco-btn')
						.data('selected', a)[cls]('selected')
						.attr('aria-expanded', a)
						.find('.ui-acco-txt')
						.text(txt);
					$wrap
						.eq(i)
						.find('> .ui-acco-pnl')
						.attr('aria-hidden', !a)
						.stop()
						[updown](speed, function(){
							// 초기화
							$(this).css({ 
								height: '', 
								padding: '', 
								margin: '' 
							}); 
						});
				});
			} else {
				$btn
					.data('selected', a)
					.attr('aria-expanded', a)
					[cls]('selected')
					.find('.ui-acco-txt')
					.text(txt);
				$pnl
					.attr('aria-hidden', !a)
					.stop()
					[updown](speed, function(){
						// 초기화
						$(this).css({ 
							height: '', 
							padding: '', 
							margin: '' 
						}); 
					});
			}
		}
	}



	win[global] = uiNameSpace(namespace, {
		uiSelect: function (opt) {
			return createUiSelect(opt);
		},
		uiSelectAct: function (opt) {
			return createUiSelectAct(opt);
		}
	});
	win[global].uiSelect.option = {
		id: false, //select id
		current: null
	};
	win[global].uiSelect.timer = {};
	function createUiSelect(opt){
		if ($.browser.mobile) {
			return false;
		}
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiSelect.option, opt),
			current = opt.current, 
			id = opt.id,
			is_id = id === false ? false : true,
			$ui_select = is_id ? typeof id === 'string' ? $('#' + opt.id).closest('.ui-select') : id.closest('.ui-select') : $('.ui-select'), 
			
			keys = win[global].option.keys,
			len = $ui_select.length, 
			i = 0,
			j = 0,

			_disabled = false,
			_selected = false,
			_val = '',
			_txt = '',
			
			$sel, 
			$sel_current, 
			$opt, 
			$opt_current, 

			sel_id,
			list_id,
			opt_id,
			opt_id_selected,
			sel_n,
			sel_tit, 
			sel_dis, 
			opt_len, 

			id_opt,
			id_optname,
			idx, 
			timer_opt,
			timer, 
			_option_wrap = '';
		
		//init
		$ui_select.find('.ui-select-btn').remove();
		$ui_select.find('.ui-select-wrap').remove();
		$ui_select.find('.dim').remove();
		
		//set
		for (i = 0; i < len; i++) {
			$sel_current = $ui_select.eq(i);
			$sel = $sel_current.find('select');
			$opt = $sel.find('option');
			
			sel_id = $sel.attr('id');
			list_id = sel_id +'_list';
			opt_id = sel_id +'_opt';
			sel_dis = $sel.prop('disabled');
			sel_tit = $sel.attr('title');
			opt_len = $opt.length;

			_option_wrap += '<div class="ui-select-wrap" style="min-width:'+ $sel_current.outerWidth() +'px">';
			_option_wrap += '<div class="ui-select-opts" role="listbox" id="'+ list_id +'" aria-hidden="true" tabindex="-1">';

			for (j = 0; j < opt_len; j++) {
				$opt_current = $opt.eq(j);

				if (current !== null) {
					_selected = current === j ?
						$opt_current.prop('selected', true):
						$opt_current.prop('selected', false);
				} else {
					_selected = $opt_current.prop('selected');
				}
				
				_disabled = $opt_current.prop('disabled');
				_selected ? _val = $opt_current.val() : '';
				_selected ? _txt = $opt_current.text() : '';
				_selected ? opt_id_selected = opt_id + '_' + j : '';
				_selected ? sel_n = j : '';

				id_optname = $sel.attr('id') + '_opt';
				id_opt = id_optname + '_' + j;

				_disabled ?
					_selected?
					_option_wrap += '<button type="button" role="option" id="'+ opt_id + '_' + j +'" class="ui-select-opt disabled selected" value="'+ $opt_current.val() +'" disabled tabindex="-1">':
					_option_wrap += '<button type="button" role="option" id="'+ opt_id + '_' + j +'" class="ui-select-opt disabled" value="'+ $opt_current.val() +'" disabled tabindex="-1">':
					_selected?
					_option_wrap += '<button type="button" role="option" id="'+ opt_id + '_' + j +'" class="ui-select-opt selected" value="'+ $opt_current.val() +'" tabindex="-1">':
					_option_wrap += '<button type="button" role="option" id="'+ opt_id + '_' + j +'" class="ui-select-opt" value="'+ $opt_current.val() +'" tabindex="-1">';

				_option_wrap += '<span class="ui-select-txt">' + $opt_current.text() + '</span>';
				_option_wrap += '</button>'; 
			}

			_option_wrap += '</div>'; 
			
			$.browser.mobile ? _option_wrap += '<button type="button" class="btn-close"><span>닫기</span></button>': '';
			$.browser.mobile ? _option_wrap += '<div class="dim"></div>': '';
			_option_wrap += '</div>'; 

			$sel_current.append('<input type="text" class="ui-select-btn" id="'+ sel_id +'_inp" role="combobox" aria-autocomplete="list" aria-owns="'+ list_id +'" aria-haspopup="true" aria-expanded="false" aria-activedescendant="'+ opt_id_selected +'" readonly value="'+ _txt +'" data-n="'+ sel_n +'" data-id="'+ sel_id +'">');

			$sel.addClass('off').attr('aria-hidden',true).attr('tabindex', -1);
			$sel_current.append(_option_wrap);
			sel_dis ? $sel_current.find('.ui-select-btn').prop('disabled', true).addClass('disabled') : '';
			_option_wrap = '';
		}
		
		//event
		$(doc).on('click', '.dim-dropdown',function(){
			if ($('body').data('select-open')) {
				optBlur();
			}
		});
		$('.ui-select-btn')
			.off('click.ui keydown.ui mouseover.ui focus.ui mouseleave.ui')
			.on({
				'click.ui': selectClick,
				'keydown.ui': selectKey,
				'mouseover.ui': selectOver,
				'focus.ui': selectOver,
				'mouseleave.ui': selectLeave
			});
		$('.ui-select-opt')
			.off('click.ui mouseover.ui mousemove.ui')
			.on({
				'click.ui':optClick,
				'mouseover.ui':selectOver,
				'mousemove.ui':selectOver
			});
		$('.ui-select-wrap')
			.off('mouseleave.ui')
			.on({
				'mouseleave.ui': selectLeave			
			});
		$('.ui-select select')
			.off('change.ui')
			.on({
				'change.ui':selectChange,
			});

		function selectLeave() {
			$('body').data('select-open', true);
		}

		function selectChange(){
			win[global].uiSelectAct({ id:$(this).attr('id'), current:$(this).find('option:selected').index(), original:true });
		}
		function optBlur() {
			optClose();
		}
		function selectClick(){
			var $btn = $(this);
			$btn.data('sct', $(doc).scrollTop());
			optExpanded(this);
		}
		function optClick() {
			var t = this,
				sct = $(t).closest('.ui-select').find('.ui-select-btn').data('sct');
			win[global].uiSelectAct({ id:$(t).closest('.ui-select').find('.ui-select-btn').data('id'), current:$(t).index() })
			$(t).closest('.ui-select').find('.ui-select-btn').focus();
			optClose();
			
			win[global].uiScroll({ value:sct, speed:200 });
			
		}
		function selectOver(){
			$('body').data('select-open', false);
		}
		function selectKey(e){
			var t = this,
				$btn = $(this),
				id = $btn.data('id'),
				$opt = $('#' + id + '_list').find('.ui-select-opt'),
				$wrap = $('#' + id + '_list').closest('.ui-select-wrap'),
				n = Number($('#' + id + '_list').find('.selected').index()),
				nn,
				wrap_h = $wrap.outerHeight(),
				len = $opt.length,
				n_top = 0;
			
			if (e.altKey) {  
				if (e.keyCode === keys.up) {      
					optOpen(t);      
				}    
				e.keyCode === keys.down && optClose();   
				return;
			} 
			
			switch(e.keyCode){
				case keys.up:
				nn = n - 1 < 0 ? len - 1 : n - 1;
				n_top = $opt.eq(nn).position().top;
				optScroll($wrap, n_top, wrap_h, 'up');
				optPrev(e, id, n, len);
				break;

				case keys.left:
				nn = n - 1 < 0 ? len - 1 : n - 1;
				n_top = $opt.eq(nn).position().top;
				optScroll($wrap, n_top, wrap_h, 'up');
				optPrev(e, id, n, len);
				break;

				case keys.down:
				nn = n + 1 > len - 1 ? 0 : n + 1;
				n_top = $opt.eq(nn).position().top;
				optScroll($wrap, n_top, wrap_h, 'down');
				optNext(e, id, n, len);
				break;

				case keys.right:
				nn = n + 1 > len - 1 ? 0 : n + 1;
				n_top = $opt.eq(nn).position().top;
				optScroll($wrap, n_top, wrap_h, 'down');
				optNext(e, id, n, len);
				break;
			}

			if (e.keyCode === keys.enter || e.keyCode === keys.space) {   
				e.preventDefault();

				$btn.data('sct', $(doc).scrollTop());
				optExpanded(this);
			}    
		}
		function optExpanded(t){
			if ($.browser.mobile) {
				optOpen(t)
			} else {
				if ($(t).attr('aria-expanded') === 'false') {
					optClose();
					optOpen(t);
				} else {
					optClose();	
				}	
			} 
		}
		function optScroll($wrap, n_top, wrap_h, key){
			if (key === 'up') {
				n_top < 0 ? $wrap.stop().animate({ 'scrollTop': $wrap.scrollTop() - wrap_h }) : n_top > wrap_h ? $wrap.stop().animate({ 'scrollTop': n_top }) : '';
			} else {
				n_top >= wrap_h ? $wrap.stop().animate({ 'scrollTop': $wrap.scrollTop() + wrap_h }) : n_top < 0 ? $wrap.stop().animate({ 'scrollTop': 0 }): '';
			}
		}
		function optPrev(e, id, n, len){
			e.preventDefault();
			n === 0 ? n = len - 1 : n = n - 1;
			win[global].uiSelectAct({ id:id, current:n });
		}
		function optNext(e, id, n, len){
			e.preventDefault();
			n === len - 1 ? n = 0 : n = n + 1;
			win[global].uiSelectAct({ id:id, current:n });
		}

		function optOpen(t){
			var _$sel = $(t),
				_$uisel = _$sel.closest('.ui-select'),
				_$wrap = _$uisel.find('.ui-select-wrap'),
				_$opts = _$wrap.find('.ui-select-opts'),
				_$opt = _$opts.find('.ui-select-opt'),

				offtop = _$uisel.offset().top,
				scrtop = $(doc).scrollTop(),
				wraph = _$wrap.outerHeight(),
				btnh = _$sel.outerHeight(),
				opth = _$opt.outerHeight(),
				winh = $(win).outerHeight(),
				clsname = 'bottom';

			clsname = winh - ((offtop - scrtop) + btnh) > wraph ? 'bottom' : 'top' ;			


			_$sel.closest('.ui-select-zindex').addClass('on');
			$('body').addClass('dim-dropdown');
			$('body').data('scrolling') === 'yes' ? win[global].uiScrollingCancel(): '';

			if(!_$sel.data('expanded')){
				_$sel.data('expanded', true).attr('aria-expanded', true);
				_$uisel.addClass('on');
				_$wrap.addClass('on ' + clsname).attr('aria-hidden', false);
				_$opts.find('.ui-select-opt').eq(_$uisel.find(':checked').index());

				win[global].uiScroll({ target:_$wrap, value:Number(opth * _$uisel.find(':checked').index()), speed:0 });
			}
		}
		function optClose(){
			var $select = $('.ui-select'),
				$btn = $('.ui-select-btn'),
				$wrap = $('.ui-select-wrap');
			
			$select.closest('.ui-select-zindex').removeClass('on');
			$('body').data('scrolling') === 'no' ? win[global].uiScrolling(): '';
			$('body').removeClass('dim-dropdown');
			$btn.data('expanded', false).attr('aria-expanded', false);
			$select.removeClass('on');
			$wrap.removeClass('on top bottom').attr('aria-hidden', true);
		}
	}
	function createUiSelectAct(opt){
		var id = typeof opt.id === 'string' ? opt.id : opt.id.attr('id'),
			$uisel = typeof opt.id === 'string' ? $('#' + opt.id).closest('.ui-select') : opt.id.closest('.ui-select'),
			$sel = $('#' + id),
			$opt = $sel.find('option'),
			$opt_ = $uisel.find('.ui-select-opt'),
			callback = opt.callback === undefined ? false : opt.callback,
			current= opt.current,
			org= opt.original === undefined ? false : opt.original;

		!org ?
			$uisel.find('option').prop('selected', false).eq(current).prop('selected', true).change() : '';
		$uisel.find('.ui-select-btn').val($opt.eq(current).text());
		$opt_.removeClass('selected').eq(current).addClass('selected');
		
		callback ? callback({ id:id, current:current, val:$opt.eq(current).val() }) : '';
	}


	win[global] = uiNameSpace(namespace, {
		uiTab: function (opt) {
			return createUiTab(opt);
		},
		uiTabAct: function (opt) {
			return createUiTabAct(opt);
		}
	});
	win[global].uiTab.option = {
		current: 0,
		unres: false,
		callback: false
	};
	function createUiTab(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTab.option, opt),
			id = opt.id,
			current = isNaN(opt.current) ? 0 : opt.current,
			unres = opt.unres,
			callback = opt.callback,
			keys = win[global].option.keys,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			para = win[global].uiPara('tab'), // tab=idname-1
			len = $btn.length,
			ps_l = [],
			i, _class, _attr, is_current, id_pnl, id_btn, _$btn, _$pnl;

		//set up
		if (para !== undefined) {
			para = para.split('-');
			para[0] === id ? current = Number(para[1]) : '';
		}

		$tab.data('opt', opt);
		$btns.attr('role','tablist');
		$btn.attr('role','tab');
		$pnl.attr('role','tabpanel');
		
		for (i = 0; i < len; i++) {
			is_current = current === i;
			_class = is_current ? 'addClass' : 'removeClass';
			_attr = is_current ? 'removeAttr' : 'attr';
			_$btn = $btn.eq(i);
			_$pnl = $pnl.eq(i);

			//id make
			_$btn.attr('id') === undefined ? _$btn.attr('id', id + 'Btn' + i) : '';
			_$pnl.attr('id') === undefined ? _$pnl.attr('id', id + 'Pnl' + i) : '';
			
			id_btn = _$btn.attr('id');
			id_pnl = _$pnl.attr('id');

			_$btn.attr('aria-controls', id_pnl)[_attr]('tabindex', -1)[_class]('selected');

			if (unres === false) {
				_$pnl.attr('aria-labelledby', id_btn)[_class]('selected');
			} else {
				is_current ? $pnl.attr('aria-labelledby', id_btn).addClass('selected') : '';
			}

			is_current ? 
				_$btn.attr('aria-selected', true).addClass('selected'):
				_$btn.attr('aria-selected', false).removeClass('selected');
			
			ps_l.push(Math.ceil(_$btn.position().left));

			i === 0 ? _$btn.attr('tab-first', true) : '';
			i === len - 1 ? _$btn.attr('tab-last', true) : ''
		}

		callback ? callback(opt) : '';

		$btn.data('psl', ps_l).data('len', len);
		win[global].uiScroll({ 
			value: ps_l[current], 
			target: $btn.parent(), 
			speed: 0, 
			ps: 'left' 
		});

		//event
		$btn
			.off('click.uitab keydown.uitab')
			.on({
				'click.uitab': evtClick,
				'keydown.uitab': evtKeys
			});

		function evtClick() {
			win[global].uiTabAct({ id: id, current: $(this).index() }); 
		}
		function evtKeys(e) {
			var $this = $(this),
				n = $this.index(),
				m = Number($this.data('len'));

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				!$this.attr('tab-first') ? 
				win[global].uiTabAct({ id: id, current: n - 1 }): 
				win[global].uiTabAct({ id: id, current: m - 1 });
			}
			function downRightKey(e) {
				e.preventDefault();
				!$this.attr('tab-last') ? 
				win[global].uiTabAct({ id: id, current: n + 1 }): 
				win[global].uiTabAct({ id: id, current: 0 });
			}
			function endKey(e) {
				e.preventDefault();
				win[global].uiTabAct({ id: id, current: m - 1 });
			}
			function homeKey(e) {
				e.preventDefault();
				win[global].uiTabAct({ id: id, current: 0 });
			}
		}
	}
	function createUiTabAct(opt) {
		var id = opt.id,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			ps_l = $btn.data('psl'),
			opt = $.extend(true, {}, $tab.data('opt'), opt),
			current = isNaN(opt.current) ? 0 : opt.current,
			unres = opt.unres,
			callback = opt.callback;

		$btn
			.attr('aria-selected', false).attr('tabindex', -1).removeClass('selected')
			.eq(current).attr('aria-selected', true).removeAttr('tabindex').addClass('selected').focus();
		
		win[global].uiScroll({ 
			value: ps_l[current], 
			target: $btns, 
			speed: 200, 
			ps: 'left' 
		});
		if (unres === false) {
			$pnl.removeClass('selected').eq(current).addClass('selected');
		}

		!!callback ? callback(opt) : '';
	}

	win[global] = uiNameSpace(namespace, {
		uiCodinglist: function (opt) {
			return createUiCodinglist(opt);
		}
	});
	function createUiCodinglist(opt){
		var dataExecel;
		
		win[global].uiAjax({ url: opt.url, page:false, callback: callback });
		function callback(v){
			dataExecel = v;
			
			var len = dataExecel.list.length,
				i = 0,
				state, date, end, pub, id, idm, pop, modal, tab, memo, overl, dev,
				d1, d2, d3, d4, d5, d6, d7, d8, 
				r1, r2, r3, r4,
				d1_, d2_, d3_, d4_, d5_, d6_, d7_, d8_,
				c1, c2, c3, c4, c5, c6, c7, c8, 
				endsum = 0, delsum = 0, tstsum = 0, ingsum = 0, watsum = 0, chksum = 0, num = -1,
				ctg_state = [],
				ctg_pub = [],
				ctg_dev = [],
				ctg_date = [],
				ctg_end = [],
				ctg_mdate = [],
				ctg_menu = [],
				ctg_dev = [],
				cls2 = '',
				cls = '',
				root = '',
				depth = '',
				table = '';

			for (i = 0; i < len; i++) {
				state = dataExecel.list[i].state || ''; 		//진행상태
				date = dataExecel.list[i].date || '';			//예정일
				end = dataExecel.list[i].end || '';				//종료일
				pub = dataExecel.list[i].pub || '';				//퍼블리셔 담당자
				dev = dataExecel.list[i].dev || '';				//개발 담당자
				id = dataExecel.list[i].id || '';				//화면아이디
				idm = dataExecel.list[i].idm || '';				//화면아이디 (모바일)
				pop = dataExecel.list[i].pop || '';				//새창
				modal = dataExecel.list[i].modal || '';			//레이어팝업
				tab = dataExecel.list[i].tab || ''				//tab
				memo = dataExecel.list[i].memo || '';			//전달내용
				overl = dataExecel.list[i].overlab || '';		//중복페이지
				root = dataExecel.list[i].root || '';			//root		
				d1 = dataExecel.list[i].d1 || '';				//depth1
				d2 = dataExecel.list[i].d2 || '';				//depth2
				d3 = dataExecel.list[i].d3 || '';				//depth3
				d4 = dataExecel.list[i].d4 || '';				//depth4
				d5 = dataExecel.list[i].d5 || '';				//depth5
				d6 = dataExecel.list[i].d6 || '';				//depth6
				d7 = dataExecel.list[i].d7 || '';				//depth7
				d8 = dataExecel.list[i].d8 || '';				//depth8
				r1 = dataExecel.list[i].r1 || '';				//경로1
				r2 = dataExecel.list[i].r2 || '';				//경로2
				r3 = dataExecel.list[i].r3 || '';				//경로3
				r4 = dataExecel.list[i].r4 || '';				//경로4
				
				//roots = dataExecel.list[i].root || '';			//경로4

				//경로 합치기
				// root += '/' + r1;
				// (dataExecel.list[i].r2 !== undefined && dataExecel.list[i].r2 !== '') ? root += '/' + r2 : '';
				// (dataExecel.list[i].r3 !== undefined && dataExecel.list[i].r3 !== '') ? root += '/' + r3 : '';
				// (dataExecel.list[i].r4 !== undefined && dataExecel.list[i].r4 !== '') ? root += '/' + r4 : '';
				
				//빈값에 해당 경로 depth 넣기
				(d1 !== '') ? d1_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d1 : d1 = d1_;
				
				(dataExecel.list[i].d1 === '') ? 
				(d2 !== '') ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d2 : d2 = d2_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d2) ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d2 : d2_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '') ? 
				(d3 !== '') ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d3 : d3 = d3_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d3) ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d3 : d3_ = '';
				
				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '') ? 
				(d4 !== '') ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d4 : d4 = d4_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d4) ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d4 : d4_ = '';
						
				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '') ? 
				(d4 !== '') ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d5 : d5 = d5_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d5) ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d5 : d5_ = '';
				
				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '') ? 
				(d4 !== '') ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d6 : d6 = d6_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d6) ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d6 : d6_ = '';
				
				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '' && dataExecel.list[i].d6 === '') ? 
				(d4 !== '') ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d7 : d7 = d7_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d7) ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d7 : d7_ = '';
				
				!!dataExecel.list[i].d1 ? d1 = dataExecel.list[i].d1 : '';
				!!dataExecel.list[i].d2 ? d2 = dataExecel.list[i].d2 : '';
				!!dataExecel.list[i].d3 ? d3 = dataExecel.list[i].d3 : '';
				!!dataExecel.list[i].d4 ? d4 = dataExecel.list[i].d4 : '';
				!!dataExecel.list[i].d5 ? d5 = dataExecel.list[i].d5 : '';
				!!dataExecel.list[i].d6 ? d6 = dataExecel.list[i].d6 : '';
				!!dataExecel.list[i].d7 ? d7 = dataExecel.list[i].d7 : '';
				!!dataExecel.list[i].d8 ? d8 = dataExecel.list[i].d8 : '';
				
				delsum = (state === "제외") ? delsum + 1 : delsum ; //제외 및 삭제됨
				watsum = (state === "대기") ? watsum + 1 : watsum ; //작업전
				ingsum = (state === "진행") ? ingsum + 1 : ingsum ; //작업중
				chksum = (state === "체크") ? chksum + 1 : chksum ; //기획검수(내부)
				tstsum = (state === "검수") ? tstsum + 1 : tstsum ;	//현업검수(외부)
				endsum = (state === "완료") ? endsum + 1 : endsum ;	//개발전달
				
				var x = (i === 0) ? 0 : i -1,
					z1 = dataExecel.list[i].d1 !== dataExecel.list[x].d1;

				//클래스 생성
				//c1 = (dataExecel.list[i].d1 !== '') ? ' c1' : '';
				c1 = (dataExecel.list[i].d1 !== '') ? ' c1' : '';
				c2 = (dataExecel.list[i].d2 !== '') ? ' c2' : '';
				c3 = (dataExecel.list[i].d3 !== '') ? ' c3' : '';
				c4 = (dataExecel.list[i].d4 !== '') ? ' c4' : '';
				c5 = (dataExecel.list[i].d5 !== '') ? ' c5' : '';
				c6 = (dataExecel.list[i].d6 !== '') ? ' c6' : '';
				c7 = (dataExecel.list[i].d7 !== '') ? ' c7' : '';
				c8 = (dataExecel.list[i].d8 !== '') ? ' c8' : '';
				
				cls2 = state === '체크' ? 'chk' : state === '진행' ? 'ing' : state === '완료' ? 'end' : state === '검수' ? 'tst' : state === '제외' ? 'del' : state === '약관' ? 'trm' : '';
				cls = cls2 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;
				
				//배열생성
				ctg_state.push(dataExecel.list[i].state); 
				ctg_pub.push(dataExecel.list[i].pub); 
				ctg_dev.push(dataExecel.list[i].dev);
				state !== '제외' ? ctg_date.push(dataExecel.list[i].date) : '';
				ctg_end.push(dataExecel.list[i].end); 
				ctg_menu.push(dataExecel.list[i].d1);
				
				var imgroot = $.browser.mobile ? "m" : "d";

				if (state !== '제외' && i=== 0) {
					table += '<table>';
					table += '<caption>코딩리스트</caption>';
					table += '<colgroup>';
					table += '<col class="col1">';
					table += '<col class="col2">';
					table += '<col class="col3">';
					table += '<col class="col4">';
					table += '<col class="col4">';
					//table += '<col class="col6">';
					//table += '<col class="col7">';
					table += '<col class="col6">';
					table += '<col class="col6">';
					table += '<col class="col6">';
					table += '<col class="col4">';
					table += '</colgroup>';
					table += '<colgroup>';
					(dataExecel.list[i].d1 !== undefined) ? table += '<col class="col8 n1">' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<col class="col8 n2">' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<col class="col8 n3">' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<col class="col8 n4">' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<col class="col8 n5">' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<col class="col8 n6">' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<col class="col8 n7">' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<col class="col8 n8">' : '';
					table += '</colgroup>';
					table += '<col class="col9">';
					table += '<thead>';
					table += '<th scope="col">'+ state +'</th>';
					table += '<th scope="col">'+ date +'</th>';
					table += '<th scope="col">'+ end +'</th>';
					table += '<th scope="col">'+ pub +'</th>';
					table += '<th scope="col">'+ dev +'</th>';
					//table += '<th scope="col">IMG</th>';
					table += '<th scope="col" class="txt-c">'+ pop +'</th>';
					table += '<th scope="col" class="txt-c">'+ modal +'</th>';
					table += '<th scope="col" class="txt-c">'+ tab +'</th>';
					table += '<th scope="col">'+ id +'</th>';
					//table += '<th scope="col">'+ root +'</th>';
					(dataExecel.list[i].d1 !== undefined) ? table += '<th scope="col">'+ d1 +'</th>' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<th scope="col">'+ d2 +'</th>' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<th scope="col">'+ d3 +'</th>' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<th scope="col">'+ d4 +'</th>' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<th scope="col">'+ d5 +'</th>' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<th scope="col">'+ d6 +'</th>' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<th scope="col">'+ d7 +'</th>' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<th scope="col">'+ d8 +'</th>' : '';
					table += '<th scope="col">'+ memo +'</th>';
					table += '</thead>';
					table += '</tbody>';
				}
				else if (state !== '제외') {
					table += '<tr class="'+ cls +'">';
					table += '<td class="state"><span>' + state + '</span></td>';
					table += '<td class="date"><span>' + date + '</span></td>';
					table += '<td class="endd"><span>' + end + '</span></td>';
					table += '<td class="name pub"><span>' + pub + '</span></td>';
					table += '<td class="name pub"><span>' + dev + '</span></td>';
					/*
					if (!!id) {
						table += '<td class="img"><span><a href="/resources/data/design/'+ imgroot + '/'+ id +'.png" target="design"><img src="/resources/data/design/img.png" alt=""></a></span></td>';
					} else {
						table += '<td class="img"><td>';
					}
					*/

					var popIs = !!pop ? 'P' : '',
						modalIs = !!modal ? 'M' : '',
						tabIs = !!tab ? 'T' : '',
						target = popIs === 'P' ? '_blank': 'coding',
						popcls = popIs === 'P' ? 'ui-winpop': '';
					
					table += '<td class="txt-c"><span>' + popIs + '</span></td>';
					table += '<td class="txt-c"><span>' + modalIs + '</span></td>';
					table += '<td class="txt-c"><span>' + tabIs + '</span></td>';

					if (!modalIs) {
						table += (id !== '') ? 
						(overl !== '') ?
							'<td class="id ico_pg"><span><a href="'+ root +''+ overl +'.html" target="'+ target +'" class="'+ popcls +'">' + overl + '</a></span><span class="overl">'+ id + '</span></td>' :
							'<td class="id ico_pg"><span><a href="'+ root +''+ id +'.html" target="'+ target +'" class="'+ popcls +'">' + id + '</a></span></td>' :
							'<td class="id "><span></span></td>';
					} else {
						table += (id !== '') ? 
						(overl !== '') ?
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_'+ overl + '\', link:\'' + root +''+ overl + '.html\'});">' + overl + '</button></span><span class="overl">'+ id + '</span></td>' :
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_'+ id + '\', link:\'' + root +''+ id + '.html\'});">' + id + '</button></span></td>' :
							'<td class="id "><span></span></td>';
					}

					(dataExecel.list[i].d1 !== undefined) ? table += '<td class="d d1"><span>' + d1 + '</span></td>' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<td class="d d2"><span>' + d2 + '</span></td>' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<td class="d d3"><span>' + d3 + '</span></td>' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<td class="d d4"><span>' + d4 + '</span></td>' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<td class="d d5"><span>' + d5 + '</span></td>' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<td class="d d6"><span>' + d6 + '</span></td>' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<td class="d d7"><span>' + d7 + '</span></td>' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<td class="d d8"><span>' + d8 + '</span></td>' : '';
					
					(dataExecel.list[i].memo === '') ? table += '<td class="memo none"><span>' + memo + '</span></td>' : table += '<td class="memo"><span>' + memo + '</span></td>';
					table += '</tr>';
					(i === len - 1) ? table += '</tbody>' : '';
					(i === len - 1) ? table += '</table>' : '';
				}
				root = '';
			}
			$('#' + opt.id).html(table);
			table = '';

			// 통계
			var info = ''
			info += '<ul class="ui-codinglist-info">';
			info += '<li>진행율(완료+검수) : <span class="n_all">0</span> / <span class="total">0</span> (<span class="per0">0</span>%)</li>';
			info += '<li>완료 : <span class="n_end">0</span> (<span class="per1">0</span>%)</li>';
			info += '<li>검수 : <span class="n_tst">0</span> (<span class="per2">0</span>%)</li>';
			info += '<li>체크 : <span class="n_chk">0</span> (<span class="per2">0</span>%)</li>';
			info += '<li>진행 : <span class="n_ing">0</span> (<span class="per3">0</span>%)</li>';
			info += '<li>대기 : <span class="n_wat">0</span> (<span class="per4">0</span>%)</li>';
			info += '</ul>';
			$('#' + opt.id).prepend(info);

			if (!$('.ui-codinglist-info .total').data('data')) {
				$('.ui-codinglist-info .total').data('data', true).text(len - delsum - 1);
				$('.ui-codinglist-info .n_all').text(endsum + tstsum + chksum);
				$('.ui-codinglist-info .per0').text(((endsum + tstsum + chksum) / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_end').text(endsum);
				$('.ui-codinglist-info .per1').text((endsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_tst').text(tstsum);
				$('.ui-codinglist-info .per2').text((tstsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_ing').text(ingsum);
				$('.ui-codinglist-info .per3').text((ingsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_wat').text(watsum);
				$('.ui-codinglist-info .per4').text((watsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_chk').text(chksum);
				$('.ui-codinglist-info .per5').text((chksum / (len - delsum - 1) * 100).toFixed(0));
			}
			
			var sel = '';
			sel += '<div class="ui-codinglist-sel">';
			sel += '<button type="button" class="btn-base"><span>전체</span></button>';
			sel += '<select id="uiCLstate" data-ctg="state">';
			sel += '<option value="0">상태선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLpub" data-ctg="pub">';
			sel += '<option value="0">퍼블선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLdev" data-ctg="dev">';
			sel += '<option value="0">개발선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLDate" data-ctg="date">';
			sel += '<option value="0">일정선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLdepth" data-ctg="d1">';
			sel += '<option value="0">메뉴선택</option>';
			sel += '</select>';
			sel += '<a href="/resources/data/codinglist.xlsx" class="btn-base"><span>Excel Download</span></a>';
			sel += '</div>';
			$('#' + opt.id).prepend(sel);

			selectoption('uiCLstate', ctg_state);
			selectoption('uiCLpub', ctg_pub);
			selectoption('uiCLDate', ctg_date, true);
			selectoption('uiCLdepth', ctg_menu);
			selectoption('uiCLdev', ctg_dev);
			selectAct();
			
			function selectoption(id, optarray, v) {
				var $sel = $('#' + id),
					nn = 1,
					nnn = 1;
				
				if(!$sel.data('data')) {
					var optionArray = [], 
						optionSum = [],
						j = 0, 
						optionHtml = '';
					v ? optarray.push('일정') : '';
					optarray.splice(0,1);

					// 숫자 .sort(function(a,b){return a-b}) , 문자 sort()
					optionArray = optarray.slice().sort().reduce(function(a,b){
						if (a.slice(-1)[0] !== b && b !== '') {
							a.push(b);
							v ? optionSum.push(nn) : '';
							nn = 1;
						}  else {
							nn = nn + 1;
						}
						return a;
					},[]);
					
					var alen = optionArray.length;
					for (j; j < alen; j++) {
						if (v) {
							if (j < alen - 1) {
								optionHtml += '<option value="'+ optionArray[j] +'">'+ optionArray[j] +' [' + optionSum[j + 1] + ']</option>';
							}
						} else {
							optionHtml += '<option value="'+ optionArray[j] +'">'+ optionArray[j] +'</option>';
						}
					}
					$sel.data('data',true).append(optionHtml);
				}
			}
			
			function selectAct(){
				$('.ui-codinglist-sel select').off('change.cdlist').on('change.cdlist', function(){
					var $this = $(this),
						v = $this.val(),
						c = $this.data('ctg'),
						$sel = $('#' + opt.id + ' .' + c);

					if (v === '0') {
						$sel.closest('tr').removeClass('hidden');
					} else {
						$this.siblings().find('option:eq(0)').prop('selected', true);
						$sel.each(function(i){
							v === 'all' ? $sel.closest('tr').removeClass('hidden') :
							v !== $sel.find('span').eq(i).text() ? 
								$(this).closest('tr').addClass('hidden') : $(this).closest('tr').removeClass('hidden');
						});
					}
				});
			}

			$('.ui-codinglist-sel button').off('click.cdlist').on('click.cdlist', function(e){
				$('#' + opt.id + ' tr').removeClass('hidden');
				$('.ui-codinglist-sel select').find('option:eq(0)').prop('selected', true);
			});
		}
	}


	win[global] = uiNameSpace(namespace, {
		uiFileUpload: function (opt) {
			return createUiFileUpload(opt);
		}
	});
	function createUiFileUpload(opt){
		if (opt === undefined) {
			return false;
		}
		
		var base = {};

		base.id = $('#' + opt.id);
		base.multi = opt.multi === undefined ? false : opt.multi;
		base.accept = opt.accept === undefined ? '' : 'accept="' + opt.accept + '"' ;
		base.callback = opt.callback === undefined ? false : opt.callback;
		base.n = 0;
		base.txthtml = '<input type="text" class="ui-file-txt inp-base" readonly="readonly" title="첨부파일명">';
		base.delhtml = '<button type="button" class="ui-file-del btn-del">첨부파일 삭제</button>';
		base.filehtml = '<input type="file" value="" ' + base.accept + '" class="ui-file-inp" aria-hidden="true" tabindex="-1" title="첨부파일 불러오기">';
		base.id.data('files', opt.multi);
		base.wraphtml = '<div class="ui-file-wrap"></div>';
		base.btn = base.id.find('.ui-file-btn');
		base.id.append(base.wraphtml);
		base.wrap = base.id.find('.ui-file-wrap');
		base.wrap.append(base.filehtml);
		base.file = base.wrap.find('.ui-file-inp');
		base.timer;
		
		//event
		$(doc).off('change.'+ opt.id).on('change.' + opt.id, '#' + opt.id + ' .ui-file-inp', function(){
			fileChange(base);
		});
		$(doc).off('click.fileuploadDel').on('click.fileuploadDel', '.ui-file-del', function(){
			fileDel(this);
		});
		base.btn.off('click.'+ opt.id).on('click.'+ opt.id, function(){
			upload(base);
		}); 
		
		//fn
		function upload(base){
			if (!base.multi) {
				base.file.trigger('click');
			} else {
				base.wrap = base.id.find('.ui-file-wrap').eq(-1);
				base.file = base.wrap.find('.ui-file-inp');
				base.file.trigger('click');
			}
		}
		function fileDel(v){
			var $del = $(v),
				$file = $del.closest('.ui-file'),
				len = $file.find('.ui-file-wrap').length,
				idx = $del.closest('.ui-file-wrap').index() - 1,
				$txt = $file.find('.ui-file-txt'),
				$wrap = $del.closest('.ui-file-wrap'),
				file = $txt.val();
	
			if (!$file.data('files')) {
				if($wrap.length > 0) {
					$wrap.find('.ui-file-inp').val('');
					$txt.remove();
					$del.remove();
				} 
				$file.data('single', false);
			} else {
				(len > 1) ? $file.find('.ui-file-wrap').eq(idx).remove() : '';
			}
			//base.callback({ id:$file.attr('id'), upload:false, file:file });
		}
		function fileChange(base){
			base.v = base.file.val();
			base.v =  base.v.split("\\");
			base.n =  base.v.length;
			base.n = ( base.n === 0) ? 0 :  base.n - 1; 

			(!base.multi && !base.id.data('single')) ? act('single') : '';
			if (!!base.multi){
				!base.id.data('multi') ? act('multi') : act('add');
				
				clearTimeout(base.timer);
				base.timer = setTimeout(function(){
					base.wraphtml = '<div class="ui-file-wrap"></div>';
					base.id.append(base.wraphtml);
					base.wrap = base.id.find('.ui-file-wrap').eq(-1);
					base.wrap.append(base.filehtml);
					base.file = base.wrap.find('.ui-file-inp');
				},35);
			} 
			if (!!base.v && !base.file.val()) {
				base.txt.remove();
				base.del.remove();
				base.id.data('single', false);
			} 
			function act(v){
				v === 'single' ? base.id.data('single', true) : '';
				v === 'multi' ? base.id.data('multi', true) : '';
				v === 'add' ? base.wrap = base.id.find('.ui-file-wrap').eq(-1) : '';

				base.wrap.append(base.txthtml);
				base.wrap.append(base.delhtml);
				base.txt = base.wrap.find('.ui-file-txt');
				base.del = base.wrap.find('.ui-file-del');

				//base.callback({ id:$file.attr('id'), upload:false, file:file });
			}
			base.txt.val(base.v[base.n]);
		}
	}


	
	
	
	win[global] = uiNameSpace(namespace, {
		uiRollTxt: function (opt) {
			return createUiRollTxt(opt);
		},
		uiRollTxtAct: function (opt) {
			return createUiRollTxtAct(opt);
		}
	});
	win[global].uiRollTxt.option = {
		autoplay: true,
		speed: 2000
	}
	win[global].uiRollTxt.timer = '';
	function createUiRollTxt(opt){
		var opt = $.extend(true, {}, win[global].uiRollTxt.option, opt),
			autoplay = opt.autoplay,
			speed = opt.speed,
			$roll = $('#' + opt.id),
			$roll_wrap = $roll.find('.ui-rolltxt-wrap'),
			$roll_item = $roll_wrap.find('.ui-rolltxt-item'),
			len = $roll_item.length,
			play_txt = autoplay ? '정지' : '진행',
			play_class = autoplay ? 'stop' : 'play',
			html_btn = '';

		if (len > 1) {
			var item_clone = $roll_item.eq(0).clone();
			$roll_wrap.append(item_clone);
			html_btn += '<button type="button" class="ui-rolltxt-btn '+ play_class +'" role-label="'+ play_txt +'" data-play="'+ autoplay +'">';
			html_btn += '</button">';

			$roll.append(html_btn);
			html_btn = '';

			win[global].uiRollTxtAct({ id:opt.id, play: true, speed: speed });
		}
	}
	function createUiRollTxtAct(opt){
		var $roll = $('#' + opt.id),
			$roll_wrap = $roll.find('.ui-rolltxt-wrap'),
			$roll_item = $roll_wrap.find('.ui-rolltxt-item'),
			$roll_btn = $roll.find('.ui-rolltxt-btn'),
			len = $roll_item.length,
			h = $roll_item.outerHeight(),
			play = opt.play,
			speed = opt.speed,
			n = 0,
			timer;

		if (play) {
			clearTimeout(timer);
			rollPlay();
		} else {
			clearTimeout(timer);
		}

		function rollPlay(){
			timer = setTimeout(function(){
				n = n + 1;
				if (n >= len) {
					n = 1;
					rollMove(n, true);
				} else {
					rollMove(n);
				}
			},speed);
		}
		function rollMove(m, v){
			v ? $roll_wrap.css('top', 0) : '';
			$roll_wrap.stop().animate({
				top: '-' + h * m + 'px'
			}, 300, function(){
				rollPlay();
			});
		}

		$roll_item.on('mouseover', function(){
			clearTimeout(timer);
		}).on('mouseleave', function(){
			clearTimeout(timer);
			!!$(this).closest('.ui-rolltxt.pause').length ? '' :
			rollPlay();
		});
		$roll_btn.on('click',function(){
			console.log($(this).data('play'))
			if ($(this).data('play')) {
				$(this).data('play',false).removeClass('stop').addClass('play').closest('.ui-rolltxt').addClass('pause');
				clearTimeout(timer);
			} else {
				$(this).data('play',true).removeClass('play').addClass('stop').closest('.ui-rolltxt').removeClass('pause');;
				clearTimeout(timer);
				rollPlay();
			}
		});
	}

})(jQuery, window, document);	