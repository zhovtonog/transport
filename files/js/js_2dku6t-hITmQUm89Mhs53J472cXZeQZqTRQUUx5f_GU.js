/*
* Copyright (c) 2011 Róbert Pataki
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
* 
* ----------------------------------------------------------------------------------------
* 
* Check out my GitHub:	http://github.com/heartcode/
* Send me an email:		heartcode@robertpataki.com
* Follow me on Twitter:	http://twitter.com/#iHeartcode
* Blog:					http://heartcode.robertpataki.com
*/

/**
* CanvasLoader uses the HTML5 canvas element in modern browsers and VML in IE6/7/8 to create and animate the most popular preloader shapes (oval, spiral, rectangle, square and rounded rectangle).<br/><br/>
* It is important to note that CanvasLoader doesn't show up and starts rendering automatically on instantiation. To start rendering and display the loader use the <code>show()</code> method.
* @module CanvasLoader
**/
(function (window) {
	"use strict";
	/**
	* CanvasLoader is a JavaScript UI library that draws and animates circular preloaders using the Canvas HTML object.<br/><br/>
	* A CanvasLoader instance creates two canvas elements which are placed into a placeholder div (the id of the div has to be passed in the constructor). The second canvas is invisible and used for caching purposes only.<br/><br/>
	* If no id is passed in the constructor, the canvas objects are paced in the document directly.
	* @class CanvasLoader
	* @constructor
	* @param id {String} The id of the placeholder div
	* @param opt {Object} Optional parameters<br/><br/>
	* <strong>Possible values of optional parameters:</strong><br/>
	* <ul>
	* <li><strong>id (String):</strong> The id of the CanvasLoader instance</li>
	* <li><strong>safeVML (Boolean):</strong> If set to true, the amount of CanvasLoader shapes are limited in VML mode. It prevents CPU overkilling when rendering loaders with high density. The default value is true.</li>
	**/
	var CanvasLoader = function (id, opt) {
		if (typeof(opt) == "undefined") { opt = {}; }
		this.init(id, opt);
	}, p = CanvasLoader.prototype, engine, engines = ["canvas", "vml"], shapes = ["oval", "spiral", "square", "rect", "roundRect"], cRX = /^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/, ie8 = navigator.appVersion.indexOf("MSIE") !== -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) === 8 ? true : false, canSup = !!document.createElement('canvas').getContext, safeDensity = 40, safeVML = true,
	/**
	* Creates a new element with the tag and applies the passed properties on it
	* @method addEl
	* @protected
	* @param tag {String} The tag to be created
	* @param par {String} The DOM element the new element will be appended to
	* @param opt {Object} Additional properties passed to the new DOM element
	* @return {Object} The DOM element
	*/
		addEl = function (tag, par, opt) {
			var el = document.createElement(tag), n;
			for (n in opt) { el[n] = opt[n]; }
			if(typeof(par) !== "undefined") {
				par.appendChild(el);
			}
			return el;
		},
	/**
	* Sets the css properties on the element
	* @method setCSS
	* @protected
	* @param el {Object} The DOM element to be styled
	* @param opt {Object} The style properties
	* @return {Object} The DOM element
	*/
		setCSS = function (el, opt) {
			for (var n in opt) { el.style[n] = opt[n]; }
			return el;
		},
	/**
	* Sets the attributes on the element
	* @method setAttr
	* @protected
	* @param el {Object} The DOM element to add the attributes to
	* @param opt {Object} The attributes
	* @return {Object} The DOM element
	*/
		setAttr = function (el, opt) {
			for (var n in opt) { el.setAttribute(n, opt[n]); }
			return el;
		},
	/**
	* Transforms the cache canvas before drawing
	* @method transCon
	* @protected
	* @param	x {Object} The canvas context to be transformed
	* @param	x {Number} x translation
	* @param	y {Number} y translation
	* @param	r {Number} Rotation radians
	*/
		transCon = function(c, x, y, r) {
			c.save();
			c.translate(x, y);
			c.rotate(r);
			c.translate(-x, -y);
			c.beginPath();
		};
	/** 
	* Initialization method
	* @method init
	* @protected
	* @param id {String} The id of the placeholder div, where the loader will be nested into
	* @param opt {Object} Optional parameters<br/><br/>
	* <strong>Possible values of optional parameters:</strong><br/>
	* <ul>
	* <li><strong>id (String):</strong> The id of the CanvasLoader instance</li>
	* <li><strong>safeVML (Boolean):</strong> If set to true, the amount of CanvasLoader shapes are limited in VML mode. It prevents CPU overkilling when rendering loaders with high density. The default value is true.</li>
	**/
	p.init = function (pId, opt) {
		
		if (typeof(opt.safeVML) === "boolean") { safeVML = opt.safeVML; }
		
		/*
		* Find the containing div by id
		* If the container element cannot be found we use the document body itself
		*/
		try {
			// Look for the parent element
			if (document.getElementById(pId) !== undefined) {
				this.mum = document.getElementById(pId);
			} else {
				this.mum = document.body;
			}
		} catch (error) {
			this.mum = document.body;
		}
		// Creates the parent div of the loader instance
		opt.id = typeof (opt.id) !== "undefined" ? opt.id : "canvasLoader";
		this.cont = addEl("div", this.mum, {id: opt.id});
		if (canSup) {
		// For browsers with Canvas support...
			engine = engines[0];
			// Create the canvas element
			this.can = addEl("canvas", this.cont);
			this.con = this.can.getContext("2d");
			// Create the cache canvas element
			this.cCan = setCSS(addEl("canvas", this.cont), { display: "none" });
			this.cCon = this.cCan.getContext("2d");
		} else {
		// For browsers without Canvas support...
			engine = engines[1];
			// Adds the VML stylesheet
			if (typeof (CanvasLoader.vmlSheet) === "undefined") {
				document.getElementsByTagName("head")[0].appendChild(addEl("style"));
				CanvasLoader.vmlSheet = document.styleSheets[document.styleSheets.length - 1];
				var a = ["group", "oval", "roundrect", "fill"], n;
				for ( var n = 0; n < a.length; ++n ) { CanvasLoader.vmlSheet.addRule(a[n], "behavior:url(#default#VML); position:absolute;"); }
			}
			this.vml = addEl("group", this.cont);
		}
		// Set the RGB color object
		this.setColor(this.color);
		// Draws the shapes on the canvas
		this.draw();
		//Hides the preloader
		setCSS(this.cont, {display: "none"});
	};
/////////////////////////////////////////////////////////////////////////////////////////////
// Property declarations
	/**
	* The div we place the canvas object into
	* @property cont
	* @protected
	* @type Object
	**/
	p.cont = {};
	/**
	* The div we draw the shapes into
	* @property can
	* @protected
	* @type Object
	**/
	p.can = {};
	/**
	* The canvas context
	* @property con
	* @protected
	* @type Object
	**/
	p.con = {};
	/**
	* The canvas we use for caching
	* @property cCan
	* @protected
	* @type Object
	**/
	p.cCan = {};
	/**
	* The context of the cache canvas
	* @property cCon
	* @protected
	* @type Object
	**/
	p.cCon = {};
	/**
	* Adds a timer for the rendering
	* @property timer
	* @protected
	* @type Boolean
	**/
	p.timer = {};
	/**
	* The active shape id for rendering
	* @property activeId
	* @protected
	* @type Number
	**/
	p.activeId = 0;
	/**
	* The diameter of the loader
	* @property diameter
	* @protected
	* @type Number
	* @default 40
	**/
	p.diameter = 40;
	/**
	* Sets the diameter of the loader
	* @method setDiameter
	* @public
	* @param diameter {Number} The default value is 40
	**/
	p.setDiameter = function (diameter) { this.diameter = Math.round(Math.abs(diameter)); this.redraw(); };
	/**
	* Returns the diameter of the loader.
	* @method getDiameter
	* @public
	* @return {Number}
	**/
	p.getDiameter = function () { return this.diameter; };
	/**
	* The color of the loader shapes in RGB
	* @property cRGB
	* @protected
	* @type Object
	**/
	p.cRGB = {};
	/**
	* The color of the loader shapes in HEX
	* @property color
	* @protected
	* @type String
	* @default "#000000"
	**/
	p.color = "#000000";
	/**
	* Sets hexadecimal color of the loader
	* @method setColor
	* @public
	* @param color {String} The default value is '#000000'
	**/
	p.setColor = function (color) { this.color = cRX.test(color) ? color : "#000000"; this.cRGB = this.getRGB(this.color); this.redraw(); };
	/**
	* Returns the loader color in a hexadecimal form
	* @method getColor
	* @public
	* @return {String}
	**/
	p.getColor = function () { return this.color; };
	/**
	* The type of the loader shapes
	* @property shape
	* @protected
	* @type String
	* @default "oval"
	**/
	p.shape = shapes[0];
	/**
	* Sets the type of the loader shapes.<br/>
	* <br/><b>The acceptable values are:</b>
	* <ul>
	* <li>'oval'</li>
	* <li>'spiral'</li>
	* <li>'square'</li>
	* <li>'rect'</li>
	* <li>'roundRect'</li>
	* </ul>
	* @method setShape
	* @public
	* @param shape {String} The default value is 'oval'
	**/
	p.setShape = function (shape) {
		var n;
		for (n in shapes) {
			if (shape === shapes[n]) { this.shape = shape; this.redraw(); break; }
		}
	};
	/**
	* Returns the type of the loader shapes
	* @method getShape
	* @public
	* @return {String}
	**/
	p.getShape = function () { return this.shape; };
	/**
	* The number of shapes drawn on the loader canvas
	* @property density
	* @protected
	* @type Number
	* @default 40
	**/
	p.density = 40;
	/**
	* Sets the number of shapes drawn on the loader canvas
	* @method setDensity
	* @public
	* @param density {Number} The default value is 40
	**/
	p.setDensity = function (density) { 
		if (safeVML && engine === engines[1]) {
			this.density = Math.round(Math.abs(density)) <= safeDensity ? Math.round(Math.abs(density)) : safeDensity;
		} else {
			this.density = Math.round(Math.abs(density));
		}
		if (this.density > 360) { this.density = 360; }
		this.activeId = 0;
		this.redraw();
	};
	/**
	* Returns the number of shapes drawn on the loader canvas
	* @method getDensity
	* @public
	* @return {Number}
	**/
	p.getDensity = function () { return this.density; };
	/**
	* The amount of the modified shapes in percent.
	* @property range
	* @protected
	* @type Number
	**/
	p.range = 1.3;
	/**
	* Sets the amount of the modified shapes in percent.<br/>
	* With this value the user can set what range of the shapes should be scaled and/or faded. The shapes that are out of this range will be scaled and/or faded with a minimum amount only.<br/>
	* This minimum amount is 0.1 which means every shape which is out of the range is scaled and/or faded to 10% of the original values.<br/>
	* The visually acceptable range value should be between 0.4 and 1.5.
	* @method setRange
	* @public
	* @param range {Number} The default value is 1.3
	**/
	p.setRange = function (range) { this.range = Math.abs(range); this.redraw(); };
	/**
	* Returns the modified shape range in percent
	* @method getRange
	* @public
	* @return {Number}
	**/
	p.getRange = function () { return this.range; };
	/**
	* The speed of the loader animation
	* @property speed
	* @protected
	* @type Number
	**/
	p.speed = 2;
	/**
	* Sets the speed of the loader animation.<br/>
	* This value tells the loader how many shapes to skip by each tick.<br/>
	* Using the right combination of the <code>setFPS</code> and the <code>setSpeed</code> methods allows the users to optimize the CPU usage of the loader whilst keeping the animation on a visually pleasing level.
	* @method setSpeed
	* @public
	* @param speed {Number} The default value is 2
	**/
	p.setSpeed = function (speed) { this.speed = Math.round(Math.abs(speed)); };
	/**
	* Returns the speed of the loader animation
	* @method getSpeed
	* @public
	* @return {Number}
	**/
	p.getSpeed = function () { return this.speed; };
	/**
	* The FPS value of the loader animation rendering
	* @property fps
	* @protected
	* @type Number
	**/
	p.fps = 24;
	/**
	* Sets the rendering frequency.<br/>
	* This value tells the loader how many times to refresh and modify the canvas in 1 second.<br/>
	* Using the right combination of the <code>setSpeed</code> and the <code>setFPS</code> methods allows the users to optimize the CPU usage of the loader whilst keeping the animation on a visually pleasing level.
	* @method setFPS
	* @public
	* @param fps {Number} The default value is 24
	**/
	p.setFPS = function (fps) { this.fps = Math.round(Math.abs(fps)); this.reset(); };
	/**
	* Returns the fps of the loader
	* @method getFPS
	* @public
	* @return {Number}
	**/
	p.getFPS = function () { return this.fps; };
// End of Property declarations
/////////////////////////////////////////////////////////////////////////////////////////////	
	/**
	* Return the RGB values of the passed color
	* @method getRGB
	* @protected
	* @param color {String} The HEX color value to be converted to RGB
	*/
	p.getRGB = function (c) {
		c = c.charAt(0) === "#" ? c.substring(1, 7) : c;
		return {r: parseInt(c.substring(0, 2), 16), g: parseInt(c.substring(2, 4), 16), b: parseInt(c.substring(4, 6), 16) };
	};
	/**
	* Draw the shapes on the canvas
	* @method draw
	* @protected
	*/
	p.draw = function () {
		var i = 0, size, w, h, x, y, ang, rads, rad, de = this.density, animBits = Math.round(de * this.range), bitMod, minBitMod = 0, s, g, sh, f, d = 1000, arc = 0, c = this.cCon, di = this.diameter, e = 0.47;
		if (engine === engines[0]) {
			c.clearRect(0, 0, d, d);
			setAttr(this.can, {width: di, height: di});
			setAttr(this.cCan, {width: di, height: di});
			while (i < de) {
				bitMod = i <= animBits ? 1 - ((1 - minBitMod) / animBits * i) : bitMod = minBitMod;
				ang = 270 - 360 / de * i;
				rads = ang / 180 * Math.PI;
				c.fillStyle = "rgba(" + this.cRGB.r + "," + this.cRGB.g + "," + this.cRGB.b + "," + bitMod.toString() + ")";
				switch (this.shape) {
				case shapes[0]:
				case shapes[1]:
					size = di * 0.07;
					x = di * e + Math.cos(rads) * (di * e - size) - di * e;
					y = di * e + Math.sin(rads) * (di * e - size) - di * e;
					c.beginPath();
					if (this.shape === shapes[1]) { c.arc(di * 0.5 + x, di * 0.5 + y, size * bitMod, 0, Math.PI * 2, false); } else { c.arc(di * 0.5 + x, di * 0.5 + y, size, 0, Math.PI * 2, false); }
					break;
				case shapes[2]:
					size = di * 0.12;
					x = Math.cos(rads) * (di * e - size) + di * 0.5;
					y = Math.sin(rads) * (di * e - size) + di * 0.5;
					transCon(c, x, y, rads);
					c.fillRect(x, y - size * 0.5, size, size);
					break;
				case shapes[3]:
				case shapes[4]:
					w = di * 0.3;
					h = w * 0.27;
					x = Math.cos(rads) * (h + (di - h) * 0.13) + di * 0.5;
					y = Math.sin(rads) * (h + (di - h) * 0.13) + di * 0.5;
					transCon(c, x, y, rads);
					if(this.shape === shapes[3]) {
						c.fillRect(x, y - h * 0.5, w, h);
					} else {
						rad = h * 0.55;
						c.moveTo(x + rad, y - h * 0.5);
						c.lineTo(x + w - rad, y - h * 0.5);
						c.quadraticCurveTo(x + w, y - h * 0.5, x + w, y - h * 0.5 + rad);
						c.lineTo(x + w, y - h * 0.5 + h - rad);
						c.quadraticCurveTo(x + w, y - h * 0.5 + h, x + w - rad, y - h * 0.5 + h);
						c.lineTo(x + rad, y - h * 0.5 + h);
						c.quadraticCurveTo(x, y - h * 0.5 + h, x, y - h * 0.5 + h - rad);
						c.lineTo(x, y - h * 0.5 + rad);
						c.quadraticCurveTo(x, y - h * 0.5, x + rad, y - h * 0.5);
					}
					break;
				}
				c.closePath();
				c.fill();
				c.restore();
				++i;
			}
		} else {
			setCSS(this.cont, {width: di, height: di});
			setCSS(this.vml, {width: di, height: di});
			switch (this.shape) {
			case shapes[0]:
			case shapes[1]:
				sh = "oval";
				size = d * 0.14;
				break;
			case shapes[2]:
				sh = "roundrect";
				size = d * 0.12;
				break;
			case shapes[3]:
			case shapes[4]:
				sh = "roundrect";
				size = d * 0.3;
				break;
			}
			w = h = size;
			x = d * 0.5 - h;
			y = -h * 0.5;		
			while (i < de) {
				bitMod = i <= animBits ? 1 - ((1 - minBitMod) / animBits * i) : bitMod = minBitMod;
				ang = 270 - 360 / de * i;
				switch (this.shape) {
				case shapes[1]:
					w = h = size * bitMod;
					x = d * 0.5 - size * 0.5 - size * bitMod * 0.5;
					y = (size - size * bitMod) * 0.5;
					break;
				case shapes[0]:
				case shapes[2]:
					if (ie8) {
						y = 0;
						if(this.shape === shapes[2]) {
							x = d * 0.5 -h * 0.5;
						}
					}
					break;
				case shapes[3]:
				case shapes[4]:
					w = size * 0.95;
					h = w * 0.28;
					if (ie8) {
						x = 0;
						y = d * 0.5 - h * 0.5;
					} else {
						x = d * 0.5 - w;
						y = -h * 0.5;
					}
					arc = this.shape === shapes[4] ? 0.6 : 0; 
					break;
				}
				g = setAttr(setCSS(addEl("group", this.vml), {width: d, height: d, rotation: ang}), {coordsize: d + "," + d, coordorigin: -d * 0.5 + "," + (-d * 0.5)});
				s = setCSS(addEl(sh, g, {stroked: false, arcSize: arc}), { width: w, height: h, top: y, left: x});
				f = addEl("fill", s, {color: this.color, opacity: bitMod});
				++i;
			}
		}
		this.tick(true);
	};
	/**
	* Cleans the canvas
	* @method clean
	* @protected
	*/
	p.clean = function () {
		if (engine === engines[0]) {
			this.con.clearRect(0, 0, 1000, 1000);
		} else {
			var v = this.vml;
			if (v.hasChildNodes()) {
				while (v.childNodes.length >= 1) {
					v.removeChild(v.firstChild);
				}
			}
		}
	};
	/**
	* Redraws the canvas
	* @method redraw
	* @protected
	*/
	p.redraw = function () {
			this.clean();
			this.draw();
	};
	/**
		* Resets the timer
		* @method reset
		* @protected
		*/
		p.reset = function () {
			if (typeof (this.timer) === "number") {
				this.hide();
				this.show();
			}
		};
	/**
	* Renders the loader animation
	* @method tick
	* @protected
	*/
	p.tick = function (init) {
		var c = this.con, di = this.diameter;
		if (!init) { this.activeId += 360 / this.density * this.speed; }
		if (engine === engines[0]) {
			c.clearRect(0, 0, di, di);
			transCon(c, di * 0.5, di * 0.5, this.activeId / 180 * Math.PI);
			c.drawImage(this.cCan, 0, 0, di, di);
			c.restore();
		} else {
			if (this.activeId >= 360) { this.activeId -= 360; }
			setCSS(this.vml, {rotation:this.activeId});
		}
	};
	/**
	* Shows the rendering of the loader animation
	* @method show
	* @public
	*/
	p.show = function () {
		if (typeof (this.timer) !== "number") {
			var t = this;
			this.timer = self.setInterval(function () { t.tick(); }, Math.round(1000 / this.fps));
			setCSS(this.cont, {display: "block"});
		}
	};
	/**
	* Stops the rendering of the loader animation and hides the loader
	* @method hide
	* @public
	*/
	p.hide = function () {
		if (typeof (this.timer) === "number") {
			clearInterval(this.timer);			
			delete this.timer;
			setCSS(this.cont, {display: "none"});
		}
	};
	/**
	* Removes the CanvasLoader instance and all its references
	* @method kill
	* @public
	*/
	p.kill = function () {
		var c = this.cont;
		if (typeof (this.timer) === "number") { this.hide(); }
		if (engine === engines[0]) {
			c.removeChild(this.can);
			c.removeChild(this.cCan);
		} else {
			c.removeChild(this.vml);
		}
		var n;
		for (n in this) { delete this[n]; }
	};
	window.CanvasLoader = CanvasLoader;
}(window));;
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
 /**
 * Library for wte module.
 *
 * @version 1.0.0
 */
(function(global, $){

	/**
	* Creates an instance of Wte.
	*
	* @constructor
	* @return {Wte} Run initialising method.
	*/
	var Wte = function(){
		return new Wte.init();
	};

	var _this, modifyData = Object.create(null), listColorPic, listInput, listBorder, params = {},
		mainObj = {}, configObj = {}, selectorCss = {}, chanches = {}, status = {}, clearForm = false;

	/**
  * Object contains data-selector and his css selector
 	*
	* @private
	*/
	selectorCss = {
    'menu-vnormal':'div[data-module="sidebar-menu"] li a',
    'menu-vhover':'div[data-module="sidebar-menu"] li a:hover',
    'menu-vactive':'div[data-module="sidebar-menu"] li.active a',
		'menu-hover':'nav section.top-bar-section ul > li:not(.has-form) > a:not(.button):hover, nav section.top-bar-section ul > li:not(.has-form) > a:not(.button).active:hover',
		'menu-normal':'nav section.top-bar-section ul > li:not(.has-form) > a:not(.button)',
		'menu-active':'nav section.top-bar-section ul > li:not(.has-form) > a:not(.button).active',
		'menu-background':'.show-for-large-up nav[role=navigation]',
    'menu-background-full-size':'.contain-to-grid.main-menu',
		'menu-background-first':'.show-for-large-up nav[role=navigation], #main-menu > ul > li:nth-child(1), #main-menu > ul > li:nth-child(1) a',
		'menu-background-first-block': '.show-for-large-up nav[role=navigation] div.region div.block table {border-collapse: inherit;} .show-for-large-up nav[role=navigation], .show-for-large-up nav[role=navigation] div.region div.block table',
		'submenu-normal':'.show-for-large-up nav[role=navigation] section.top-bar-section div.block ul.dropdown > ul li:not(.has-form):not(.active) > a:not(.button)',
		'submenu-hover':'.show-for-large-up nav[role=navigation] section.top-bar-section div.block ul.dropdown > ul li:not(.has-form):not(.active) > a:not(.button):hover',
		'h1':'h1, .panel h1',
		'h2':'h2, .panel h2',
		'h3':'h3, .panel h3',
		'h4':'h4, .panel h4',
		'h5':'h5, .panel h5',
		'h6':'h6, .panel h6',
		'text':'.main-section p:not(.not_theme_editor), span:not(.not_theme_editor)',
		'links':'.main-section a:not(.button), #footer a, header a',
		'tables-border':'table:not(.style-theme-table) {border-spacing: 0;} table:not(.style-theme-table) { border-collapse: inherit;} table:not(.style-theme-table), .cke_show_borders table.cke_show_border:not(.style-theme-table)',
		'tables-header':'table:not(.style-theme-table) thead tr th, .cke_show_borders table:not(.style-theme-table).cke_show_border thead tr th, table:not(.style-theme-table) tr th, .cke_show_borders table.cke_show_border:not(.style-theme-table) tr th',
		'tables-rows':'table:not(.style-theme-table) tr td, .cke_show_borders table.cke_show_border:not(.style-theme-table) tr td',
		'tables-rows-background-odd': 'table tbody tr:nth-child(odd), .cke_show_borders table.cke_show_border tbody tr:nth-child(odd), .js_productsList div.odd, div.js_header',
		'tables-rows-background-even': 'table tbody tr:nth-child(even), .cke_show_borders table.cke_show_border tbody tBrackets Working File Tabsr:nth-child(even), div[data-module="complex_cart"] .one-group-items.even, .js_productsList div.even',
		'field-errors':'.su-validation-error-box',
		'generic-errors':'.html div#jGrowl div.ui-state-highlight',
		'forms':'input[type="text"], input[type="text"]:focus, input[type="number"]:focus, input[type="password"], input[type="password"]:focus, input[type="email"], input[type="email"]:focus, input[type="number"], input[type="search"], input[type="search"]:focus, input[type="tel"], input[type="tel"]:focus, input[type="url"], input[type="url"]:focus, textarea, select:hover, select',
		'label-forms':'label',
		'radio':'body input[type="radio"] {opacity: 0;} body input[type="radio"]:not(checked) + label { position: relative;padding-left:36px;} body input[type="radio"] {height: 17px; margin: 0 3px 0 0; vertical-align: top; width: 17px;} body input[type="radio"]:not(checked) + label:before {border-radius: 50%; content: "";height: 22px; left: 0;position: absolute; top: -3px;width: 22px; border-width: 1px;} body input[type="radio"]:not(checked) + label:before',
		'radio-after':'body input[type="radio"]:checked + label:after { opacity: 1; } body input[type="radio"]:not(checked) + label:after {border-radius: 50%;content:"";height: 15px;left: 4px;opacity: 0; position: absolute; top: 0px; width: 15px;}input[type="radio"]:not(checked) + label:after',
		'radio-text':'body input[type="radio"]:not(.font_style) + label',
		'checkboxes':'.panel input[type="checkbox"]:not(checked) + label {position: relative;} .panel input[type="checkbox"] + label {cursor: pointer; padding-left: 36px;} .switch input[type="checkbox"] + label {margin-bottom: 12px; width: 0px; height:0px;} .panel input[type="checkbox"]:checked + label::after {opacity: 1;background-color: transparent;left: 5px;} .panel input[type="checkbox"]:not(checked) + label::after {content: "✔";height: 16px;left: 5px;opacity: 0;position: absolute;top: -2px;width: 16px;} .panel input[type="checkbox"]:not(checked) {opacity: 0;position: absolute;} .panel input[type="checkbox"] {height: 17px;margin: 0 3px 0 0;vertical-align: top;width: 17px;} .panel input[type="checkbox"]:not(checked) + label::before {content: "";height: 22px;left: 0;position: absolute;top: -3px;width: 22px;}.panel input[type="checkbox"]:not(checked) + label::before ',
		'checkboxes-after':'.panel input[type="checkbox"]:not(checked) {opacity: 0;position: absolute;} .panel input[type="checkbox"] {height: 17px;margin: 0 3px 0 0;vertical-align: top;width: 17px;} .panel input[type="checkbox"]:not(checked) + label::before {content: "";height: 22px;left: 0;position: absolute;top: -3px;width: 22px;} .panel input[type="checkbox"]:not(checked) + label {position: relative;} .panel input[type="checkbox"] + label {cursor: pointer; padding-left: 36px;} .switch input[type="checkbox"] + label {margin-bottom: 12px; width: 0px; height:0px;} .panel input[type="checkbox"]:checked + label::after {opacity: 1;background-color: transparent;left: 5px;} .panel input[type="checkbox"]:not(checked) + label::after {content: "✔";height: 16px;left: 5px;opacity: 0;position: absolute;top: -2px;width: 16px;} .panel input[type="checkbox"]:not(checked) + label::after ',
		'checkboxes-text':'.panel input[type="checkbox"]:not(.font_style) + label',
		'button-normal':'a.button, button, button.button, input.button, .button-group > li > .button',
		'buttons-hover':'a.button:hover, button:hover, button.button:hover, input.button:hover',
		'button-active':'a.button.active, button:hover.active, button.button.active, input.button.active',
		'default-checkout':'.tabs dd > a, .tabs .tab-title > a, .quicktabs-tabs .disabled a, .accordion dd > a',
		'hover-checkout':'.tabs dd a:hover, .tabs .tab-title a:hover, .accordion dd.active > a:hover',
		'active-checkout':'.tabs dd.active a, .tabs .tab-title.active a, .accordion dd.active > a',
		'body-page':'.off-canvas-wrap',
		'default-page':'.panel, section.row, .content',
		'footer':'#footer',
		'tld-normal':'div[data-module="main_tlds"] .row div:not(.disabled) a, div[data-module="additional_tlds"] .inline-tld-list > div:not(.disabled) a',
		'tld-hover':'div[data-module="main_tlds"] .row a:hover, div[data-module="additional_tlds"] .inline-tld-list > div a:hover',
		'tld-active':'div[data-module="main_tlds"] .row > div.active a, div[data-module="additional_tlds"] .inline-tld-list > div.active a',
		'tld-inactive':'div[data-module="main_tlds"] .row > div.disabled a, div[data-module="additional_tlds"] .inline-tld-list > div.disabled a'
	};

	/**
	* Array contains data-selector wich need prefix '#'
	*
	* @private
	*/
	listColorPic = ['color','border-color', 'background-color', 'text-shadow-color', 'box-shadow-color',
		'font-color', 'background', 'gradient-first' ,'gradient-second'];

	/**
	* Array contains data-selector wich need prefix 'px'
	*
	* @private
	*/
	listInput = ['font-size', 'font-style', 'padding-top', 'margin-top',
	  'margin-right', 'margin-bottom', 'margin-left', 'padding-bottom',
	  'padding-left','padding-right' , 'border-width', 'width', 'border-top-left-radius',
	  'border-top-right-radius', 'border-bottom-left-radius',	'border-bottom-right-radius',
	  'height', 'text-shadow-y', 'text-shadow-x', 'text-shadow-blur', 'box-shadow-y',
		'box-shadow-x', 'box-shadow-blur', 'border-style'];

	/**
	* Array contains data-selector wich need prefix 'px solid'
	*
	* @private
	*/
	listBorder = ['border'];

	/**
	* Object contains logic methods
	*
	* @private
	*/
	modifyData = {

		/**
		* Get value from curren dom element and push to object 'params'
		*
		* @this {modifyData}
		* @param {object} dom Element which chenge
		*/
		getData: function (dom) {
			var currentClass, data, value, option;

			data = dom[0].dataset;
			option = data.option;
			if ('checkboxes-after' === data.selector || 'checkboxes' === data.selector) {
				this.removeClassHideCustomCheckbox();
			}
			if ( 'font-family' === option ) {
				value = dom.val();
			} else if ( 'menu-background-file' === data.selector ) {
				var file = dom[0].files[0];
				if ( file ) {
					var reader = new FileReader();
					reader.readAsDataURL(file);
		        	reader.onload = function (e) {
        		    	$('nav.navigation').css('background', 'url(' + reader.result + ') repeat-x');
	       			}
				}
				return true;
			} else {
				currentClass = dom.attr('class');
				if ( -1 !== currentClass.indexOf(' ') ){
					currentClass = currentClass
						.slice(0, currentClass.indexOf(' '));
				}
				switch( currentClass ){
					case 'form-text':
					case 'form-colorpicker':
						value = this.prefix(option) +	dom.val() + this.postfix(option);
						this.validator(dom.val(), dom);
					break
					case 'font_style':
					case 'form-checkbox':
						if ( dom.prop('checked') ){
							switch ( option ) {
								case 'text-decoration': value = 'underline';
								break;
								case 'font-weight': value = 'bold';
								break;
								case 'font-style': value = 'italic';
								break;
							}
						} else {
							value = ('text-decoration' === option) ? 'none' : 'normal';
						}
					break
					default:
						value = '';
				}
			}
			if ( !status.init ) {
				if ( (-1 !== data.selector.indexOf('menu-background-first') && !$('.contain-to-grid').length) ||
					(-1 !== data.selector.indexOf('menu-background-first-block') && !$('.contain-to-grid').length)) {
					var cntMenuBlock = $('.show-for-large-up .navigation div.region div.block').length;
					data.selector = (1 >= cntMenuBlock) ? 'menu-background-first' : 'menu-background-first-block' ;
				}
			}

          if ( -1 !== data.selector.indexOf('menu-background') && $('.contain-to-grid').length ) {
                  data.selector = 'menu-background-full-size';
                  if ( option === 'background-color' ) {
                    params['@wte-menu-background-' + option] = value;
                    this.dataAllChanges('menu-background', option, value);
                  }
                }
/*          if ( !status.init ) {
				if ( -1 !== data.selector.indexOf('menu-background-first') ||
					-1 !== data.selector.indexOf('menu-background-first-block')) {
					var cntMenuBlock = $('.show-for-large-up .navigation div.region div.block').length;
					data.selector = (1 >= cntMenuBlock) ? 'menu-background-first' : 'menu-background-first-block' ;
				} else if ( -1 !== data.selector.indexOf('menu-background') && $('.contain-to-grid').length && option === 'background-color' ) {
                    data.selector = 'menu-background-full-size';
                }
			}*/
			params['@wte-' + data.selector + '-' + option] = value;
			if ( !status.init ) {
				if ( -1 !== option.indexOf('shadow') ) {
					value = this.shadowValue(dom);
					option = this.shadowType(option) + '-shadow';
				}

				if ( -1 !== option.indexOf('border-width')
					|| -1 !== option.indexOf('border-color') ) {
					this.dataAllChanges(data.selector, 'border-style', 'solid')
					params['@wte-' + data.selector + '-border-style'] = 'solid';
				}

				this.dataAllChanges(data.selector, option, value);
			}
		},

		/**
		* Get object 'params' and update less vars
		*
		* @return {boolean}
		*/
		setCss: function () {
			less.modifyVars(params);
			return true;
		},

		/**
		* Take string and check for match in listColorPic array
		*
		* @param {string} type String witch contains data-option
		* @return {string}
		*/
		prefix: function(type){
			if ( -1 !== listColorPic.indexOf(type) ) {
				return '#';
			}
			return '';
		},

		/**
		* Take string and check for match in listInput or listBorder array
		*
		* @param {string} type String witch contains data-option
		* @return {string}
		*/
		postfix: function(type){
			if( -1 !== listInput.indexOf(type) ){
				return 'px';
			} else if ( -1 !== listBorder.indexOf(type) ) {
				return 'px solid';
			}
			return '';
		},

		/**
		* Validate current value from dom.
		*
		* @param {string} value Current value from dom
		* @param {object} input Current dom
		*/
		validator: function(value, input){
			var check, inputId, submit, validateSubbmit, messageExists;

			inputId = $(input).attr('id');
			submit = $('#edit-editor-submit');
			if ( -1 !== inputId.indexOf('shadow-color')
				|| -1 !== inputId.indexOf('font-weight')
				|| -1 !== inputId.indexOf('color')
				|| -1 !== inputId.indexOf('background-color')
				|| -1 !== inputId.indexOf('background')
				){
				check = null;
			} else if ( -1 !== inputId.indexOf('shadow')
				|| -1 !== inputId.indexOf('margin') ){
				check = value.match(/[^-0-9]/);
			} else {
				check = value.match(/[^0-9]/);
			}

			if ( '' === value || null !== check){
				$(input).addClass('error');
				if ( !$(submit).prop('disabled') ) {
					$(submit).attr('disabled', 'disabled');
				}
			} else {
				$(input).removeClass('error');
				validateSubbmit = $('.error');
				if ( true === validateSubbmit.is('.messages.error') ){
					messageExists = 1;
				} else {
					messageExists = 0;
				}
				if ( messageExists === validateSubbmit.length ){
					$(submit).removeAttr('disabled');
				}
			}
		},

		/**
		* Take all input and invoke callback function with everyone
		*
		* @param {array} arr All input and select in page
		* @param {function}
		*/
		dataAll: function (arr, fn) {
			for ( var i = 0, length = arr.length; i < length ; i += 1 ) {
				fn( arr[i] );
			}
		},

		setClassHideCustomCheckbox: function (){
			$('[wte="checkboxes"] .wrapper input').addClass('hide-checkboxes');
		},

		removeClassHideCustomCheckbox: function (){
			$('[wte="checkboxes"] .wrapper input').removeClass('hide-checkboxes');
		},
		/**
		* Create object for backend
		*
		* @param {string} selector Css selector from data attribute in input
		* @param {string} option Css type from data attribute in input
		* @param {string} value Css value for css type
		*/
		dataAllChanges: function (selector, option, value) {
			if( selectorCss.hasOwnProperty(selector) ) {
				selector = selectorCss[selector];
			}

			if ( mainObj.hasOwnProperty(selector) ) {
				configObj = mainObj[selector];
				configObj[option] = value;
			} else {
				configObj = {};
				configObj[option] = value;
			}
			mainObj[selector] = configObj;
		},

		/**
		* Create from element css value
		*
		* @param {object} element Shadow dom element
		* @returns {string}
		*/
		shadowValue: function (element) {
			var arr = $(element).closest('.row').find('input[data-option *= "shadow"]');
			var shadow = {x: '0', y: '0', blur: '0', color: 'ffffff'};
			for (var i = 0, length = arr.length ; i < length ;  i++ ) {
				var dataCur = arr[i].dataset;
				var param = dataCur.option.split('-');
				var attrib = param[param.length - 1];
				shadow[attrib] = arr[i].value;
			}
			return shadow.x + 'px ' + shadow.y + 'px ' + shadow.blur + 'px #' + shadow.color;
		},

		/**
		* Return type shadow style
		*
		* @param {string} option String with css type
		* @returns {string}
		*/
		shadowType: function (option) {
			return option.split('-').shift();
		},

		checkClearForm: function() {
			for( var prop in mainObj ){
				if ( mainObj.hasOwnProperty(prop) ){
					if ( -1 !== prop.indexOf('input[type="checkbox"]:not(checked)') ) {
						clearForm = true;
					}
				}
			}
			return clearForm;
		},
	};
	// public method
	Wte.prototype = {
		/**
		* If data not empty, from dom read value and set to less vars
		*
		* @param {object} data Dom element
		*/
		setData: function(data) {
			dom = data || '';
			if ( dom.length !== 0 ) {
				modifyData.getData(dom);
				modifyData.setCss();
			}
		},

		/**
		* Object chenged elements
		*
		* @return {object}
		*/
		sendSubmit: function() {
			return mainObj;
		},

		/**
		* Set current setting for preview
		*
		* @return {bolean}
		*/
		init: function() {
			status.init = true;
			var arrAllInput = $('input[data-option], select[data-option]');

			modifyData.dataAll(arrAllInput, function(item) {
				if ( item.dataset.hasOwnProperty('value') && '1' === item.dataset.value ) {
					$(item).attr('checked', true);
					$(item).parent().addClass('tester');
				}
				modifyData.getData($(item));
			});
			modifyData.setCss();
			var css = $('input[type="hidden"].saveCss')[0].value;
			if ('' !== css) {
				mainObj = JSON.parse(css);
			}
			if ( modifyData.checkClearForm() ) {
				modifyData.removeClassHideCustomCheckbox();
			} else {
				modifyData.setClassHideCustomCheckbox();
			}
			status.init = false;
			return true;
		}
	};

	/**
	* Initialise Wte object
	* @this {Wte}
	*/
	Wte.init = function(){
		_this = this;
		this.init();
	};

	Wte.init.prototype = Wte.prototype;
	global.Drupal.wte = Wte;
})(window, jQuery);
;
(function($){
  $(document).ready(function() {
    //edit link
    $('div.field').append('<div class="edit"><span>Edit</span></div>');
    $('.edit > span').on('click', function(){
      $(this).parents('.field:first').find('.fieldset-title:first').click();
    });

    //italic icon
    $('input[value="italic"]').parent().addClass('italic');

    //bold icon
    $('input[value="bold"]').parent().addClass('bold');

    //underline icon
    $('input[value="underline"]').parent().addClass('underline');

    $('.show').on('click', function(){
      return false;
    });

    //button upload image
    $('#edit-editor-menu-background-wte-menu-background-background-file-ajax-wrapper').addClass('large-3 columns');
    $('input[type="file"]').attr('data-selector', 'menu-background-file');

    var obj = Drupal.wte();

    $('input[type="submit"]').on('click', function(){
      var css = obj.sendSubmit();
      $('input[type="hidden"]')[0].value = JSON.stringify(css);
      if(window.cL){
        window.cL();
      }
      return true;
    });

    $('input[data-option], select[data-option], input[type="file"]')
      .change(function(){
        var element = $(this);
       obj.setData(element);
    });

    $('input[data-option], select[data-option]')
      .keyup(function(){
        var element = $(this);
        obj.setData(element);
      });
  });
})(jQuery);
;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
/**
 *
 * Color picker
 * Author: Stefan Petre www.eyecon.ro
 * 
 * Dual licensed under the MIT and GPL licenses
 * 
 */
(function ($) {
	var idn = 0;
	var ColorPicker = function () {
		var
			ids = {},
			inAction,
			charMin = 65,
			visible,
			tpl = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',
			defaults = {
				eventName: 'click',
				onShow: function () {},
				onBeforeShow: function(){},
				onHide: function () {},
				onChange: function () {},
				onSubmit: function () {},
				color: 'ff0000',
				livePreview: true,
				flat: false
			},
			fillRGBFields = function  (hsb, cal) {
				var rgb = HSBToRGB(hsb);
				$(cal).data('colorpicker').fields
					.eq(1).val(rgb.r).end()
					.eq(2).val(rgb.g).end()
					.eq(3).val(rgb.b).end();
			},
			fillHSBFields = function  (hsb, cal) {
				$(cal).data('colorpicker').fields
					.eq(4).val(hsb.h).end()
					.eq(5).val(hsb.s).end()
					.eq(6).val(hsb.b).end();
			},
			fillHexFields = function (hsb, cal) {
				$(cal).data('colorpicker').fields
					.eq(0).val(HSBToHex(hsb)).end();
			},
			setSelector = function (hsb, cal) {
				$(cal).data('colorpicker').selector.css('backgroundColor', '#' + HSBToHex({h: hsb.h, s: 100, b: 100}));
				$(cal).data('colorpicker').selectorIndic.css({
					left: parseInt(150 * hsb.s/100, 10),
					top: parseInt(150 * (100-hsb.b)/100, 10)
				});
			},
			setHue = function (hsb, cal) {
				$(cal).data('colorpicker').hue.css('top', parseInt(150 - 150 * hsb.h/360, 10));
			},
			setCurrentColor = function (hsb, cal) {
				$(cal).data('colorpicker').currentColor.css('backgroundColor', '#' + HSBToHex(hsb));
			},
			setNewColor = function (hsb, cal) {
				$(cal).data('colorpicker').newColor.css('backgroundColor', '#' + HSBToHex(hsb));
			},
			keyDown = function (ev) {
				var pressedKey = ev.charCode || ev.keyCode || -1;
				if ((pressedKey > charMin && pressedKey <= 90) || pressedKey == 32) {
					return false;
				}
				var cal = $(this).parent().parent();
				if (cal.data('colorpicker').livePreview === true) {
					change.apply(this);
				}
			},
			change = function (ev) {
				var cal = $(this).parent().parent(), col;
				if (this.parentNode.className.indexOf('_hex') > 0) {
					cal.data('colorpicker').color = col = HexToHSB(fixHex(this.value));
				} else if (this.parentNode.className.indexOf('_hsb') > 0) {
					cal.data('colorpicker').color = col = fixHSB({
						h: parseInt(cal.data('colorpicker').fields.eq(4).val(), 10),
						s: parseInt(cal.data('colorpicker').fields.eq(5).val(), 10),
						b: parseInt(cal.data('colorpicker').fields.eq(6).val(), 10)
					});
				} else {
					cal.data('colorpicker').color = col = RGBToHSB(fixRGB({
						r: parseInt(cal.data('colorpicker').fields.eq(1).val(), 10),
						g: parseInt(cal.data('colorpicker').fields.eq(2).val(), 10),
						b: parseInt(cal.data('colorpicker').fields.eq(3).val(), 10)
					}));
				}
				if (ev) {
					fillRGBFields(col, cal.get(0));
					fillHexFields(col, cal.get(0));
					fillHSBFields(col, cal.get(0));
				}
				setSelector(col, cal.get(0));
				setHue(col, cal.get(0));
				setNewColor(col, cal.get(0));
				cal.data('colorpicker').onChange.apply(cal, [col, HSBToHex(col), HSBToRGB(col)]);
			},
			blur = function (ev) {
				var cal = $(this).parent().parent();
				cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus');
			},
			focus = function () {
				charMin = this.parentNode.className.indexOf('_hex') > 0 ? 70 : 65;
				$(this).parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');
				$(this).parent().addClass('colorpicker_focus');
			},
			downIncrement = function (ev) {
				var field = $(this).parent().find('input').focus();
				var current = {
					el: $(this).parent().addClass('colorpicker_slider'),
					max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
					y: ev.pageY,
					field: field,
					val: parseInt(field.val(), 10),
					preview: $(this).parent().parent().data('colorpicker').livePreview					
				};
				$(document).bind('mouseup', current, upIncrement);
				$(document).bind('mousemove', current, moveIncrement);
			},
			moveIncrement = function (ev) {
				ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val + ev.pageY - ev.data.y, 10))));
				if (ev.data.preview) {
					change.apply(ev.data.field.get(0), [true]);
				}
				return false;
			},
			upIncrement = function (ev) {
				change.apply(ev.data.field.get(0), [true]);
				ev.data.el.removeClass('colorpicker_slider').find('input').focus();
				$(document).unbind('mouseup', upIncrement);
				$(document).unbind('mousemove', moveIncrement);
				return false;
			},
			downHue = function (ev) {
				var current = {
					cal: $(this).parent(),
					y: $(this).offset().top
				};
				current.preview = current.cal.data('colorpicker').livePreview;
				$(document).bind('mouseup', current, upHue);
				$(document).bind('mousemove', current, moveHue);
			},
			moveHue = function (ev) {
				change.apply(
					ev.data.cal.data('colorpicker')
						.fields
						.eq(4)
						.val(parseInt(360*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.y))))/150, 10))
						.get(0),
					[ev.data.preview]
				);
				return false;
			},
			upHue = function (ev) {
				fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				$(document).unbind('mouseup', upHue);
				$(document).unbind('mousemove', moveHue);
				return false;
			},
			downSelector = function (ev) {
				var current = {
					cal: $(this).parent(),
					pos: $(this).offset()
				};
				current.preview = current.cal.data('colorpicker').livePreview;
				$(document).bind('mouseup', current, upSelector);
				$(document).bind('mousemove', current, moveSelector);
			},
			moveSelector = function (ev) {
				change.apply(
					ev.data.cal.data('colorpicker')
						.fields
						.eq(6)
						.val(parseInt(100*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.pos.top))))/150, 10))
						.end()
						.eq(5)
						.val(parseInt(100*(Math.max(0,Math.min(150,(ev.pageX - ev.data.pos.left))))/150, 10))
						.get(0),
					[ev.data.preview]
				);
				return false;
			},
			upSelector = function (ev) {
				fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				$(document).unbind('mouseup', upSelector);
				$(document).unbind('mousemove', moveSelector);
				return false;
			},
			enterSubmit = function (ev) {
				$(this).addClass('colorpicker_focus');
			},
			leaveSubmit = function (ev) {
				$(this).removeClass('colorpicker_focus');
			},
			clickSubmit = function (ev) {
				var cal = $(this).parent();
				var col = cal.data('colorpicker').color;
				cal.data('colorpicker').origColor = col;
				setCurrentColor(col, cal.get(0));
				cal.data('colorpicker').onSubmit(col, HSBToHex(col), HSBToRGB(col), cal.data('colorpicker').el);
			},
			show = function (ev) {
				var cal = $('#' + $(this).data('colorpickerId'));
				cal.data('colorpicker').onBeforeShow.apply(this, [cal.get(0)]);
				var pos = $(this).offset();
				var viewPort = getViewport();
				var top = pos.top + this.offsetHeight;
				var left = pos.left;
				if (top + 176 > viewPort.t + viewPort.h) {
					top -= this.offsetHeight + 176;
				}
				if (left + 356 > viewPort.l + viewPort.w) {
					left -= 356;
				}
				cal.css({left: left + 'px', top: top + 'px'});
				if (cal.data('colorpicker').onShow.apply(this, [cal.get(0)]) != false) {
					cal.show();
				}
				$(document).bind('mousedown', {cal: cal}, hide);
				return false;
			},
			hide = function (ev) {
				if (!isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
					if (ev.data.cal.data('colorpicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
						ev.data.cal.hide();
					}
					$(document).unbind('mousedown', hide);
				}
			},
			isChildOf = function(parentEl, el, container) {
				if (parentEl == el) {
					return true;
				}
				if (parentEl.contains) {
					return parentEl.contains(el);
				}
				if ( parentEl.compareDocumentPosition ) {
					return !!(parentEl.compareDocumentPosition(el) & 16);
				}
				var prEl = el.parentNode;
				while(prEl && prEl != container) {
					if (prEl == parentEl)
						return true;
					prEl = prEl.parentNode;
				}
				return false;
			},
			getViewport = function () {
				var m = document.compatMode == 'CSS1Compat';
				return {
					l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
					t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
					w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
					h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
				};
			},
			fixHSB = function (hsb) {
				return {
					h: Math.min(360, Math.max(0, hsb.h)),
					s: Math.min(100, Math.max(0, hsb.s)),
					b: Math.min(100, Math.max(0, hsb.b))
				};
			}, 
			fixRGB = function (rgb) {
				return {
					r: Math.min(255, Math.max(0, rgb.r)),
					g: Math.min(255, Math.max(0, rgb.g)),
					b: Math.min(255, Math.max(0, rgb.b))
				};
			},
			fixHex = function (hex) {
				var len = 6 - hex.length;
				if (len > 0) {
					var o = [];
					for (var i=0; i<len; i++) {
						o.push('0');
					}
					o.push(hex);
					hex = o.join('');
				}
				return hex;
			}, 
			HexToRGB = function (hex) {
				var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
				return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
			},
			HexToHSB = function (hex) {
				return RGBToHSB(HexToRGB(hex));
			},
			RGBToHSB = function (rgb) {
				var hsb = {
					h: 0,
					s: 0,
					b: 0
				};
				var min = Math.min(rgb.r, rgb.g, rgb.b);
				var max = Math.max(rgb.r, rgb.g, rgb.b);
				var delta = max - min;
				hsb.b = max;
				if (max != 0) {
					
				}
				hsb.s = max != 0 ? 255 * delta / max : 0;
				if (hsb.s != 0) {
					if (rgb.r == max) {
						hsb.h = (rgb.g - rgb.b) / delta;
					} else if (rgb.g == max) {
						hsb.h = 2 + (rgb.b - rgb.r) / delta;
					} else {
						hsb.h = 4 + (rgb.r - rgb.g) / delta;
					}
				} else {
					hsb.h = -1;
				}
				hsb.h *= 60;
				if (hsb.h < 0) {
					hsb.h += 360;
				}
				hsb.s *= 100/255;
				hsb.b *= 100/255;
				return hsb;
			},
			HSBToRGB = function (hsb) {
				var rgb = {};
				var h = Math.round(hsb.h);
				var s = Math.round(hsb.s*255/100);
				var v = Math.round(hsb.b*255/100);
				if(s == 0) {
					rgb.r = rgb.g = rgb.b = v;
				} else {
					var t1 = v;
					var t2 = (255-s)*v/255;
					var t3 = (t1-t2)*(h%60)/60;
					if(h==360) h = 0;
					if(h<60) {rgb.r=t1;	rgb.b=t2; rgb.g=t2+t3}
					else if(h<120) {rgb.g=t1; rgb.b=t2;	rgb.r=t1-t3}
					else if(h<180) {rgb.g=t1; rgb.r=t2;	rgb.b=t2+t3}
					else if(h<240) {rgb.b=t1; rgb.r=t2;	rgb.g=t1-t3}
					else if(h<300) {rgb.b=t1; rgb.g=t2;	rgb.r=t2+t3}
					else if(h<360) {rgb.r=t1; rgb.g=t2;	rgb.b=t1-t3}
					else {rgb.r=0; rgb.g=0;	rgb.b=0}
				}
				return {r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b)};
			},
			RGBToHex = function (rgb) {
				var hex = [
					rgb.r.toString(16),
					rgb.g.toString(16),
					rgb.b.toString(16)
				];
				$.each(hex, function (nr, val) {
					if (val.length == 1) {
						hex[nr] = '0' + val;
					}
				});
				return hex.join('');
			},
			HSBToHex = function (hsb) {
				return RGBToHex(HSBToRGB(hsb));
			},
			restoreOriginal = function () {
				var cal = $(this).parent();
				var col = cal.data('colorpicker').origColor;
				cal.data('colorpicker').color = col;
				fillRGBFields(col, cal.get(0));
				fillHexFields(col, cal.get(0));
				fillHSBFields(col, cal.get(0));
				setSelector(col, cal.get(0));
				setHue(col, cal.get(0));
				setNewColor(col, cal.get(0));
			};
		return {
			init: function (opt) {
				opt = $.extend({}, defaults, opt||{});
				if (typeof opt.color == 'string') {
					opt.color = HexToHSB(opt.color);
				} else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
					opt.color = RGBToHSB(opt.color);
				} else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
					opt.color = fixHSB(opt.color);
				} else {
					return this;
				}
				return this.each(function () {
					if (!$(this).data('colorpickerId')) {
						var options = $.extend({}, opt);
						options.origColor = opt.color;
						var id = 'collorpicker_' + idn++;
						$(this).data('colorpickerId', id);
						var cal = $(tpl).attr('id', id);
						if (options.flat) {
							cal.appendTo(this).show();
						} else {
							cal.appendTo(document.body);
						}
						options.fields = cal
											.find('input')
												.bind('keyup', keyDown)
												.bind('change', change)
												.bind('blur', blur)
												.bind('focus', focus);
						cal
							.find('span').bind('mousedown', downIncrement).end()
							.find('>div.colorpicker_current_color').bind('click', restoreOriginal);
						options.selector = cal.find('div.colorpicker_color').bind('mousedown', downSelector);
						options.selectorIndic = options.selector.find('div div');
						options.el = this;
						options.hue = cal.find('div.colorpicker_hue div');
						cal.find('div.colorpicker_hue').bind('mousedown', downHue);
						options.newColor = cal.find('div.colorpicker_new_color');
						options.currentColor = cal.find('div.colorpicker_current_color');
						cal.data('colorpicker', options);
						cal.find('div.colorpicker_submit')
							.bind('mouseenter', enterSubmit)
							.bind('mouseleave', leaveSubmit)
							.bind('click', clickSubmit);
						fillRGBFields(options.color, cal.get(0));
						fillHSBFields(options.color, cal.get(0));
						fillHexFields(options.color, cal.get(0));
						setHue(options.color, cal.get(0));
						setSelector(options.color, cal.get(0));
						setCurrentColor(options.color, cal.get(0));
						setNewColor(options.color, cal.get(0));
						if (options.flat) {
							cal.css({
								position: 'relative',
								display: 'block'
							});
						} else {
							$(this).bind(options.eventName, show);
						}
					}
				});
			},
			showPicker: function() {
				return this.each( function () {
					if ($(this).data('colorpickerId')) {
						show.apply(this);
					}
				});
			},
			hidePicker: function() {
				return this.each( function () {
					if ($(this).data('colorpickerId')) {
						$('#' + $(this).data('colorpickerId')).hide();
					}
				});
			},
			setColor: function(col) {
				if (typeof col == 'string') {
					col = HexToHSB(col);
				} else if (col.r != undefined && col.g != undefined && col.b != undefined) {
					col = RGBToHSB(col);
				} else if (col.h != undefined && col.s != undefined && col.b != undefined) {
					col = fixHSB(col);
				} else {
					return this;
				}
				return this.each(function(){
					if ($(this).data('colorpickerId')) {
						var cal = $('#' + $(this).data('colorpickerId'));
						cal.data('colorpicker').color = col;
						cal.data('colorpicker').origColor = col;
						fillRGBFields(col, cal.get(0));
						fillHSBFields(col, cal.get(0));
						fillHexFields(col, cal.get(0));
						setHue(col, cal.get(0));
						setSelector(col, cal.get(0));
						setCurrentColor(col, cal.get(0));
						setNewColor(col, cal.get(0));
					}
				});
			}
		};
	}();
	$.fn.extend({
		ColorPicker: ColorPicker.init,
		ColorPickerHide: ColorPicker.hidePicker,
		ColorPickerShow: ColorPicker.showPicker,
		ColorPickerSetColor: ColorPicker.setColor
	});
})(jQuery);

(function($) {
  Drupal.behaviors.jqueryColorpicker = {
    attach: function() {
      var targets = "";
      var first = true;
      // First we initialize some CSS settings - adding the background that the user has chosen etc.
      for (var i = 0; i < Drupal.settings.jqueryColorpicker.ids.length; i++) {
        if (!first) {
          targets += ", ";
        }
        else {
          first = false;
        }
        // This following gives us the ID of the element we will use as a point of reference for the settings
        var id = "#" + Drupal.settings.jqueryColorpicker.ids[i] + "-inner_wrapper";
        // Next we use that point of reference to set a bunch of CSS settings
        $(id).css({"background-image" : "url(" + Drupal.settings.jqueryColorpicker.backgrounds[i] + ")", "height" : "36px", "width" : "36px", "position" : "relative"})
          .children(".color_picker").css({"background-image" : "url(" + Drupal.settings.jqueryColorpicker.backgrounds[i] + ")", "background-repeat" : "no-repeat", "background-position" : "center center", "height" : "30px", "width" : "30px", "position" : "absolute", "top" : "3px", "left" : "3px"})
          .children().css({"display" : "none"});
        // we build a list of IDS that will then be acted upon in the next section of code
       targets += id;
     }

     // next we use the list of IDs we just built and act upon each of them
     $(targets).each(function() {
       // First we get a point of reference from which to work
       var target = $(this).attr("id");
       // we set the display of the label to inline. The reason for this is that clicking on a label element
       // automatically sets the focus on the input. With the jquery colorpicker, this means the colorpicker
       // pops up. When the display isn't set to inline, it extends to 100% width, meaning the clickable
       // area is much bigger than it should be, making the 'invisible' clickable space very large.
       // When it's set to inline, the width of the lable is only as wide as the text
       // as big as.
       $("#" + target).parent().siblings("label").css("display",  "inline");
       // next we get the background color of the element
       var defaultColor = $("#" + target + " .color_picker").css("background-color");
       // if the background color is an rgb value, which it is when using firefox, we convert it to a
       // hexidecimal number
       if(defaultColor.match(/rgb/)) {
         defaultColor = rgb2hex(defaultColor);
       }
       // finally we initialize the colorpicker element. This calls functions provided by the 3rd party code.
         var trigger = $(this).children(".color_picker:first");
         trigger.ColorPicker({
           color: defaultColor,
           onShow: function (colpkr) {
             $(colpkr).fadeIn(500);
             return false;
           },
           onHide: function (colpkr) {
             $(colpkr).fadeOut(500);
             $("#" + target + " .color_picker").find("input").blur();
             return false;
           },
           onChange: function (hsb, hex, rgb) {
             $("#" + target + " .color_picker").css("backgroundColor", "#" + hex).find("input").val(hex).change();
           }
         });
       });
     }
  };
  // This is the conversion function to convert rgb color values to hexadecimal number values
  function rgb2hex(rgb) {
    var result = new String;
    var number = new Number;
    var numbers = rgb.match(/\d+/g), j, result, number;
    for (j = 0; j < numbers.length; j += 1) {
      number = numbers[j] * 1;
      // convert to hex
      number = number.toString(16);
      // enforce double-digit
      if (number.length < 2) {
        number = "0" + number;
      }
      result += number;
    }
    return result;
  };
})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
