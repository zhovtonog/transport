/**
 * @file
 * JS file for admin_menu_fix module.
 */

jQuery(function(){
  
  if (jQuery('html body .off-canvas-wrap:first').length == 0) {
    
    var obj_fixed = [];
    setTimeout(function(){
        jQuery('*').filter(function() {
            if( jQuery(this).css("position") === 'fixed' && jQuery(this).attr('id') != 'admin-menu') {
                    obj_fixed.push(jQuery(this)); 
                    var original_top = jQuery(this).css('top');
                    
                    jQuery(this).attr("data-top",original_top);
            }
        });
        jQuery(window).resize();
    },2000);
    
  }
  jQuery(window).resize(function() {
    try {
      
      var menu_height = jQuery('#admin-menu').height();
      var style = 'html body .admin-menu {';
      style += 'margin-top:' + menu_height + 'px !important';
      style += '}';
      if (jQuery('html body .off-canvas-wrap:first').length) {
        jQuery('html body .off-canvas-wrap:first').css({'padding-top':menu_height + 'px'});
      }
      else {
        jQuery('body').css({'padding-top':menu_height + 'px'});
        for(var i=0;i<obj_fixed.length;i++) {
          var top = parseInt(obj_fixed[i].attr("data-top").replace('px',''));
              
          obj_fixed[i].css("top",top  + menu_height +'px' );
        }
        
      }
      
      // jQuery('#admin_menu_fix').html(style);
    }
    catch (e) {
      console.log(e);
    }
  });
  jQuery(window).resize();
});
;
"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
(function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
(e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
(this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
[this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")},
baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
!1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]),
c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev=
f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
(a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")===
f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1;
this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
!0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))},
addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:
!1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
"function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
!1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
(c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)});
a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")?
b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
[d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active");
this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
"px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect");
f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0===
f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);;
(function($){
    $(function(){
        $('[data-owl-carousel]').each(function(){
          //.owl-carousel
          var $owl = $(this);
          try{
            var options = JSON.parse($(this).attr('data-options'));
          }
          catch(e){}
          if (!options) {
            options = {};
          }
          if (options.transitionStyle && options.transitionStyle == "false") {
            options.transitionStyle = false;
          }
          var animate = function(timeout){
            //animate texts
                if (!timeout) {
                    timeout = 800;
                }
                $('[data-animation]',$owl).each(function(k){
                    var $anim = jQuery(this);
                    var delay = $anim.attr('data-animation-delay');
                    var animation = $anim.attr('data-animation');
                    if (delay) {
                         $anim.css({'animation-iteration-count':'1','animation-delay':delay});
                         
                    }
                    //jQuery(this).addClass(animation + ' animated');
                    
                    
                    setTimeout(function(){
                        $anim.removeClass('no-animated').addClass( animation + ' animated');    
                    },timeout);
                        
                    
                });
          }
          if (!options.afterMove) {
            options.afterMove = function(){
                animate(500);
            }
          }
          if (!options.afterAction) {
            options.afterAction = function(){
                animate(500);
            }
          }
          if (!options.beforeMove) {
            options.beforeMove = function(){
                //animate texts
                $('[data-animation]',$owl).each(function(k){
                    var $anim = $(this);
                    var delay = $anim.attr('data-animation-delay');
                    var animation = $anim.attr('data-animation');
                    
                    $anim.removeClass(animation).removeClass('animated').addClass('no-animated');
                    
                        
                    
                });
                
            }
          }
          if (!options.beforeInit) {
            options.beforeInit = options.beforeMove;
          }
          options.afterInit = function (){
            if (options.arrows && options.arrows == true) {
                var slider_arrows = ''+
                    '<div class="slider-arrows">'+
                        '<div class="left-arrow"><svg height="80px" viewbox="-5 -10 45 95" width="60px" xml:space="preserve"><polyline fill="none" '+
                            'points="45.63,75.8 0.375,38.087 45.63,0.375" stroke-width="3"></polyline></svg></div>'+
                        '<div class="right-arrow"><svg height="80px" viewbox="5 -10 45 95" width="60px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polyline fill="none"'+
                            'points="0.375,0.375 45.63,38.087 0.375,75.8" stroke-width="3"></polyline></svg></div>'+
                    '</div>';
                $slider_arrows = $(slider_arrows);
                $slider_arrows.find('.left-arrow').click(function(){
                        $owl.trigger('owl.prev');
                });
                $slider_arrows.find('.right-arrow').click(function(){
                        $owl.trigger('owl.next');
                });
                $owl.append($slider_arrows);
            }
          }
          $(this).owlCarousel(options);
        });    
    });    
})(jQuery);

//data-animation="fadeIn" data-animation-delay="200"
;
 /** 
 *      Modify checkbox. Scan all input with type "checkbox". If input with 
 *  out teg "label", add teg "label" with empty content.
 */

(function ($) {
  $(document).ready(function(){
    var input;
    
    input = $('input[type = "checkbox"], input[type = "radio"]');
    
     /**
     *  Iterates all input with type "checkbox"
     *  
     *  @param {array} arr Array with content all input with type "checkbox" on loaded page
     *  @param {function} fn Which takes one element of array 
     *  
     *  @return {boolean}
     */
    function modifyCheckbox(arr, fn){
      for (var i = 0, length = arr.length ; i < length ; i++ ){
        fn(arr[i]);
      }
      return true;
    };
    
    //invoke function
    modifyCheckbox(input, function(item){
      var id, afterInput, tag;
        
      id = $(item).attr('id');
      afterInput = $(item).next();
      tag = (afterInput.length) ? afterInput[0].nodeName : null;
      if( afterInput === item || afterInput.length === 0 || ($(item).attr('type') === "radio" && tag !== 'LABEL') ){
        $(item).after("<label for=" + id + ">&nbsp;</label>");
      }  
    });
  });
})(jQuery);
;
jQuery(function () {
    jQuery("a.force-approve").on('click', function (e) {
        // prevent the default action, in this case the following of a link
        e.preventDefault();
        // capture the href attribute of the a element
        var url = '/admin/content/approvals/force/blocks';
        var cur_url = location.href;
        jQuery.ajax({
            type: "POST",
            url: url,
            data: Drupal.settings.force_approve,
            success: function(data){
                location.href = cur_url;
            },
            
        });
    });
});;
!function(a){function b(){return new Date(Date.UTC.apply(Date,arguments))}var c=function(b,c){var f=this;switch(this.element=a(b),this.autoShow=c.autoShow||!0,this.appendTo=c.appendTo||"body",this.closeButton=c.closeButton,this.language=c.language||this.element.data("date-language")||"en",this.language=this.language in d?this.language:this.language.split("-")[0],this.language=this.language in d?this.language:"en",this.isRTL=d[this.language].rtl||!1,this.format=e.parseFormat(c.format||this.element.data("date-format")||d[this.language].format||"mm/dd/yyyy"),this.isInline=!1,this.isInput=this.element.is("input"),this.component=this.element.is(".date")?this.element.find(".prefix, .postfix"):!1,this.hasInput=this.component&&this.element.find("input").length,this.disableDblClickSelection=c.disableDblClickSelection,this.onRender=c.onRender||function(){},this.component&&0===this.component.length&&(this.component=!1),this._attachEvents(),this.forceParse=!0,"forceParse"in c?this.forceParse=c.forceParse:"dateForceParse"in this.element.data()&&(this.forceParse=this.element.data("date-force-parse")),this.picker=a(e.template).appendTo(this.isInline?this.element:this.appendTo).on({click:a.proxy(this.click,this),mousedown:a.proxy(this.mousedown,this)}),this.closeButton?this.picker.find("a.datepicker-close").show():this.picker.find("a.datepicker-close").hide(),this.isInline?this.picker.addClass("datepicker-inline"):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.isRTL&&(this.picker.addClass("datepicker-rtl"),this.picker.find(".prev i, .next i").toggleClass("fa fa-chevron-left fa-chevron-right").toggleClass("fa-chevron-left fa-chevron-right")),a(document).on("mousedown",function(b){0===a(b.target).closest(".datepicker.datepicker-inline, .datepicker.datepicker-dropdown").length&&f.hide()}),this.autoclose=!0,"autoclose"in c?this.autoclose=c.autoclose:"dateAutoclose"in this.element.data()&&(this.autoclose=this.element.data("date-autoclose")),this.keyboardNavigation=!0,"keyboardNavigation"in c?this.keyboardNavigation=c.keyboardNavigation:"dateKeyboardNavigation"in this.element.data()&&(this.keyboardNavigation=this.element.data("date-keyboard-navigation")),this.viewMode=this.startViewMode=0,c.startView||this.element.data("date-start-view")){case 2:case"decade":this.viewMode=this.startViewMode=2;break;case 1:case"year":this.viewMode=this.startViewMode=1}this.todayBtn=c.todayBtn||this.element.data("date-today-btn")||!1,this.todayHighlight=c.todayHighlight||this.element.data("date-today-highlight")||!1,this.calendarWeeks=!1,"calendarWeeks"in c?this.calendarWeeks=c.calendarWeeks:"dateCalendarWeeks"in this.element.data()&&(this.calendarWeeks=this.element.data("date-calendar-weeks")),this.calendarWeeks&&this.picker.find("tfoot th.today").attr("colspan",function(a,b){return parseInt(b)+1}),this.weekStart=(c.weekStart||this.element.data("date-weekstart")||d[this.language].weekStart||0)%7,this.weekEnd=(this.weekStart+6)%7,this.startDate=-(1/0),this.endDate=1/0,this.daysOfWeekDisabled=[],this.setStartDate(c.startDate||this.element.data("date-startdate")),this.setEndDate(c.endDate||this.element.data("date-enddate")),this.setDaysOfWeekDisabled(c.daysOfWeekDisabled||this.element.data("date-days-of-week-disabled")),this.fillDow(),this.fillMonths(),this.update(),this.showMode(),this.isInline&&this.show()};c.prototype={constructor:c,_events:[],_attachEvents:function(){this._detachEvents(),this.isInput?this._events=[[this.element,{focus:this.autoShow?a.proxy(this.show,this):function(){},keyup:a.proxy(this.update,this),keydown:a.proxy(this.keydown,this)}]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),{focus:this.autoShow?a.proxy(this.show,this):function(){},keyup:a.proxy(this.update,this),keydown:a.proxy(this.keydown,this)}],[this.component,{click:a.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:a.proxy(this.show,this)}]],this.disableDblClickSelection&&(this._events[this._events.length]=[this.element,{dblclick:function(b){b.preventDefault(),b.stopPropagation(),a(this).blur()}}]);for(var b,c,d=0;d<this._events.length;d++)b=this._events[d][0],c=this._events[d][1],b.on(c)},_detachEvents:function(){for(var a,b,c=0;c<this._events.length;c++)a=this._events[c][0],b=this._events[c][1],a.off(b);this._events=[]},show:function(b){this.picker.show(),this.height=this.component?this.component.outerHeight():this.element.outerHeight(),this.update(),this.place(),a(window).on("resize",a.proxy(this.place,this)),b&&(b.stopPropagation(),b.preventDefault()),this.element.trigger({type:"show",date:this.date})},hide:function(b){this.isInline||this.picker.is(":visible")&&(this.picker.hide(),a(window).off("resize",this.place),this.viewMode=this.startViewMode,this.showMode(),this.isInput||a(document).off("mousedown",this.hide),this.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this.element.trigger({type:"hide",date:this.date}))},remove:function(){this._detachEvents(),this.picker.remove(),delete this.element.data().datepicker},getDate:function(){var a=this.getUTCDate();return new Date(a.getTime()+6e4*a.getTimezoneOffset())},getUTCDate:function(){return this.date},setDate:function(a){this.setUTCDate(new Date(a.getTime()-6e4*a.getTimezoneOffset()))},setUTCDate:function(a){this.date=a,this.setValue()},setValue:function(){var a=this.getFormattedDate();this.isInput?this.element.val(a):(this.component&&this.element.find("input").val(a),this.element.data("date",a))},getFormattedDate:function(a){return void 0===a&&(a=this.format),e.formatDate(this.date,a,this.language)},setStartDate:function(a){this.startDate=a||-(1/0),this.startDate!==-(1/0)&&(this.startDate=e.parseDate(this.startDate,this.format,this.language)),this.update(),this.updateNavArrows()},setEndDate:function(a){this.endDate=a||1/0,this.endDate!==1/0&&(this.endDate=e.parseDate(this.endDate,this.format,this.language)),this.update(),this.updateNavArrows()},setDaysOfWeekDisabled:function(b){this.daysOfWeekDisabled=b||[],a.isArray(this.daysOfWeekDisabled)||(this.daysOfWeekDisabled=this.daysOfWeekDisabled.split(/,\s*/)),this.daysOfWeekDisabled=a.map(this.daysOfWeekDisabled,function(a){return parseInt(a,10)}),this.update(),this.updateNavArrows()},place:function(){if(!this.isInline){var b=parseInt(this.element.parents().filter(function(){return"auto"!=a(this).css("z-index")}).first().css("z-index"))+10,c=this.component?this.component:this.element,d=c.offset(),e=c.outerHeight()+parseInt(c.css("margin-top")),f=c.outerWidth()+parseInt(c.css("margin-left")),g=d.top+e,h=d.left;g+this.picker.outerHeight()>=a(window).scrollTop()+a(window).height()&&(g=d.top-this.picker.outerHeight()),d.left+this.picker.width()>=a(window).width()&&(h=d.left+f-this.picker.width()),this.picker.css({top:g,left:h,zIndex:b})}},update:function(){var a,b=!1;arguments&&arguments.length&&("string"==typeof arguments[0]||arguments[0]instanceof Date)?(a=arguments[0],b=!0):a=this.isInput?this.element.val():this.element.data("date")||this.element.find("input").val(),this.date=e.parseDate(a,this.format,this.language),b&&this.setValue(),this.date<this.startDate?this.viewDate=new Date(this.startDate.valueOf()):this.date>this.endDate?this.viewDate=new Date(this.endDate.valueOf()):this.viewDate=new Date(this.date.valueOf()),this.fill()},fillDow:function(){var a=this.weekStart,b="<tr>";if(this.calendarWeeks){var c='<th class="cw">&nbsp;</th>';b+=c,this.picker.find(".datepicker-days thead tr:first-child").prepend(c)}for(;a<this.weekStart+7;)b+='<th class="dow">'+d[this.language].daysMin[a++%7]+"</th>";b+="</tr>",this.picker.find(".datepicker-days thead").append(b)},fillMonths:function(){for(var a="",b=0;12>b;)a+='<span class="month">'+d[this.language].monthsShort[b++]+"</span>";this.picker.find(".datepicker-months td").html(a)},fill:function(){var c=new Date(this.viewDate.valueOf()),f=c.getUTCFullYear(),g=c.getUTCMonth(),h=this.startDate!==-(1/0)?this.startDate.getUTCFullYear():-(1/0),i=this.startDate!==-(1/0)?this.startDate.getUTCMonth():-(1/0),j=this.endDate!==1/0?this.endDate.getUTCFullYear():1/0,k=this.endDate!==1/0?this.endDate.getUTCMonth():1/0,l=this.date&&this.date.valueOf(),m=new Date;this.picker.find(".datepicker-days thead th.date-switch").text(d[this.language].months[g]+" "+f),this.picker.find("tfoot th.today").text(d[this.language].today).toggle(this.todayBtn!==!1),this.updateNavArrows(),this.fillMonths();var n=b(f,g-1,28,0,0,0,0),o=e.getDaysInMonth(n.getUTCFullYear(),n.getUTCMonth());n.setUTCDate(o),n.setUTCDate(o-(n.getUTCDay()-this.weekStart+7)%7);var p=new Date(n.valueOf());p.setUTCDate(p.getUTCDate()+42),p=p.valueOf();for(var q,r=[];n.valueOf()<p;){if(n.getUTCDay()==this.weekStart&&(r.push("<tr>"),this.calendarWeeks)){var s=new Date(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()-n.getDay()+10-(this.weekStart&&this.weekStart%7<5&&7)),t=new Date(s.getFullYear(),0,4),u=~~((s-t)/864e5/7+1.5);r.push('<td class="cw">'+u+"</td>")}q=" "+this.onRender(n)+" ",n.getUTCFullYear()<f||n.getUTCFullYear()==f&&n.getUTCMonth()<g?q+=" old":(n.getUTCFullYear()>f||n.getUTCFullYear()==f&&n.getUTCMonth()>g)&&(q+=" new"),this.todayHighlight&&n.getUTCFullYear()==m.getFullYear()&&n.getUTCMonth()==m.getMonth()&&n.getUTCDate()==m.getDate()&&(q+=" today"),l&&n.valueOf()==l&&(q+=" active"),(n.valueOf()<this.startDate||n.valueOf()>this.endDate||-1!==a.inArray(n.getUTCDay(),this.daysOfWeekDisabled))&&(q+=" disabled"),r.push('<td class="day'+q+'">'+n.getUTCDate()+"</td>"),n.getUTCDay()==this.weekEnd&&r.push("</tr>"),n.setUTCDate(n.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(r.join(""));var v=this.date&&this.date.getUTCFullYear(),w=this.picker.find(".datepicker-months").find("th:eq(1)").text(f).end().find("span").removeClass("active");v&&v==f&&w.eq(this.date.getUTCMonth()).addClass("active"),(h>f||f>j)&&w.addClass("disabled"),f==h&&w.slice(0,i).addClass("disabled"),f==j&&w.slice(k+1).addClass("disabled"),r="",f=10*parseInt(f/10,10);var x=this.picker.find(".datepicker-years").find("th:eq(1)").text(f+"-"+(f+9)).end().find("td");f-=1;for(var y=-1;11>y;y++)r+='<span class="year'+(-1==y||10==y?" old":"")+(v==f?" active":"")+(h>f||f>j?" disabled":"")+'">'+f+"</span>",f+=1;x.html(r)},updateNavArrows:function(){var a=new Date(this.viewDate.valueOf()),b=a.getUTCFullYear(),c=a.getUTCMonth();switch(this.viewMode){case 0:this.startDate!==-(1/0)&&b<=this.startDate.getUTCFullYear()&&c<=this.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.endDate!==1/0&&b>=this.endDate.getUTCFullYear()&&c>=this.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:this.startDate!==-(1/0)&&b<=this.startDate.getUTCFullYear()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.endDate!==1/0&&b>=this.endDate.getUTCFullYear()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}},click:function(c){c.stopPropagation(),c.preventDefault(),(a(c.target).hasClass("datepicker-close")||a(c.target).parent().hasClass("datepicker-close"))&&this.hide();var d=a(c.target).closest("span, td, th");if(1==d.length)switch(d[0].nodeName.toLowerCase()){case"th":switch(d[0].className){case"date-switch":this.showMode(1);break;case"prev":case"next":var f=e.modes[this.viewMode].navStep*("prev"==d[0].className?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,f);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,f)}this.fill();break;case"today":var g=new Date;g=b(g.getFullYear(),g.getMonth(),g.getDate(),0,0,0),this.showMode(-2);var h="linked"==this.todayBtn?null:"view";this._setDate(g,h)}break;case"span":if(!d.is(".disabled")){if(this.viewDate.setUTCDate(1),d.is(".month")){var i=d.parent().find("span").index(d);this.viewDate.setUTCMonth(i),this.element.trigger({type:"changeMonth",date:this.viewDate})}else{var j=parseInt(d.text(),10)||0;this.viewDate.setUTCFullYear(j),this.element.trigger({type:"changeYear",date:this.viewDate})}this.showMode(-1),this.fill()}break;case"td":if(d.is(".day")&&!d.is(".disabled")){var k=parseInt(d.text(),10)||1,j=this.viewDate.getUTCFullYear(),i=this.viewDate.getUTCMonth();d.is(".old")?0===i?(i=11,j-=1):i-=1:d.is(".new")&&(11==i?(i=0,j+=1):i+=1),this._setDate(b(j,i,k,0,0,0,0))}}},_setDate:function(a,b){b&&"date"!=b||(this.date=a),b&&"view"!=b||(this.viewDate=a),this.fill(),this.setValue(),this.element.trigger({type:"changeDate",date:this.date});var c;this.isInput?c=this.element:this.component&&(c=this.element.find("input")),c&&(c.change(),!this.autoclose||b&&"date"!=b||this.hide())},moveMonth:function(a,b){if(!b)return a;var c,d,e=new Date(a.valueOf()),f=e.getUTCDate(),g=e.getUTCMonth(),h=Math.abs(b);if(b=b>0?1:-1,1==h)d=-1==b?function(){return e.getUTCMonth()==g}:function(){return e.getUTCMonth()!=c},c=g+b,e.setUTCMonth(c),(0>c||c>11)&&(c=(c+12)%12);else{for(var i=0;h>i;i++)e=this.moveMonth(e,b);c=e.getUTCMonth(),e.setUTCDate(f),d=function(){return c!=e.getUTCMonth()}}for(;d();)e.setUTCDate(--f),e.setUTCMonth(c);return e},moveYear:function(a,b){return this.moveMonth(a,12*b)},dateWithinRange:function(a){return a>=this.startDate&&a<=this.endDate},keydown:function(a){if(this.picker.is(":not(:visible)"))return void(27==a.keyCode&&this.show());var b,c,d,e=!1;switch(a.keyCode){case 27:this.hide(),a.preventDefault();break;case 37:case 39:if(!this.keyboardNavigation)break;b=37==a.keyCode?-1:1,a.ctrlKey?(c=this.moveYear(this.date,b),d=this.moveYear(this.viewDate,b)):a.shiftKey?(c=this.moveMonth(this.date,b),d=this.moveMonth(this.viewDate,b)):(c=new Date(this.date.valueOf()),c.setUTCDate(this.date.getUTCDate()+b),d=new Date(this.viewDate.valueOf()),d.setUTCDate(this.viewDate.getUTCDate()+b)),this.dateWithinRange(c)&&(this.date=c,this.viewDate=d,this.setValue(),this.update(),a.preventDefault(),e=!0);break;case 38:case 40:if(!this.keyboardNavigation)break;b=38==a.keyCode?-1:1,a.ctrlKey?(c=this.moveYear(this.date,b),d=this.moveYear(this.viewDate,b)):a.shiftKey?(c=this.moveMonth(this.date,b),d=this.moveMonth(this.viewDate,b)):(c=new Date(this.date.valueOf()),c.setUTCDate(this.date.getUTCDate()+7*b),d=new Date(this.viewDate.valueOf()),d.setUTCDate(this.viewDate.getUTCDate()+7*b)),this.dateWithinRange(c)&&(this.date=c,this.viewDate=d,this.setValue(),this.update(),a.preventDefault(),e=!0);break;case 13:this.hide(),a.preventDefault();break;case 9:this.hide()}if(e){this.element.trigger({type:"changeDate",date:this.date});var f;this.isInput?f=this.element:this.component&&(f=this.element.find("input")),f&&f.change()}},showMode:function(a){a&&(this.viewMode=Math.max(0,Math.min(2,this.viewMode+a))),this.picker.find(">div").hide().filter(".datepicker-"+e.modes[this.viewMode].clsName).css("display","block"),this.updateNavArrows()}},a.fn.fdatepicker=function(b){var d=Array.apply(null,arguments);return d.shift(),this.each(function(){var e=a(this),f=e.data("datepicker"),g="object"==typeof b&&b;f||e.data("datepicker",f=new c(this,a.extend({},a.fn.fdatepicker.defaults,g))),"string"==typeof b&&"function"==typeof f[b]&&f[b].apply(f,d)})},a.fn.fdatepicker.defaults={onRender:function(a){return""}},a.fn.fdatepicker.Constructor=c;var d=a.fn.fdatepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today"},sk:{days:["Nedeľa","Pondelok","Utorok","Streda","Štvrtok","Piatok","Sobota","Nedeľa"],daysShort:["Neď","Pon","Utr","Str","Štv","Pia","Sob","Ned"],daysMin:["Ne","Po","Ut","St","Št","Pi","So","Ne"],months:["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"],monthsShort:["Jan","Feb","Mar","Apr","Máj","Jún","Júl","Aug","Sep","Oct","Nov","Dec"],today:"Dnes"},tr:{days:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"],daysShort:["Pzr","Pzt","Sal","Çarş","Perş","Cum","Cmt","Pzr"],daysMin:["Pz","Pt","Sa","Ça","Pe","Cu","Ct","Pz"],months:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],monthsShort:["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],today:"Bugün"},fr:{days:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"],daysShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam","Dim"],daysMin:["Di","Lu","Ma","Me","Je","Ve","Sa","Di"],months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],monthsShort:["Jan","Fev","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Dec"],today:"Aujourd'hui"},pl:{days:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"],daysShort:["Nie","Pon","Wt","Śr","Czw","Pt","Sob","Nie"],daysMin:["Nd","Po","Wt","Śr","Czw","Pt","So","Nd"],months:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],monthsShort:["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lit","Gru"],today:"Dzisiaj"},es:{days:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],daysShort:["Dom","Lun","Mar","Mie","Jue","Vie","Sab","Dom"],daysMin:["Do","Lu","Ma","Mi","Ju","Vi","Sa","Do"],months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Deciembre"],monthsShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],today:"Hoy"},pt:{days:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"],daysShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],daysMin:["Do","Se","Te","Qu","Qu","Se","Sá","Do"],months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],today:"Hoje"},pt_br:{days:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"],daysShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],daysMin:["D","S","T","Q","Q","S","S","D"],months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],today:"Hoje"},it:{days:["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato","Domenica"],daysShort:["Dom","Lun","Mar","Mer","Gio","Veb","Sab","Dom"],daysMin:["Do","Lu","Ma","Me","Gi","Ve","Sa","Do"],months:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],monthsShort:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],today:"Oggi"},de:{days:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"],daysShort:["So","Mo","Di","Mi","Do","Fr","Sa","So"],daysMin:["So","Mo","Di","Mi","Do","Fr","Sa","So"],months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthsShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],today:"Heute"},ro:{days:["Duminica","Luni","Marti","Miercuri","Joi","Vineri","Sambata","Duminica"],daysShort:["Dum","Lun","Mar","Mie","Joi","Vin","Sam","Dum"],daysMin:["Du","Lu","Ma","Mi","Jo","Vi","Sa","Du"],months:["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"],monthsShort:["Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sep","Oct","Noi","Dec"],today:"Astazi"},hu:{days:["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat","Vasárnap"],daysShort:["Vas","Hét","Kedd","Sze","Csü","Pén","Szo","Vas"],daysMin:["Va","Hé","Ke","Sz","Cs","Pé","Sz","Va"],months:["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"],monthsShort:["Jan","Feb","Már","Ápr","Máj","Jún","Júl","Aug","Szep","Okt","Nov","Dec"],today:"Ma"},ru:{days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],daysShort:["Вск","Пнд","Втр","Срд","Чтв","Птн","Суб","Вск"],daysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб","Вс"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],today:"Сегодня"},cz:{days:["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota","Neděle"],daysShort:["Ne","Po","Út","St","Čt","Pá","So","Ne"],daysMin:["Ne","Po","Út","St","Čt","Pá","So","Ne"],months:["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"],monthsShort:["Led","Úno","Bře","Dub","Kvě","Čer","Čnc","Srp","Zář","Říj","Lis","Pro"],today:"Dnes"},nl:{days:["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag","Zondag"],daysShort:["Zon","Maa","Din","Woe","Don","Vri","Zat","Zon"],daysMin:["Zo","Ma","Di","Wo","Do","Vr","Za","Zo"],months:["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"],monthsShort:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],today:"Vandaag"},el:{days:["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο","Κυριακή"],daysShort:["Κυρ","Δευ","Τρί","Τετ","Πέμ","Παρ","Σάβ","Κυρ"],daysMin:["Κυ","Δε","Τρ","Τε","Πέ","Πα","Σά","Κυ"],months:["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"],monthsShort:["Ιαν","Φεβ","Μαρ","Απρ","Μαϊ","Ιου","Ιου","Αυγ","Σεπ","Οκτ","Νοε","Δεκ"],today:"Σήμερα"},uk:{days:["Понедiлок ","Вiвторок ","Середа ","Четвер ","П'ятниця ","Субота ","Недiля"],daysShort:["Пнд","Втр","Срд","Чтв","Птн","Сбт","Ндл"],daysMin:["Пн","Вт","Ср","Чт","Пт","Сб","Нд"],months:["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],monthsShort:["Сiч","Лют","Бер","Квiт","Трав","Черв","Лип","Серп","Вер","Жовт","Лист","Груд"],today:"Сьогодні"},no:{days:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag","Søndag"],daysShort:["Søn","Man","Tir","Ons","Tor","Fre","Lør","Søn"],daysMin:["Sø","Ma","Ti","On","To","Fr","Lø","Sø"],months:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],monthsShort:["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Des"],today:"I dag"},sv:{days:["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag","Söndag"],daysShort:["Sön","Mån","Tis","Ons","Tor","Fre","Lör","Sön"],daysMin:["Sö","Må","Ti","On","To","Fr","Lö","Sö"],months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],monthsShort:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],today:"Idag"}},e={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(a){return a%4===0&&a%100!==0||a%400===0},getDaysInMonth:function(a,b){return[31,e.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function(a){var b=a.replace(this.validParts,"\x00").split("\x00"),c=a.match(this.validParts);if(!b||!b.length||!c||0===c.length)throw new Error("Invalid date format.");return{separators:b,parts:c}},parseDate:function(e,f,g){if(e instanceof Date)return e;if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)){var h,i,j=/([\-+]\d+)([dmwy])/,k=e.match(/([\-+]\d+)([dmwy])/g);e=new Date;for(var l=0;l<k.length;l++)switch(h=j.exec(k[l]),i=parseInt(h[1]),h[2]){case"d":e.setUTCDate(e.getUTCDate()+i);break;case"m":e=c.prototype.moveMonth.call(c.prototype,e,i);break;case"w":e.setUTCDate(e.getUTCDate()+7*i);break;case"y":e=c.prototype.moveYear.call(c.prototype,e,i)}return b(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0)}var m,n,h,k=e&&e.match(this.nonpunctuation)||[],e=new Date,o={},p=["yyyy","yy","M","MM","m","mm","d","dd"],q={yyyy:function(a,b){return a.setUTCFullYear(b)},yy:function(a,b){return a.setUTCFullYear(2e3+b)},m:function(a,b){for(b-=1;0>b;)b+=12;for(b%=12,a.setUTCMonth(b);a.getUTCMonth()!=b;)a.setUTCDate(a.getUTCDate()-1);return a},d:function(a,b){return a.setUTCDate(b)}};q.M=q.MM=q.mm=q.m,q.dd=q.d,e=b(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0);var r=f.parts.slice();if(k.length!=r.length&&(r=a(r).filter(function(b,c){return-1!==a.inArray(c,p)}).toArray()),k.length==r.length){for(var l=0,s=r.length;s>l;l++){if(m=parseInt(k[l],10),h=r[l],isNaN(m))switch(h){case"MM":n=a(d[g].months).filter(function(){var a=this.slice(0,k[l].length),b=k[l].slice(0,a.length);return a==b}),m=a.inArray(n[0],d[g].months)+1;break;case"M":n=a(d[g].monthsShort).filter(function(){var a=this.slice(0,k[l].length),b=k[l].slice(0,a.length);return a==b}),m=a.inArray(n[0],d[g].monthsShort)+1}o[h]=m}for(var t,l=0;l<p.length;l++)t=p[l],t in o&&!isNaN(o[t])&&q[t](e,o[t])}return e},formatDate:function(b,c,e){var f={d:b.getUTCDate(),D:d[e].daysShort[b.getUTCDay()],DD:d[e].days[b.getUTCDay()],m:b.getUTCMonth()+1,M:d[e].monthsShort[b.getUTCMonth()],MM:d[e].months[b.getUTCMonth()],yy:b.getUTCFullYear().toString().substring(2),yyyy:b.getUTCFullYear()};f.dd=(f.d<10?"0":"")+f.d,f.mm=(f.m<10?"0":"")+f.m;for(var b=[],g=a.extend([],c.separators),h=0,i=c.parts.length;i>h;h++)g.length&&b.push(g.shift()),b.push(f[c.parts[h]]);return b.join("")},headTemplate:'<thead><tr><th class="prev"><i class="fa fa-chevron-left fi-arrow-left"/></th><th colspan="5" class="date-switch"></th><th class="next"><i class="fa fa-chevron-right fi-arrow-right"/></th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>',headTemplateDays:'<thead><tr><th class="prev"><i class="fa fa-chevron-left fi-arrow-left"/></th><th colspan="5" class="date-switch"></th><th class="next"><i class="fa fa-chevron-right fi-arrow-right"/></th></tr></thead>',footTemplateDays:'<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'};e.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+e.headTemplateDays+"<tbody></tbody>"+e.footTemplateDays+'</table></div><div class="datepicker-months"><table class="table-condensed">'+e.headTemplate+e.contTemplate+e.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+e.headTemplate+e.contTemplate+e.footTemplate+'</table></div><a class="button datepicker-close tiny alert right" style="width:auto;"><i class="fa fa-remove fa-times fi-x"></i></a></div>',a.fn.fdatepicker.DPGlobal=e}(window.jQuery);;
(function ($) {

Drupal.behaviors.tableSelect = {
  attach: function (context, settings) {
    // Select the inner-most table in case of nested tables.
    $('th.select-all', context).closest('table').once('table-select', Drupal.tableSelect);
  }
};

Drupal.tableSelect = function () {
  // Do not add a "Select all" checkbox if there are no rows with checkboxes in the table
  if ($('td input:checkbox', this).length == 0) {
    return;
  }

  // Keep track of the table, which checkbox is checked and alias the settings.
  var table = this, checkboxes, lastChecked;
  var strings = { 'selectAll': Drupal.t('Select all rows in this table'), 'selectNone': Drupal.t('Deselect all rows in this table') };
  var updateSelectAll = function (state) {
    // Update table's select-all checkbox (and sticky header's if available).
    $(table).prev('table.sticky-header').andSelf().find('th.select-all input:checkbox').each(function() {
      $(this).attr('title', state ? strings.selectNone : strings.selectAll);
      this.checked = state;
    });
  };

  // Find all <th> with class select-all, and insert the check all checkbox.
  $('th.select-all', table).prepend($('<input type="checkbox" class="form-checkbox" />').attr('title', strings.selectAll)).click(function (event) {
    if ($(event.target).is('input:checkbox')) {
      // Loop through all checkboxes and set their state to the select all checkbox' state.
      checkboxes.each(function () {
        this.checked = event.target.checked;
        // Either add or remove the selected class based on the state of the check all checkbox.
        $(this).closest('tr').toggleClass('selected', this.checked);
      });
      // Update the title and the state of the check all box.
      updateSelectAll(event.target.checked);
    }
  });

  // For each of the checkboxes within the table that are not disabled.
  checkboxes = $('td input:checkbox:enabled', table).click(function (e) {
    // Either add or remove the selected class based on the state of the check all checkbox.
    $(this).closest('tr').toggleClass('selected', this.checked);

    // If this is a shift click, we need to highlight everything in the range.
    // Also make sure that we are actually checking checkboxes over a range and
    // that a checkbox has been checked or unchecked before.
    if (e.shiftKey && lastChecked && lastChecked != e.target) {
      // We use the checkbox's parent TR to do our range searching.
      Drupal.tableSelectRange($(e.target).closest('tr')[0], $(lastChecked).closest('tr')[0], e.target.checked);
    }

    // If all checkboxes are checked, make sure the select-all one is checked too, otherwise keep unchecked.
    updateSelectAll((checkboxes.length == $(checkboxes).filter(':checked').length));

    // Keep track of the last checked checkbox.
    lastChecked = e.target;
  });

  // If all checkboxes are checked on page load, make sure the select-all one
  // is checked too, otherwise keep unchecked.
  updateSelectAll((checkboxes.length == $(checkboxes).filter(':checked').length));
};

Drupal.tableSelectRange = function (from, to, state) {
  // We determine the looping mode based on the order of from and to.
  var mode = from.rowIndex > to.rowIndex ? 'previousSibling' : 'nextSibling';

  // Traverse through the sibling nodes.
  for (var i = from[mode]; i; i = i[mode]) {
    // Make sure that we're only dealing with elements.
    if (i.nodeType != 1) {
      continue;
    }

    // Either add or remove the selected class based on the state of the target checkbox.
    $(i).toggleClass('selected', state);
    $('input:checkbox', i).each(function () {
      this.checked = state;
    });

    if (to.nodeType) {
      // If we are at the end of the range, stop.
      if (i == to) {
        break;
      }
    }
    // A faster alternative to doing $(i).filter(to).length.
    else if ($.filter(to, [i]).r.length) {
      break;
    }
  }
};

})(jQuery);
;
(function ($) {

/**
 * Attaches sticky table headers.
 */
Drupal.behaviors.tableHeader = {
  attach: function (context, settings) {
    if (!$.support.positionFixed) {
      return;
    }

    $('table.sticky-enabled', context).once('tableheader', function () {
      $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
    });
  }
};

/**
 * Constructor for the tableHeader object. Provides sticky table headers.
 *
 * @param table
 *   DOM object for the table to add a sticky header to.
 */
Drupal.tableHeader = function (table) {
  var self = this;

  this.originalTable = $(table);
  this.originalHeader = $(table).children('thead');
  this.originalHeaderCells = this.originalHeader.find('> tr > th');
  this.displayWeight = null;

  // React to columns change to avoid making checks in the scroll callback.
  this.originalTable.bind('columnschange', function (e, display) {
    // This will force header size to be calculated on scroll.
    self.widthCalculated = (self.displayWeight !== null && self.displayWeight === display);
    self.displayWeight = display;
  });

  // Clone the table header so it inherits original jQuery properties. Hide
  // the table to avoid a flash of the header clone upon page load.
  this.stickyTable = $('<table class="sticky-header"/>')
    .insertBefore(this.originalTable)
    .css({ position: 'fixed', top: '0px' });
  this.stickyHeader = this.originalHeader.clone(true)
    .hide()
    .appendTo(this.stickyTable);
  this.stickyHeaderCells = this.stickyHeader.find('> tr > th');

  this.originalTable.addClass('sticky-table');
  $(window)
    .bind('scroll.drupal-tableheader', $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    .bind('resize.drupal-tableheader', { calculateWidth: true }, $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    // Make sure the anchor being scrolled into view is not hidden beneath the
    // sticky table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceAnchor.drupal-tableheader', function () {
      window.scrollBy(0, -self.stickyTable.outerHeight());
    })
    // Make sure the element being focused is not hidden beneath the sticky
    // table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceFocus.drupal-tableheader', function (event) {
      if (self.stickyVisible && event.clientY < (self.stickyOffsetTop + self.stickyTable.outerHeight()) && event.$target.closest('sticky-header').length === 0) {
        window.scrollBy(0, -self.stickyTable.outerHeight());
      }
    })
    .triggerHandler('resize.drupal-tableheader');

  // We hid the header to avoid it showing up erroneously on page load;
  // we need to unhide it now so that it will show up when expected.
  this.stickyHeader.show();
};

/**
 * Event handler: recalculates position of the sticky table header.
 *
 * @param event
 *   Event being triggered.
 */
Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader = function (event) {
  var self = this;
  var calculateWidth = event.data && event.data.calculateWidth;

  // Reset top position of sticky table headers to the current top offset.
  this.stickyOffsetTop = Drupal.settings.tableHeaderOffset ? eval(Drupal.settings.tableHeaderOffset + '()') : 0;
  this.stickyTable.css('top', this.stickyOffsetTop + 'px');

  // Save positioning data.
  var viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (calculateWidth || this.viewHeight !== viewHeight) {
    this.viewHeight = viewHeight;
    this.vPosition = this.originalTable.offset().top - 4 - this.stickyOffsetTop;
    this.hPosition = this.originalTable.offset().left;
    this.vLength = this.originalTable[0].clientHeight - 100;
    calculateWidth = true;
  }

  // Track horizontal positioning relative to the viewport and set visibility.
  var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
  var vOffset = (document.documentElement.scrollTop || document.body.scrollTop) - this.vPosition;
  this.stickyVisible = vOffset > 0 && vOffset < this.vLength;
  this.stickyTable.css({ left: (-hScroll + this.hPosition) + 'px', visibility: this.stickyVisible ? 'visible' : 'hidden' });

  // Only perform expensive calculations if the sticky header is actually
  // visible or when forced.
  if (this.stickyVisible && (calculateWidth || !this.widthCalculated)) {
    this.widthCalculated = true;
    var $that = null;
    var $stickyCell = null;
    var display = null;
    var cellWidth = null;
    // Resize header and its cell widths.
    // Only apply width to visible table cells. This prevents the header from
    // displaying incorrectly when the sticky header is no longer visible.
    for (var i = 0, il = this.originalHeaderCells.length; i < il; i += 1) {
      $that = $(this.originalHeaderCells[i]);
      $stickyCell = this.stickyHeaderCells.eq($that.index());
      display = $that.css('display');
      if (display !== 'none') {
        cellWidth = $that.css('width');
        // Exception for IE7.
        if (cellWidth === 'auto') {
          cellWidth = $that[0].clientWidth + 'px';
        }
        $stickyCell.css({'width': cellWidth, 'display': display});
      }
      else {
        $stickyCell.css('display', 'none');
      }
    }
    this.stickyTable.css('width', this.originalTable.outerWidth());
  }
};

})(jQuery);
;
