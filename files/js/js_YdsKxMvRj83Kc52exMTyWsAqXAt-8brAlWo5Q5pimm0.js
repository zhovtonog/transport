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
/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
if ( Drupal.settings.ckeditor ){
  window.CKEDITOR_BASEPATH = Drupal.settings.ckeditor.editor_path;
}
(function ($) {
  Drupal.ckeditor = (typeof(CKEDITOR) != 'undefined');
  Drupal.ckeditor_ver = false;

  Drupal.ckeditorToggle = function(textarea_ids, TextTextarea, TextRTE){
    if (!CKEDITOR.env.isCompatible) {
      return;
    }

    for (i=0; i<textarea_ids.length; i++){
      if (typeof(CKEDITOR.instances) != 'undefined' && typeof(CKEDITOR.instances[textarea_ids[i]]) != 'undefined'){
        Drupal.ckeditorOff(textarea_ids[i]);
        $('#switch_' + textarea_ids[0]).text(TextRTE);
      }
      else {
        Drupal.ckeditorOn(textarea_ids[i]);
        $('#switch_' + textarea_ids[0]).text(TextTextarea);
      }
    }
  };

  /**
 * CKEditor starting function
 *
 * @param string textarea_id
 */
  Drupal.ckeditorInit = function(textarea_id) {
    var ckeditor_obj = Drupal.settings.ckeditor;
    $("#" + textarea_id).next(".grippie").css("display", "none");
    $("#" + textarea_id).addClass("ckeditor-processed");

    var textarea_settings = false;
    ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].toolbar = eval(ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].toolbar);
    textarea_settings = ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]];

    var drupalTopToolbar = $('#toolbar, #admin-menu', Drupal.overlayChild ? window.parent.document : document);

    textarea_settings['on'] =
    {
      configLoaded  : function(ev)
      {
        Drupal.ckeditor_ver = CKEDITOR.version.split('.')[0];
        if (Drupal.ckeditor_ver == 3) {
          ev.editor.addCss(ev.editor.config.extraCss);
        }
        else {
          CKEDITOR.addCss(ev.editor.config.extraCss);
        }
        // Let Drupal trigger formUpdated event [#1895278]
        ev.editor.on('change', function(ev) {
          $(ev.editor.element.$).trigger('change');
        });
        ev.editor.on('blur', function(ev) {
          $(ev.editor.element.$).trigger('blur');
        });
        ev.editor.on('focus', function(ev) {
          $(ev.editor.element.$).trigger('click');
        });
      },
      instanceReady : function(ev)
      {
        var body = $(ev.editor.document.$.body);
        if (typeof(ev.editor.dataProcessor.writer.setRules) != 'undefined') {
          ev.editor.dataProcessor.writer.setRules('p', {
            breakAfterOpen: false
          });

          if (typeof(ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].custom_formatting) != 'undefined') {
            var dtd = CKEDITOR.dtd;
            for ( var e in CKEDITOR.tools.extend( {}, dtd.$block, dtd.$listItem, dtd.$tableContent ) ) {
              ev.editor.dataProcessor.writer.setRules( e, ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].custom_formatting);
            }
            ev.editor.dataProcessor.writer.setRules( 'pre',
            {
              indent: ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].output_pre_indent
            });
          }
        }

        if (ev.editor.config.bodyClass)
          body.addClass(ev.editor.config.bodyClass);
        if (ev.editor.config.bodyId)
          body.attr('id', ev.editor.config.bodyId);
        if (typeof(Drupal.smileysAttach) != 'undefined' && typeof(ev.editor.dataProcessor.writer) != 'undefined')
          ev.editor.dataProcessor.writer.indentationChars = '    ';

        // Let Drupal trigger formUpdated event [#1895278]
        ((ev.editor.editable && ev.editor.editable()) || ev.editor.document.getBody()).on( 'keyup', function() {
          $(ev.editor.element.$).trigger('keyup');
        });
        ((ev.editor.editable && ev.editor.editable()) || ev.editor.document.getBody()).on( 'keydown', function() {
          $(ev.editor.element.$).trigger('keydown');
        });
      },
      focus : function(ev)
      {
        Drupal.ckeditorInstance = ev.editor;
        Drupal.ckeditorActiveId = ev.editor.name;
      },
      afterCommandExec: function(ev)
      {
        if (ev.data.name != 'maximize') {
          return;
        }
        if (ev.data.command.state == CKEDITOR.TRISTATE_ON) {
          drupalTopToolbar.hide();
        } else {
          drupalTopToolbar.show();
        }
      }
    };

    if (typeof Drupal.settings.ckeditor.scayt_language != 'undefined'){
      textarea_settings['scayt_sLang'] = Drupal.settings.ckeditor.scayt_language;
    }

    if (typeof textarea_settings['js_conf'] != 'undefined'){
      for (var add_conf in textarea_settings['js_conf']){
        textarea_settings[add_conf] = eval(textarea_settings['js_conf'][add_conf]);
      }
    }

    //remove width 100% from settings because this may cause problems with theme css
    if (textarea_settings.width == '100%') textarea_settings.width = '';

    if (CKEDITOR.loadFullCore) {
      CKEDITOR.on('loaded', function() {
        textarea_settings = Drupal.ckeditorLoadPlugins(textarea_settings);
        Drupal.ckeditorInstance = CKEDITOR.replace(textarea_id, textarea_settings);
      });
      CKEDITOR.loadFullCore();
    }
    else {
      textarea_settings = Drupal.ckeditorLoadPlugins(textarea_settings);
      Drupal.ckeditorInstance = CKEDITOR.replace(textarea_id, textarea_settings);
    }
  }

  Drupal.ckeditorOn = function(textarea_id, run_filter) {

    run_filter = typeof(run_filter) != 'undefined' ? run_filter : true;

    if (typeof(textarea_id) == 'undefined' || textarea_id.length == 0 || $("#" + textarea_id).length == 0) {
      return;
    }
    if ((typeof(Drupal.settings.ckeditor.load_timeout) == 'undefined') && (typeof(CKEDITOR.instances[textarea_id]) != 'undefined')) {
      return;
    }
    if (typeof(Drupal.settings.ckeditor.elements[textarea_id]) == 'undefined') {
      return;
    }
    var ckeditor_obj = Drupal.settings.ckeditor;

    if (!CKEDITOR.env.isCompatible) {
      return;
    }

    if (run_filter && ($("#" + textarea_id).val().length > 0) && typeof(ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]]) != 'undefined' && ((ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]]['ss'] == 1 && typeof(Drupal.settings.ckeditor.autostart) != 'undefined' && typeof(Drupal.settings.ckeditor.autostart[textarea_id]) != 'undefined') || ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]]['ss'] == 2)) {
      $.ajax({
        type: 'POST',
        url: Drupal.settings.ckeditor.xss_url,
        async: false,
        data: {
          text: $('#' + textarea_id).val(),
          input_format: ckeditor_obj.textarea_default_format[textarea_id],
          token: Drupal.settings.ckeditor.ajaxToken
        },
        success: function(text){
          $("#" + textarea_id).val(text);
          Drupal.ckeditorInit(textarea_id);
        }
      })
    }
    else {
      Drupal.ckeditorInit(textarea_id);
    }
  };

  /**
 * CKEditor destroy function
 *
 * @param string textarea_id
 */
  Drupal.ckeditorOff = function(textarea_id) {
    if (!CKEDITOR.instances || typeof(CKEDITOR.instances[textarea_id]) == 'undefined') {
      return;
    }
    if (!CKEDITOR.env.isCompatible) {
      return;
    }
    if (Drupal.ckeditorInstance && Drupal.ckeditorInstance.name == textarea_id)
      delete Drupal.ckeditorInstance;

    $("#" + textarea_id).val(CKEDITOR.instances[textarea_id].getData());
    CKEDITOR.instances[textarea_id].destroy(true);

    $("#" + textarea_id).next(".grippie").css("display", "block");
  };

  /**
* Loading selected CKEditor plugins
*
* @param object textarea_settings
*/
  Drupal.ckeditorLoadPlugins = function(textarea_settings) {
    if (typeof(textarea_settings.extraPlugins) == 'undefined') {
      textarea_settings.extraPlugins = '';
    }
    if (typeof CKEDITOR.plugins != 'undefined') {
      for (var plugin in textarea_settings['loadPlugins']) {
        if (typeof(textarea_settings['loadPlugins'][plugin]['active']) == 'undefined' || textarea_settings['loadPlugins'][plugin]['active'] == 1) {
          textarea_settings.extraPlugins += (textarea_settings.extraPlugins) ? ',' + textarea_settings['loadPlugins'][plugin]['name'] : textarea_settings['loadPlugins'][plugin]['name'];
          CKEDITOR.plugins.addExternal(textarea_settings['loadPlugins'][plugin]['name'], textarea_settings['loadPlugins'][plugin]['path']);
        }
      }
    }
    return textarea_settings;
  }

  /**
 * Returns true if CKEDITOR.version >= version
 */
  Drupal.ckeditorCompareVersion = function (version){
    var ckver = CKEDITOR.version;
    ckver = ckver.match(/(([\d]\.)+[\d]+)/i);
    version = version.match(/((\d+\.)+[\d]+)/i);
    ckver = ckver[0].split('.');
    version = version[0].split('.');
    for (var x in ckver) {
      if (ckver[x]<version[x]) {
        return false;
      }
      else if (ckver[x]>version[x]) {
        return true;
      }
    }
    return true;
  };

  Drupal.ckeditorInsertHtml = function(html) {
    if (!Drupal.ckeditorInstance)
      return false;

    if (Drupal.ckeditorInstance.mode == 'wysiwyg') {
      Drupal.ckeditorInstance.insertHtml(html);
      return true;
    }
    else {
      alert(Drupal.t('Content can only be inserted into CKEditor in the WYSIWYG mode.'));
      return false;
    }
  };

  /**
 * Ajax support
 */
  if (typeof(Drupal.Ajax) != 'undefined' && typeof(Drupal.Ajax.plugins) != 'undefined') {
    Drupal.Ajax.plugins.CKEditor = function(hook, args) {
      if (hook === 'submit' && typeof(CKEDITOR.instances) != 'undefined') {
        for (var i in CKEDITOR.instances)
          CKEDITOR.instances[i].updateElement();
      }
      return true;
    };
  }

  //Support for Panels [#679976]
  Drupal.ckeditorSubmitAjaxForm = function () {
    if (typeof(CKEDITOR.instances) != 'undefined' && typeof(CKEDITOR.instances['edit-body']) != 'undefined') {
      Drupal.ckeditorOff('edit-body');
    }
  };

  /**
 * Drupal behaviors
 */
  Drupal.behaviors.ckeditor = {
    attach:
    function (context) {
      if ((typeof(CKEDITOR) == 'undefined') || !CKEDITOR.env.isCompatible) {
        return;
      }

      // make sure the textarea behavior is run first, to get a correctly sized grippie
      if (Drupal.behaviors.textarea && Drupal.behaviors.textarea.attach) {
        Drupal.behaviors.textarea.attach(context);
      }

      $(context).find("textarea.ckeditor-mod:not(.ckeditor-processed)").each(function () {
        var ta_id=$(this).attr("id");
        if (CKEDITOR.instances && typeof(CKEDITOR.instances[ta_id]) != 'undefined'){
          Drupal.ckeditorOff(ta_id);
        }

        if ((typeof(Drupal.settings.ckeditor.autostart) != 'undefined') && (typeof(Drupal.settings.ckeditor.autostart[ta_id]) != 'undefined')) {
          Drupal.ckeditorOn(ta_id);
        }

        if (typeof(Drupal.settings.ckeditor.input_formats[Drupal.settings.ckeditor.elements[ta_id]]) != 'undefined') {
          $('.ckeditor_links').show();
        }

        var sel_format = $("#" + ta_id.substr(0, ta_id.lastIndexOf("-")) + "-format--2");
        if (sel_format && sel_format.not('.ckeditor-processed')) {
          sel_format.addClass('ckeditor-processed').change(function() {
            Drupal.settings.ckeditor.elements[ta_id] = $(this).val();
            if (CKEDITOR.instances && typeof(CKEDITOR.instances[ta_id]) != 'undefined') {
              $('#'+ta_id).val(CKEDITOR.instances[ta_id].getData());
            }
            Drupal.ckeditorOff(ta_id);
            if (typeof(Drupal.settings.ckeditor.input_formats[$(this).val()]) != 'undefined'){
              if ($('#'+ta_id).hasClass('ckeditor-processed')) {
                Drupal.ckeditorOn(ta_id, false);
              }
              else {
                Drupal.ckeditorOn(ta_id);
              }
              $('#switch_'+ta_id).show();
            }
            else {
              $('#switch_'+ta_id).hide();
            }
          });
        }
      });
    },
    detach:
    function(context, settings, trigger){
      $(context).find("textarea.ckeditor-mod.ckeditor-processed").each(function () {
        var ta_id=$(this).attr("id");
        if (CKEDITOR.instances[ta_id])
          $('#'+ta_id).val(CKEDITOR.instances[ta_id].getData());
        if(trigger != 'serialize') {
          Drupal.ckeditorOff(ta_id);
          $(this).removeClass('ckeditor-processed');
        }
      });
    }
  };

  // Support CTools detach event.
  $(document).bind('CToolsDetachBehaviors', function(event, context) {
    Drupal.behaviors.ckeditor.detach(context, {}, 'unload');
  });
})(jQuery);

/**
 * IMCE support
 */
var ckeditor_imceSendTo = function (file, win){
  var cfunc = win.location.href.split('&');

  for (var x in cfunc) {
    if (cfunc[x].match(/^CKEditorFuncNum=\d+$/)) {
      cfunc = cfunc[x].split('=');
      break;
    }
  }
  CKEDITOR.tools.callFunction(cfunc[1], file.url);
  win.close();
}

;
