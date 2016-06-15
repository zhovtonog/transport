$(document).ready(function() {
	$('.js-Request').validationEngine();

	if(location.pathname == "/support/thankyou"){
		
		$('.popup_request_a_Call_form').css('display','none');
		$('.popup_request_a_Call_great').css('display','block');
		$('.popup_black_wrap').show();
		setTimeout( function(){
			location.pathname = "/support/";
		} ,3000);
	}
	if(location.hash.length>0){
		var email = Base64.decode(location.hash.split('#')[1]);
		var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(pattern.test(email)){
			$('.js-email').val(Base64.decode(location.hash.split('#')[1])).attr('readonly','readonly'); 
			location.hash = '';
		}
	}
	$('.js-popupOpen').unbind().on('click',function(event){
		$('.popup_black_wrap').show();
		if (event.preventDefault){ 
			event.preventDefault();
		}
		else{
			event.returnValue = false;
		}		
	});
	$('.js-close-black-popup').unbind().on('click',function(event){

		$('.popup_black_wrap').hide();
		if (event.preventDefault){ 
			event.preventDefault();
		}
		else{
			event.returnValue = false;
		}
	});
	$('.js-submit').unbind().on('click',function(){
		$('#id_Landing_Page_c').attr('value',location.href);	
		if($('.js-Request').validationEngine('validate')){
			$('.js-Request').submit();
		}
		// var data  = $('.js-Request').serialize();
		// $.ajax({
			// url : $('.URL_FOR_SUBMIT').attr('value'),
			// data:data,
			// type : "POST",
			// async : true,
			// success : function (data) {
				// location.href = $('.REDIRECTURL').attr('value');
			 // },
			 // error : function (data) {
				// console.log(data);
			 // }
		// });	
		
	});
	

	 $("#contact-form-phone").keyup(function(event) {
			var sInput = event.target || event.srcElement;
			if (sInput.tagName != 'INPUT')
				return;
			var _val = sInput.value;
			var sAviable = '0123456789';
			var sAviableAll = '0123456789-()+ext\ ';
			var sResult = '';
			var c;
			var len = _val.length;
			for (var i = 0; i < len; i++) 
			{
				c = '';
				c = _val.substr(i, 1);
				if (sAviableAll.indexOf(c) >= 0 && i < 21) {
					sResult = sResult + c;
				}
			}
			var arrPhone = new Array();
			for (i = 0; i < len; i++) {
				c = '';
				c = _val.substr(i, 1);
				if (sAviable.indexOf(c) >= 0 && i < 21) {
					arrPhone.push(c);
				}
			}
			if (10 <= arrPhone.length) {
				sResult = '(' + arrPhone[0] + arrPhone[1] + arrPhone[2] + ') ' + arrPhone[3] + arrPhone[4] + arrPhone[5] + '-' + arrPhone[6] + arrPhone[7] + arrPhone[8] + arrPhone[9];
			}
			if (10 < arrPhone.length) {
				sResult = sResult + ' x';
				for (i = 10; i < arrPhone.length; i++) {
					sResult = sResult + arrPhone[i];
				}
			}
			sResult = sResult.replace(' ', '');
			sInput.value = sResult;
		}
		);
});
var Base64 = {
   _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
   //????? ??? ????????? ? base64 ?? javascript
  encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0
    input = Base64._utf8_encode(input);
       while (i < input.length) {
       chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
       enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
       if( isNaN(chr2) ) {
         enc3 = enc4 = 64;
      }else if( isNaN(chr3) ){
        enc4 = 64;
      }
       output = output +
      this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
      this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
     }
    return output;
  },
 
   //????? ??? ???????????? ?? base64
  decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
     while (i < input.length) {
       enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
       chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
       output = output + String.fromCharCode(chr1);
       if( enc3 != 64 ){
        output = output + String.fromCharCode(chr2);
      }
      if( enc4 != 64 ) {
        output = output + String.fromCharCode(chr3);
      }
   }
   output = Base64._utf8_decode(output);
     return output;
   },
   // ????? ??? ????????? ? utf8
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
       if( c < 128 ){
        utftext += String.fromCharCode(c);
      }else if( (c > 127) && (c < 2048) ){
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
     }
    return utftext;
 
  },
 
  //????? ??? ???????????? ?? urf8
  _utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while( i < utftext.length ){
      c = utftext.charCodeAt(i);
       if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }else if( (c > 191) && (c < 224) ) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
     }
     return string;
  }
 }

