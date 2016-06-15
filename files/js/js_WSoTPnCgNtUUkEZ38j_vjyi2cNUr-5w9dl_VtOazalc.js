/**
 * @file
 * Google Analytics Manager javascript functionality.
 */

if(typeof Signup != 'undefined'){
if(!Signup.track) {
  Signup.track = {};
}
Signup.track.globalAnalytics = new function () {
  this.url = 'vr-norest.localhost';
  this.statusTracked=false;
  this.setListener = function () {
    if (typeof Signup.eventManager != 'undefined') {
      //Signup.eventManager.addListener('wizard_step', 'Signup.track.globalAnalytics.sendViewWizardStep', this.sendViewWizardStep);
      Signup.eventManager.addListener('Purchase.Success', 'Signup.track.globalAnalytics.sendTransaction', this.sendTransaction);
      //Signup.eventManager.addListener('customer_login', 'Signup.track.globalAnalytics.trackUserStatus', this.trackUserStatus);
      Signup.eventManager.addListener('SushiFlow.BuildStep', 'Signup.track.globalAnalytics.sendViewFlowStep', this.sendViewFlowStep);
      Signup.eventManager.addListener('Login.Success', 'Signup.track.globalAnalytics.sendEventLogin', this.sendEventLogin);
      Signup.eventManager.addListener('createAccountClick', 'Signup.track.globalAnalytics.sentEventSignUp', this.sendEventData);
      Signup.eventManager.addListener('eventServicesClick', 'Signup.track.globalAnalytics.sentEventServices', this.sendEventData);
      Signup.eventManager.addListener('webDesignExamplesClick', 'Signup.track.globalAnalytics.sentEventServices', this.sendEventData);
    }
  }
  
  this.sendEventData = function(data) {
      if(data) {
          ga('send', 'event', data.category, data.action, data.label + '(' + document.location.pathname + ')');
          ga('newTracker.send', 'event', data.category, data.action, data.label + '(' + document.location.pathname + ')');
      }
  }

  this.sendViewFlowStep = function (stepName) {
    stepName = stepName.split(' ').join('_');
    var wizard_url = window.document.location.pathname.replace('/', '');
    var viewStep = '/' + wizard_url + '_' + stepName.toLowerCase();
    if(window.ga){
      ga('send', 'pageView', {'page':viewStep});
      ga('newTracker.send', 'pageView', {'page':viewStep});
    }
}

  this.sendEventLogin = function (message) {
    if(window.ga){
      ga('send', 'event', 'Login button', 'button click', 'Sign in(' + document.location.pathname+')');
      ga('newTracker.send', 'event', 'Login button', 'button click', 'Sign in(' + document.location.pathname+')');
    }
  }

  this.trackUserStatus=function(param) {
    if(sessionStorage.getItem('userStatus')) return;
    var flag=false;
    if(param && param.status){
      if(!Signup.track.globalAnalytics.statusTracked){
        ga('newTracker.set', 'dimension1', param.status);
        ga('newTracker.send', 'event', 'Checkout', 'button click', 'Sign in - '+param.status +'|'+document.location.host);
        if(param.flag){
          Signup.track.globalAnalytics.statusTracked=param.flag;
        }
        sessionStorage.setItem('userStatus','1');
      }
    }
  }

  this.sendViewWizardStep = function () {
    var wizard_url = window.document.location.pathname.replace('/', '');
    var stepName = '';
    if(('checkout_new' == wizard_url) || ('checkout_express' == wizard_url)) {
      stepName = 'confirmation';
    }
    else {
      stepName = Signup.pageName();
    }
    var viewStep = '/' + wizard_url + '_' + stepName;
    if(window.ga){
      ga('send', 'pageView', {'page':viewStep});
      ga('newTracker.send', 'pageView', {'page':viewStep});
    }
  }

  this.sendTransaction = function (transaction) {
    var purchaseData = Signup.getModel('cart').getPrices();
    ga('require', 'ecommerce', 'ecommerce.js');
    ga('newTracker.require', 'ecommerce');
    var affiliation = '';
    if (typeof Config.web_server != 'undefined') {
      affiliation = Config.web_server.slice(0,1).toUpperCase() + Config.web_server.slice(1);
    }
    else {
      affiliation = 'Deluxe';
    }
    var transactionid = transaction.invoicenumber?transaction.invoicenumber:transaction.transactionid;
    var transaction =
    {
      'id': transactionid, // set to the online transaction ID used in the purchase
      'affiliation': affiliation, // the store where the transaction occurred
      'revenue': purchaseData.total.toFixed(2), // total revenue including shipping and tax in $US
      'shipping': purchaseData.shipping, // shipping cost if any, set to zero, if none
      'tax': purchaseData.tax // total tax in $US, if any
    }
    ga('ecommerce:addTransaction', transaction);
    ga('newTracker.ecommerce:addTransaction', transaction);
    jQuery.each(Signup.track.globalAnalytics.getGAItems(), function ( index, value ) {
      var product =
      {
       'id': transactionid,  // Transaction ID. Required.
       'name': value.name,                           // Product name. Required.
       'sku': value.code,                            // SKU/code.
       'price': value.price,                         // Unit price.
       'quantity': value.quantity                    // Quantity.
      }
      ga('ecommerce:addItem', product);
      ga('newTracker.ecommerce:addItem', product);
    });
    ga('ecommerce:send');
    ga('newTracker.ecommerce:send');
  };
  this.getGAItems = function () {
    var GAitems = {};
    function addGAItem(item) {
      if ( item && item.code && item.name && jQuery.isNumeric(item.price) && jQuery.isNumeric(item.quantity) ) {
        if ( GAitems[item.code] ) {
          if ( GAitems[item.code].price === item.price ) {
            GAitems[item.code].quantity += item.quantity;
          }
          else {
            item.code += "_";
            addGAItem(item);
          }
        }
        else {
          GAitems[item.code] = item;
        }
      }
    };
    var getTitle = function (code) {
      var desc = '';
      jQuery.each(dataConf, function(id, data) {
        if (data.Code == code) {
          desc = data.Name;
          return false;
        }
      });
      return desc;
    };
    jQuery.each( Signup.getModel('cart').buildForBulkBuy(), function(type, products) {
      if (type == "domains") {
        jQuery.each(products, function(product, productData) {
          var tld = productData._code;
          var duration = productData._duration;
          var isFree = productData._isFree;
          var price = productData._price;
          var type = productData._registrationType;
          addGAItem({
            'code': tld + duration + ( isFree ? ' (1 year free)' : '' ),
            'name': type + ' ' + duration + 'yr ' + tld + ( isFree ? ' (1 year free)' : '' ),
            'price': price,
            'quantity': 1
          });
          if (productData._assignServices) {
            jQuery.each(productData._assignServices, function(serviceType, serviceData) {
              var duration = serviceData._duration;
              addGAItem({
                'code': serviceData._code+duration,
                'name': getTitle(serviceData._code) + " " + duration + 'yr',
                'price': serviceData._price,
                'quantity': 1
              });
            });
          }
        });
      }
      else {
        jQuery.each(products, function(product, productData) {
          var duration = productData._duration;
          var price = productData._price;
          addGAItem({
            'code': productData._code+duration,
            'name': getTitle(productData._code),
            'price': price,
            'quantity': 1
          });
        });
      }
  });

  return GAitems;
  };
};
Signup.track.globalAnalytics.setListener();
jQuery(document).ready(function(){
  var page_uri = window.document.location.pathname.replace('/','');
  var element = '';
  var pages = {
    'checkout': 1,
    'checkout_new': 2,
    'checkout_express': 2,
    'small-business/website/deluxe-marketing-suite' : 3
  }

  var buttons = {};

  switch (pages[page_uri]){
    case 1:
      buttons = {
        1: jQuery('#btn_signin')
      };
      break;

    case 2:
      buttons = {
        1: jQuery('#btn_signin_new'),
        2: jQuery('#forgot_password_module'),
      };
      break;

    case 3:
      buttons = {
        3: jQuery('.ice-gray-login-left-col a')
      };
      break;

    default:
      return;
      break;
  }

  jQuery.each(buttons, function(index, btnElement) {
    if (btnElement[0] != null) {
      var label = btnElement.html().replace('?', '');
      btnElement.bind('click', function(){
        if (1 == index) {
          ga('send', 'event', 'Login button', 'button click', label + '(' + document.location.pathname+')');
        }
        else if (2 == index) {
          ga('newTracker.send', 'event', 'Forgot password button', 'button click', label + '(' + document.location.pathname+')');
        }
        else if (3 == index) {
          if (typeof envInfo != 'undefined') {
            if ('deluxe' == envInfo.product  && 'prod' == envInfo.env ) {
              ga('newTracker.send', 'event', 'Marketing Suite Sign-Up', 'button click',  'Login(' + document.location.pathname+')');
            }
          }
        }
      });
    }
  });

});
}
;
