(function($){
  var setting = Drupal.settings.sushi_flow;

  var data = {'wizards': {},'steps':{}};
  var dataStep = JSON.parse( localStorage.getItem('Flow.Step') ) || {};
  var flowDebug = false;
  var debug = function(){
      if (flowDebug){
          console.log.apply(window, arguments);
      }
  }

  /**
  * Resize region content
  */
 function resize_width_content() {
     
      var right_len = $('.right_sidebar .block:visible').length;
      var left_len = $('.left_sidebar .block:visible').length;
      var medium = 0 == left_len && 0 == right_len ? 12 : ((0 != left_len && 0 == right_len) || (0 == left_len && 0 != right_len))? 9 : 6;
      var $content = $('.js-region-content').parent();
      var mclass = $content.attr('class') || '';
      if(!mclass.match(/(medium|large)\-\d+/)) {
          mclass = $content.parent().attr('class') || '';
          $content = $content.parent();
      } 
      var old_medium = mclass.match(/(medium|large)\-\d+/) || [];
      //$('.content').removeClass(old_medium).addClass('animated medium-'+medium);
	  if(old_medium.length > 1){
		 $content.removeClass(old_medium[0]).addClass(old_medium[1]+'-'+medium);
	  }
  }

  var buildRegions = function(numStep){
      //TODO: replase with .region-[region] with drupal
      var step = Drupal.settings.steps[numStep];
      if (typeof step == 'undefined') {
        hideRegions();
      } else {
        step.sidebar_right = step.sidebar_right || undefined;
        step.sidebar_left = step.sidebar_left || undefined;
        for(sregion in step){
            var region = sregion.replace('sidebar_','');
            buildRegion(region,step[sregion]);
        };
      }
      //animationStep('.quicktabs_main',500,'fadeInRight');
      resize_width_content();
  }

  var buildRegion = function(region,blocks){
      if( typeof blocks === 'undefined' || blocks[0].delta == null ){
          $('.'+region+'_sidebar').hide();
      } else {
          $('.'+region+'_sidebar').show();
          hideBlocks(region);
          for (var i in blocks){
              showBlock(region,blocks[i].delta,blocks[i].module);
          }
        sortRegion(region,blocks);
      }
  }

  var hideRegions = function() {
    $('.left_sidebar').hide();
    $('.right_sidebar').hide();
  }

  var hideBlocks = function(region){
      //$('.'+region+'_sidebar > > > .block').hide();
      $('.'+region+'_sidebar .block:not(.block .block)').hide();
  }

  var showBlock = function(region,id,delta){
      $('.'+region+'_sidebar .block-delta-'+id+'.block-region-sidebar_'+region).show();
  }

	var sortRegion = function (region,blocks){
        var bl = [];
        for ( var i in blocks){
            bl.push(blocks[i].delta);
        }
        var elements = $('.'+region+'_sidebar .block');
        var parent = elements.parent();
        elements.sort(function(a,b){
            var ai = bl.indexOf($(a).prop('id'));
            var bi = bl.indexOf($(b).prop('id'));
            return (ai < bi) ? -1 : (ai > bi) ? 1 : 0;
        });
        elements.detach().appendTo(parent);
    }

    var save = function(numStep){
        dataStep[setting.quicktab] = numStep;
        localStorage.setItem('Flow.Step', JSON.stringify(dataStep));
    }

    var innerWizard = function($dom){
        return $dom.find('[data-wizard]').data('wizard') || false;
    }

    var locked = function(wizard){
        return (setting.unlocked.indexOf(wizard) == -1);
        //return true;
    }

    var Tab = function(li, wizard){
        this.li = li;
        this.a = $(li).children('a')[0];
        this.content = $(this.a.hash);
        this.innerWizard = innerWizard(this.content);
        this.wizard = wizard;
        this.numTab = wizard.tabs.length;
        locked(wizard.name) ? this.lock() : this.unlock();
        this.clickHandler();
    }

    Tab.prototype.clickHandler = function(){
        var _this = this;
        $(this.a).click(function(){
            if (!_this.locked) {
                _this.show();
                if (typeof _this.numStep != 'undefined') save(_this.numStep);
                if (_this.wizard.name == setting.quicktab) buildRegions(_this.numTab);
            }
            return false;
        });
    }

    Tab.prototype.show = function(){
        var animation = this.content.hasClass('active');
        this.unlock();
        this.wizard.hideAllTabs();
        $(this.li).addClass('active');
        $(this.content).addClass('active');
        if (this.wizard.type == 'tab' && animation === false) this.animation();
        try{
            $("#footer").place_footer();
        }
        catch(e) {
            console.log();
        }
    }

    Tab.prototype.hide = function(){
        $(this.li).removeClass('active');
        $(this.content).removeClass('active');
    }

    Tab.prototype.lock = function(){
        $(this.li).addClass('disabled');
        this.locked = true;
    }

    Tab.prototype.unlock = function(){
        $(this.li).removeClass('disabled');
        this.locked = false;
    }

    Tab.prototype.animation = function(animation, timeout){
      var _this = this;
      var a = animation || 'fadeInRight';
      var t = timeout || 500;
      $(this.content).addClass('animated ' + a);
      setTimeout(function(){
          $(_this.content).removeClass('animated ' + a);
          //resize_width_content();
      },t);
    }

    var Wizard = function(name){
        this.innerWizards = [];
        this.tabs = [];
        this.name = name;
        var _this = this;
        if ($('[data-wizard="'+name+'"]').hasClass('accordion')) {
          this.type = 'accrodion';
        } else {
          this.type = 'tab';
        }
        $('[data-wizard="'+name+'"] > li').each(function(key, li){
            try{
              if (setting.onSteps && name == setting.onSteps.wizard && !setting.onSteps[key]) {
                $(this).hide();
                Drupal.settings.steps.splice(key, 1);
                return;
              }
            } catch(e) {
              console.log(e);
            }
            var tab = new Tab(li, _this);
            _this.tabs.push(tab);
            if (setting.onSteps) {
              var $a = $(tab.a);
              $a.text($a.text().replace('{#}', _this.tabs.length));
            }
            if (tab.innerWizard) _this.innerWizards.push(tab.innerWizard);
        });
        if(!locked(name)) this.buildTab(0);
    }


    Wizard.prototype.hideAllTabs = function(){
        for (var i in this.tabs) {
            this.tabs[i].hide();
        }
    }

    Wizard.prototype.unlockAllTabs = function(){
        for (var i in this.tabs) {
            this.tabs[i].unlock();
        }
    }

    Wizard.prototype.lockAllTab = function(){
        for (var i in this.tabs) {
            this.tabs[i].lock();
        }
    }

    Wizard.prototype.buildTab = function(numTab){
        if (typeof this.tabs[numTab] == 'undefined') return false;
        this.tabs[numTab].show();
    }

    var SushiWizard = function(mainWizard){
      this.init(mainWizard);
    }

    SushiWizard.prototype.init = function(mainWizard){
      debug(mainWizard);
      debug(setting.quicktab);
      var mainWizard = mainWizard || setting.quicktab;
      data = {'wizards': {},'steps':{}};
      setting = Drupal.settings.sushi_flow;
      this.reset();
      var current = this.current();
      this.prepareWizards(mainWizard);
      this.prepareSteps(mainWizard);
      this.unlockTo(current);
      this.buildStep(current);
    }

    SushiWizard.prototype.prepareWizards = function(wizardName){
        var wizard = new Wizard(wizardName);
        if (wizardName == setting.quicktab) this.wizard = wizard;
        data.wizards[wizardName] = wizard;
        for (var i in wizard.innerWizards) {
            this.prepareWizards(wizard.innerWizards[i]);
        }
    }

    SushiWizard.prototype.prepareSteps = function(wizard, step, parentTab){
        if (wizard == false) return;
        var numStep = step || 0;

        var tabs = data.wizards[wizard].tabs;
        for(var i in tabs){
            var innerWizard = tabs[i].innerWizard;
            tabs[i].numStep = numStep;
            if (typeof data.steps[numStep] == 'undefined') data.steps[numStep] = [];
            data.steps[numStep].push({'wizard': wizard, 'tab': i, 'parent': parentTab});
            if(innerWizard && locked(innerWizard)){
              numStep = this.prepareSteps(innerWizard, numStep, {'wizard': wizard, 'tab': i});
            } else {
              numStep++;
            }
        }
        return numStep;
    }

    SushiWizard.prototype.eventSwitchStep = function(numStep){
      var nameStep = this.wizard.tabs[numStep].a.text;

      if (Signup) {
        Signup.eventManager.dispatchEvent('SushiFlow.BuildStep', nameStep);
      }
    }

    SushiWizard.prototype.buildStep = function(numStep){
        if (typeof data.steps[numStep] == 'undefined') return false;
        var tabs = data.steps[numStep];

        for ( var i in tabs ) {
            if (typeof tabs[i].parent == 'object') {
              this.buildParentTab(tabs[i].parent);
            }
            data.wizards[tabs[i].wizard].hideAllTabs();
            data.wizards[tabs[i].wizard].buildTab(tabs[i].tab);
            if (tabs[i].wizard == setting.quicktab) {
                buildRegions(tabs[i].tab);
            }
        }
        this.eventSwitchStep(numStep);
        this.save(numStep);
        try{
            $("#footer").place_footer();
        }
        catch(e) {
            console.log();
        }
        return numStep;
    }

    SushiWizard.prototype.buildParentTab = function(dataTab){
      try {
        if ( !$(data.wizards[dataTab.wizard].tabs[dataTab.tab].li).hasClass('active') ) {
          var step = data.wizards[dataTab.wizard].tabs[dataTab.tab].numStep;
          this.buildStep(step);
        }

      } catch (e) {
        console.log(e);
      }
    }

    SushiWizard.prototype.NextStep = function(){
        var current = this.current();
        return this.buildStep(++current);
    }

    SushiWizard.prototype.BackStep = function(){
        var current = this.current();
        return this.buildStep(--current);
    }

    SushiWizard.prototype.current = function(){
        var current = dataStep[setting.quicktab] || 0;
        return parseInt(current);
    }

    SushiWizard.prototype.unlockTo = function(numStep){
        for (var i = 0; i < numStep; i++) {
            this.unlockStep(i);
        }
    }

    SushiWizard.prototype.disableAllTab = function(){
        this.wizard.lockAllTab();
        //this.save(0);
    }

    SushiWizard.prototype.unlockStep = function(numStep){
        try{
            var tabs = data.steps[numStep];
            for (var i in tabs) {
                data.wizards[tabs[i].wizard].tabs[tabs[i].tab].unlock();
            }
            return true;
        } catch(e) {
            debug(e);
            return false;
        }
    }

    SushiWizard.prototype.save = save;

    SushiWizard.prototype.reset = function(){
        var reset = localStorage.getItem('Flow.ResetStep') !== null ? localStorage.getItem('Flow.ResetStep') : false;
        localStorage.removeItem('Flow.ResetStep');
        if (reset !== false) {
            this.save(reset);
            return true;
        }
        return false;
    }

    SushiWizard.prototype.getData = function(){
        return data;
    }

    Drupal.sushiFlow = new SushiWizard();
}(jQuery));
;
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
