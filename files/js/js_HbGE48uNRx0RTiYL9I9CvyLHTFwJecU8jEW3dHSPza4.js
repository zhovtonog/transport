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
(function($) {
    $(function() {
        var Loader = new function() {
            var self = this;
            this.template = jQuery('<div id="overlay_ajax_loader" style="display:none;"></div>');
            this.createLoader = function(imgChange, colorChange) {
                imgChange = imgChange || 'loader1';
                colorChange = colorChange || '000';
                var imgWidth, imgHeight;
                if (typeof SignupDrupalLoaderSettings !== 'undefined') {
                    self.template.html('');
                    if (SignupDrupalLoaderSettings.mode == '1') {
                        /* simple mode, only text */
                        self.template.css({ background: '' });
                        jQuery('<div class="loaderText">' + SignupDrupalLoaderSettings.loading_text_simple_mode + '</div>')
                            .css({
                                top: Math.max(0, (jQuery(window).height() / 2)) + "px",
                                color: '#' + SignupDrupalLoaderSettings.color_text_simple_mode
                            })
                            .appendTo(self.template);
                        jQuery(self.template).appendTo('body').show();
                    } else { /* overlay mode */
                        if (SignupDrupalLoaderSettings.overlay_mode == '1') {/* overlay mode, text */
                            jQuery('<div class="loaderText">' + SignupDrupalLoaderSettings.loading_text_overlay_mode + '</div>')
                                .css({
                                    top: Math.max(0, (jQuery(window).height() / 2)) + "px",
                                    color: '#' + SignupDrupalLoaderSettings.color_text_overlay_mode
                                })
                                .appendTo(self.template);
                        } else if (SignupDrupalLoaderSettings.overlay_mode == '3') {
                            if (typeof SignupDrupalCanvasLoaderSettings !== 'undefined') {
                                var canvasBlock = jQuery('<div id="previewCanvasLoader"></div>');
                                canvasBlock.appendTo(self.template);
                                self.template.css('background', '#' + SignupDrupalCanvasLoaderSettings.backColor);
                                jQuery(self.template).appendTo('body').show();
                                var previewCanvasLoader = jQuery('#previewCanvasLoader').length === 0 ? {
                                    setDiameter: function() { },
                                    setDensity: function() { },
                                    setRange: function() { },
                                    setSpeed: function() { },
                                    setFPS: function() { },
                                    setShape: function() { },
                                    setColor: function() { },
                                    show: function() { }
                                } : new CanvasLoader('previewCanvasLoader');
                                previewCanvasLoader.setDiameter(SignupDrupalCanvasLoaderSettings.diameter);
                                previewCanvasLoader.setDensity(SignupDrupalCanvasLoaderSettings.density);
                                previewCanvasLoader.setRange(SignupDrupalCanvasLoaderSettings.range);
                                previewCanvasLoader.setSpeed(SignupDrupalCanvasLoaderSettings.speed);
                                previewCanvasLoader.setFPS(SignupDrupalCanvasLoaderSettings.fps);
                                previewCanvasLoader.setShape(SignupDrupalCanvasLoaderSettings.shape);
                                previewCanvasLoader.setColor('#' + SignupDrupalCanvasLoaderSettings.color);
                                previewCanvasLoader.show();
                                jQuery('#previewCanvasLoader').css({
                                    top: Math.max(0, ((jQuery(window).height() - jQuery('#canvasLoader canvas', canvasBlock).height()) / 2)) + "px",
                                    left: Math.max(0, ((jQuery(window).width() - jQuery('#canvasLoader canvas', canvasBlock).width()) / 2)) + "px",
                                    position: 'relative'
                                });
                            }
                            return true;
                        } else {/* overlay mode, image */
                            var img = jQuery("<img/>")
                                .attr("src", '//' + window.location.host + '/sites/all/modules/custom/loader/img/' + imgChange)
                                .attr("id", 'loading_ajax_loader')
                                .load(function() {
                                    imgWidth = this.width;
                                    imgHeight = this.height;
                                    jQuery(this).css({
                                        top: Math.max(0, ((jQuery(window).height() - imgHeight) / 2)) + "px",
                                        left: Math.max(0, ((jQuery(window).width() - imgWidth) / 2)) + "px"
                                    });
                                    img.appendTo(self.template);
                                });
                        }
                        self.template.css('background', '#' + SignupDrupalLoaderSettings.back_color);
                        jQuery(self.template).appendTo('body').show();
                    }
                }
            };
            this.init = function() {
                $(document).ajaxStart(function() {
                    self.createLoader(SignupDrupalLoaderSettings.loader, '000');
                });
                $(document).ajaxStop(function() {
                    jQuery(self.template).hide();
                });
                $('.js_search_domain_find_btn').click(function(event) {
                    if ($('.js_search_domain_name').val() === 'do the harlem shake!') {
                        event.preventDefault();
                        jQuery(self.template).remove();
                        var embed = document.createElement('object');
                        embed.setAttribute('type', 'audio/wav');
                        embed.setAttribute('data', 'http://' + window.location.hostname + '/sites/all/modules/custom/loader/js/sound.wav');
                        embed.setAttribute('autostart', true);
                        document.getElementsByTagName('body')[0].appendChild(embed);
                        jQuery('[data-module="search_domain"]').addClass('animated shake');
                        setTimeout(function() {
                            jQuery(self.template).remove();
                            jQuery('nav').addClass('animated10 swing');
                            jQuery('.header1').addClass('animated10 swing');
                            jQuery('.js_product_title').addClass('animated11 tada');
                            jQuery('.js_product_price').addClass('animated13 wobble');
                            jQuery('.js_add_product').addClass('animated2 bounce');
                            jQuery('a[href="/cart"]').addClass('animated3 bounceIn');
                            jQuery('#admin-menu-wrapper').addClass('animated9 rotateIn');
                            jQuery('#footer').addClass('animated8 pulse');
                            jQuery('.js_product_terms').addClass('animated shake');
                            jQuery('.js_description').addClass('animated8 pulse');
                            jQuery('.orbit-slides-container').addClass('animated9 rotateIn');
                            jQuery('.flip-container').addClass('animated8 pulse');
                            //jQuery('.dt-banner-box img').addClass('animated4 flash');
                            //jQuery('.js_description').addClass('animated shake');
                            //jQuery('.messages').addClass('animated7 hinge');
                            //jQuery('.su-product-price-box').addClass('animated12 wiggle');
                            //jQuery('.su-product-button-box button').addClass('animated5 flip');
                        }, 15000);
                    }
                });

                window.cL = self.createLoader.bind(this, SignupDrupalLoaderSettings.loader, '000');
            };
        };
        Loader.init();
    });
})(jQuery);

;
