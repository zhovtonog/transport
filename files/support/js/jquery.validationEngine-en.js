(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
	
				"phoneLight" : {
                    "regex": /^\d{10}$/,
					"alertText": "10 digit phone number required"
                },
                "onlyLetter": {
					"regex": /^[a-zA-Z\ \']+$/,
					"alertText": "* Letters only"
				},
				"domainAnyLvl":{
					"regex": /^[a-z\d_\.-]+\.[a-z]{2,6}$/,
					"alertText": "* Wrong domain format"
				},
		
				"letterNumberNonInternational": {
					"regex": /^[(\r\n^a-zA-Z0-9\ \'^\!^\@^\~^\#^\$^\%^\^^\&^\*^\(^\)^\-^\_^\`^\+^\=^\\^\|^\?^\>^\<^(.)^\,^\"^\.^\;^\:^\-^.^\/^\[^\])]+$/,
					"alertText": "* No international characters allowed"
				},
				"phoneCA" : {
                    "regex": /^((\+1\.)?\d{10})|(\(\d{3}\)[ -]?\d{3}[ -]?\d{4}\s*)$/,
					"alertText": "* Invalid phone number"
                },
				"numbersAndLetter" : {
                    "regex": /[0-9][^0-9]|[^0-9][0-9]/,
                    "alertText": "* Alphabetical letters and numbers are required"
                },
				"onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z\s\']+$/,
                    "alertText": "* No special characters allowed"
                },
				"domain": {
                    "regex": /^[a-zA-Z-0-9]+\.[a-zA-Z]{2,4}$/,
                    "alertText": "Special characters are not allowed in the domain name"
                },
				"domainSmallOnly":
				{
					"regex": /^[-a-z0-9][^.]\.?/i,
					"alertText": "Domain name is too short."
				},
				"domainLargeOnly":
				{
					"regex": /^.{0,63}\./,
					"alertText": "Domain name is too long."
				},
				"domainOnlyIncorrect":
				{
					"regex": /^[a-z0-9]+[-a-z0-9]*[a-z0-9]+\./i,
					"alertText": "Domain name is invalid"
				},
				"tldOnly":
				{
					"regex": /\.[a-zA-Z]{2,4}$/,
					"alertText": "The extension you've entered is not supported"
				},
				"tldOnlyRegister":
				{
					"regex": /\.[com|net|org|info|biz|bz|ca|cc|co|mobi|tv|us|ws]{2,4}$/,
					"alertText": "The Tld you've entered is not supported."
				},
				"domainNoTld": {
                    "regex": /^[a-zA-Z-0-9]+$/,
                    "alertText": "Special characters are not allowed in the domain name"
                },
				"onlyNumberX":{
                    "regex":/^[0-9\ x]+$/,
                    "alertText":"* Numbers only"
                },
				"onlyNumber":{
                    "regex":/^[0-9\ ]+$/,
                    "alertText":"* Numbers only"
                },
				"onlyNumberLetterSp": {
                    "regex": /^[0-9a-zA-Z\ \'\-\.,&\/\\]+$/,
                    "alertText": "* Letters, numbers only"
                },
				"CityValidator": {
                    "regex": /^[0-9a-zA-Z\ \'\.\,]+$/,
                    "alertText": "* No special characters allowed"
                },
                "required": {
                    "regex": "none",
                    "alertText": "* This field is required",
                    "alertTextCheckboxMultiple": "* Please select an option",
                    "alertTextCheckboxe": "* This checkbox is required",
                    "alertTextDateRange": "* Both date range fields are required"
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Range"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Time Range"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* Minimum ",
                    "alertText2": " characters required"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " characters allowed"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* You must fill one of the following fields"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* Minimum value is "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* Maximum value is "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* Date prior to "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* Date past "
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " options allowed"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* Please select ",
                    "alertText2": " options"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* Fields do not match"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* Invalid credit card number"
                },
                "phone": {
    
                    "regex": /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,
                    "alertText": "* Invalid phone number"
                },
                "email": {

                	"regex": /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                	"alertText": "* Invalid email address"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* Not a valid integer"
                },
                "number": {
                 
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "* Invalid floating decimal number"
                },
                "date": {                    
      
			"func": function (field) {
					var pattern = new RegExp(/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/);
					var match = pattern.exec(field.val());
					if (match == null)
					   return false;
	
					var year = match[1];
					var month = match[2]*1;
					var day = match[3]*1;					
					var date = new Date(year, month - 1, day);
	
					return (date.getFullYear() == year && date.getMonth() == (month - 1) && date.getDate() == day);
				},                		
			 "alertText": "* Invalid date, must be in YYYY-MM-DD format"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* Invalid IP address"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* Invalid URL"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* Numbers only"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* Letters only"
                },

                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
           
                    "extraData": "name=eric",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",

                    "extraData": "name=eric",
                 
                    "alertTextOk": "* This username is available",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCall": {
          
                    "url": "ajaxValidateFieldName",
      
                    "alertText": "* This name is already taken",
        
                    "alertTextOk": "* This name is available",
      
                    "alertTextLoad": "* Validating, please wait"
                },
				 "ajaxNameCallPhp": {
	        
	                    "url": "phpajax/ajaxValidateFieldName.php",
	        
	                    "alertText": "* This name is already taken",
	      
	                    "alertTextLoad": "* Validating, please wait"
	                },
                "validate2fields": {
                    "alertText": "* Please input HELLO"
                },

                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* Invalid Date"
                },
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* Invalid Date or Date Format",
                    "alertText2": "Expected Format: ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM or ", 
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            },
				"validateZip": {
					"alertText": "* Not valid for "
				}
            };
            
        }
    };

    $.validationEngineLanguage.newLang();
    
})($);

function expDate(field, rules, i, options) {

 var expYear  = $("select.js-expirationDateYer").val();
 var expMonth = $("select.js-expirationDateMonth").val() * 1;
expMonth++;
$("div.js-expirationDateYer").val(expYear);
$("div.js-expirationDateMonth").val(expMonth);
 expMonth = expMonth < 10? '0'+expMonth:expMonth;
 var exp_date = new Date(expYear,expMonth);
message = [];
 if(exp_date.getTime() < new Date().getTime())
 {
	message.push('Not a valid Expiration Date');
 }
return message.join('<br>') || undefined;
  
}
function checkDomainWithTld (field, rules, i, options) {
	if (field.val().length == 0) {
		return;
	}
	var message = [];
	var text = field.val().toLowerCase();
	var domain = text.split('.');
    var tlds = Config.tlds;
	if(domain.length != 2) {
		message.push('Wrong Domain Name');
	}
	if (domain[0].length < 2) {
		message.push('The domain name is too short');
	}
	if (domain[0].length > 63) {
		message.push('The domain name is too long');
	}
	if (!domain[0].match(/^[A-Za-z0-9]+[-A-Za-z0-9]*[A-Za-z0-9]+$/)) {
		message.push('Special characters are not allowed in the domain name');
	}
	if(domain[1] != undefined && -1 === tlds.indexOf(domain[1])) {
		message.push('The extension you\'ve entered is not supported');
	}
	return message.join('<br>') || undefined;
};
function testCardNumber(input) {
	input = input.val();
	input = input.replace(/[ -/]/g, '');

	var sum = 0;
	var numdigits = input.length;
	var parity = numdigits % 2;
	for(var i=0; i < numdigits; i++) {
		var digit = parseInt(input.charAt(i));
		if(i % 2 == parity) {
			digit *= 2;
		}
		if(digit > 9) {
			digit -= 9;
		}
		sum += digit;
	}
	if ( sum%10 ) {
		return '* Not a valid Card Number';
	}
}
function testCardNumberX(input) {
	input = input.val();
	input = input.replace(/[ -/]/g, '');
	var clientInfo = JSON.parse(localStorage['billingInfo']);
	var real = clientInfo.CardNumber;
	if(input.match(/\*+/) && real) {
		real = real.toString();
		if(input.substring(input.length-4,input.length) != real.substring(real.length-4,real.length)) {
			return '* Not a valid Card Number';
		}
	}
}
function phone(field, rules, i, options) {

	var phone  = $("#phone").val();
	var newPhone = '';
	
	for (var i=0; i < phone.length; i++) {
		if((phone[i].charCodeAt(0) > 47) && (phone[i].charCodeAt(0) <  58)) {
			newPhone += phone[i];
		}
	}
	if(newPhone.length < 10) {
		return '* Invalid phone number';
	}
}

function phoneE164(field, rules, i, options) {
	var phone  = $("#phone").val().toString();
	var country = 'US';//$("#country").val();
	
	if(country === "UK") {
		country = "GB";
	}
	var phoneToformat = formatE164(country, phone);
	
	if(isValidNumber(phone, country)) {
		$("#phone").val(phoneToformat);
	} else {
		return '* Phone number is not valid for this country';
	}
}

function isRealZip(field, rules, i, options) {

	var sCountry =  $('#country').val();

	if (!sCountry) {
		if ('undefined' != typeof(curCountry)) {
			sCountry = curCountry;
		}
		else {
			sCountry = '';
		}
	}


	if ('US' == sCountry) {
		if(!field.val().match(/[0-9]{5}.*/)) {
			return options.allrules.validateZip.alertText + 'United States';
		}
	}

	if ('CA' == sCountry){
		if(!field.val().match(/([A-Za-z][0-9]){3}|([A-Za-z][0-9][A-Za-z]\ [0-9][A-Za-z][0-9])/)) {
			return options.allrules.validateZip.alertText + 'Canada';
		};
	}
} 

function checkDomainNotTld (field, rules, i, options) {
	if (field.val().length == 0) {
		return;
	}
	var message = [];
	var domain = field.val().toLowerCase();
	if(domain.length < 2) {
		message.push('Wrong Domain Name');
	}
	if (domain.length < 2) {
		message.push('The domain name is too short');
	}
	if (domain.length > 63) {
		message.push('The domain name is too long');
	}
	if (!domain.match(/^[A-Za-z0-9]+[-A-Za-z0-9]*[A-Za-z0-9]+$/)) {
		message.push('Special characters are not allowed in the domain name');
	}
	return message.join('<br>') || undefined;
};
function checkDomainWithOrNoTld (field, rules, i, options) {
	if (field.val().length == 0) {
		return;
	}
	
	var tlds = Config.tlds;
	var placeholder = field.attr('placeholder');
	var message = [];
	var text = field.val().toLowerCase();
	var domain = text.split('.');
	if (domain[0].length < 2) {
		message.push('* Minimum 2 characters required');
	} else if (domain[0].length > 63) {
		message.push('* Maximum 63 characters allowed');
	} else if (text.match(/\-$/)){
		message.push('Dash can not be the last');
	} else if (!domain[0].match(/^[A-Za-z0-9]+(\-?[A-Za-z0-9]+)*$/) && text!=placeholder) {
		message.push('Special characters are not allowed in the domain name');
	} else if (text.match(/\.$/) && text != placeholder){
		message.push('Enter tld after dot');
	} 
	setTimeout(function(){
		$('.formError').css('opacity', 'none');
	}, 500);
	return message.join('<br>') || undefined;
};

function salesFormEmail(input){
	if(input.val().length != 0){
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		var match = pattern.exec(input.val());
		if(match == null)
		{
			return "* Invalid email address";
		}
		
	}
}
