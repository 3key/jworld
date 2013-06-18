/**
*
*________________________________________________________________________________________________
*______/\\\\\\\\\\\__/\\\______________/\\\______________________________/\\\\\\____________/\\\__        
* _____\/////\\\///__\/\\\_____________\/\\\_____________________________\////\\\___________\/\\\__       
*  _________\/\\\_____\/\\\_____________\/\\\________________________________\/\\\___________\/\\\__      
*   _________\/\\\_____\//\\\____/\\\____/\\\______/\\\\\_____/\\/\\\\\\\_____\/\\\___________\/\\\__     
*    _________\/\\\______\//\\\__/\\\\\__/\\\_____/\\\///\\\__\/\\\/////\\\____\/\\\______/\\\\\\\\\__    
*     _________\/\\\_______\//\\\/\\\/\\\/\\\_____/\\\__\//\\\_\/\\\___\///_____\/\\\_____/\\\////\\\__   
*      __/\\\___\/\\\________\//\\\\\\//\\\\\_____\//\\\__/\\\__\/\\\____________\/\\\____\/\\\__\/\\\__  
*       _\//\\\\\\\\\__________\//\\\__\//\\\_______\///\\\\\/___\/\\\__________/\\\\\\\\\_\//\\\\\\\/\\_ 
*        __\/////////____________\///____\///__________\/////_____\///__________\/////////___\///////\//__
*         _________________________________________________________________________________________________
*           copyright (c) 2013, Daniel Reitterer, http://3key.at/jworld (contact: dr101 [at] gmx [.] at)
*           _________________________________________________________________________________________________
*                                                     Version 1.0
*					                      _   _               _   
*					  __ _ _ __ ___   ___| |_| |__  _   _ ___| |_ 
*					 / _` |  _ ` _ \ / _ \ __|  _ \| | | / __| __|
*					| (_| | | | | | |  __/ |_| | | | |_| \__ \ |_  
*					 \__,_|_| |_| |_|\___|\__|_| |_|\__, |___/\__|
*					                                |___/         
*
**
* @name jquery.jworld.js
* @author Daniel Reitterer (http://3key.at/jworld)
* @version 0.9.10
* @codename: Amethyst
* @date june 2013
* @category jQuery plugin
* @license MIT license
* @example http://3key.at/jworld
*
**
* JWorld is a fast and lightweight 3D-sprite engine based on HTML5 and CSS-3D transforms
* JWorld  makes it easy to create camera animations in the browser without any plugins.
* It is possible to set camera position, rotation, move and rotate about local axis, and set the field of view
* Html elements can be positioned, rotated, and scaled in 3d
*
**
* Modes for world function
*
* ====================================================
* add                | Add a div to the view
* addElements        | Add Array of sprite divs, the children of a div, or a jquery object to a view
* browserPrefix      | Prefix for Javascript
* css                | Set special css with correct browser prefix like perspective, transform, transition etc.
* cssPrefix          | Prefix for css
* frameRate          | frameRate for internal rendering update, default: 50 fps. The frameRate does not change the frameRate for css-transitions
* get                | Get value
* matrixTransition   | Set css transition property for css transform
* remove             | Remove a div from view
* removeElements     | Remove a list of sprite divs from the view
* reset              | Reset the transform of the item
* set                | Set value
* support            | Boolean indicates if css 3d transform is available
* update             | Redraw the item or view
* updateSize         | Update the view size
*
**
* Property Table for world function (get/set)
*
*      | Name            | Value
* =====================================================
* Num  | x               | Object Position
*      | y               | 
*      | z               | 
* Func | moveX           | Move Object on local axis
*      | moveY           | 
*      | moveZ           | 
* Func | offsetX         | Move Object by offset
*      | offsetY         | 
*      | offsetZ         | 
* Func | rotateX         | Object Rotation
*      | rotateY         | 
*      | rotateZ         | 
* Func | offsetRotateX   | Rotate Object by offset
*      | offsetRotateY   | 
*      | offsetRotateZ   | 
* Func | localRotateX    | Rotate Object on local axis
*      | localRotateY    | 
*      | localRotateZ    | 
* Num  | scaleX          | Object Scale
*      | scaleY          | 
*      | scaleZ          |
* Num  | width           | Camera width
* Num  | height          | Camera height
* Num  | fov             | Camera field of view in degree
* Num  | perspective     | Camera perspective
* Bool | noSetup         | dont create 3d sprites when the view is created, default is false
*
**
* Examples:
*
*  // create cameras
*  var cams = $(".camera").world ();
*  var cams = $(".camera").world( {width:320, height:240, fov:70, x:0,y:0,z:-250, rotateX:25} );
*
*  // create sprites in camera
*  cams.world ( "addElements", $(".sprite") );
*
*  // Get transform 
*  var position = $(".sprite1").world( "get", {x:0,y:0,z:0} );
*
*  // transform sprites
*  $(".sprite1").world( "set", {x:0,y:0,z:0, rotateX:0,rotateY:0,rotateZ:0, scaleX:1,scaleY:1,scaleZ:1 } );
*
*		
*	// Modify transform of sprites or the view:
*	$(elements).world( "set", {x:0,y:0,z:0, rotateX:0,rotateY:0,rotateZ:0, scaleX:1,scaleY:1,scaleZ:1} );	  
*	$(elements).world( "x", val); // set x position on all elements
*	$(elements).world( "rotateX", val); // set x rotation in degree on all elements
*	$(elements).world( "scaleX", val); // set x scale on all elements (0-1)
*	
*	// Get properties:
*	value = $(elements).world( "x" ); // get x position of first Element
*	value = $(elements).world( "rotateX" ); // get x rotation in degree of first Element
*	value = $(elements).world( "scaleZ" ); // get z scale of first Element (0-1)
*	properties = $(elements).world( "get", {x:0,y:0,z:0, rotateX:0,rotateY:0,rotateZ:0, scaleX:0,scaleY:0,scaleZ:0} ) // get properties of first Element
*	
*	$(elements).world( "move", {x:0,y:0,z:1}, 25 ); // move on axis
*	$(elements).world( "moveX", 3 ); // move on local x axis
*	$(elements).world( "moveY", 5 ); // move on local y axis
*	$(elements).world( "moveZ", 7 ); // move on local z axis
*	
*	$(elements).world( "rotate", {x:0,y:1,z:0}, 90 );  // rotate on axis
*	$(elements).world( "localRotateX", 90 ); // rotate on local x axis
*	$(elements).world( "localRotateY", 30 ); // rotate on local y axis
*	$(elements).world( "localRotateZ", 45 ); // rotate on local z axis
*	
*	// special methods
*	$(elements).world("update"); // Redraw
*	$(elements).world("updateSize"); // Update after size changed
*	$(elements).world("reset"); // Reset transform
*	$(elements).world("matrixTransition", "1s ease-in"); // set css transitions
*	$(elements).world("css", "transition", "opacity 2s ease-in"); // set css property with prefixed name
*
**
* Supported Browser's
*
* Safari 5+ (full support)
* Chrome (full support)
* Mozilla
* IE 10+ 
* No support in opera
*
**
* Known Problems
*
* Dont use matrixTransition, instead animate every property "by hand" in a frame handler loop.
* Animation with matrixTransition uses css transitions for animation wich is different in Webkit Mozilla and IE
* In Mozilla matrixTransition on views looks strange but on sprites it should be fine
* In IE-10 matrixTransition have no effect on views and looks strange on sprites
* At least the end frame is the same in all browsers
* 
* Problems with z-sorting in IE-10
* In IE sorting is done by jworld with the center of the sprite wich is not very accurate
* 	
* Problems with near clipping/culling of large sprites in Mozilla
* 
* Since IE don't support full css3d transforms, rendering in IE-10 is very slow compared to Webkit/Mozilla
*
*/

(function($) {
	
	/**																  
	* Main plugin function: world
	*
	* @mode String, get, set, method-name, property-name or undefined (for default mode set)
	* @av object with properties to get/set, or the value, or undefined
	* @rv optional specify the return value, default is the av object
	**/
	$.fn.world = function(mode, av, rv) 
	{
        var t = this;
		var L = this.length;
        if(L === 0) return false; // Nothing to do
		
		if(typeof mode !== "string") 
		{
			// No string mode specified
			if(typeof av === "object") {
				 rv = av;
			}
			av = mode;
			if(typeof av === "undefined") av = {};
			
			// default mode
			mode = "set";
		}
		
		var tp;
		
		if(mode === "set") 
		{
			var d;
			for(var i=0; i<L; i++) 
			{
				d = this[i];
				
				var obj = $c.items[d.id] || null;
				
				if( obj == null ) 
				{
					if(!$c.running) {
						// init frame loop for updating
						$c.running = true;
						$c.iid = setInterval($c.interval, 1000/$c.frameRate);
					}
					// create new view
					obj = new $c.View3d(d,0,0,0,av.noSetup||false);
					$c.items[d.id] = obj;
				}
				
				var val;
				
				for(var n in av) 
				{
					val = av[n];
					tp = typeof obj[n];
					
					if( tp === "undefined" ){
						tp = typeof obj["set"+n];
						
						if(tp !== "undefined" ) {
							if(tp === "function") {
								obj["set"+n](val);
							}else{
								obj["set"+n] = val;
							}
						}
					}else if(tp === "function") {
						obj[n](val);
					}else{
						obj[n] = val;
					}
				}
				
				if(obj.invalidSize) obj.updateSize();
			}
			return this;
		}
		else if(mode === "get") 
		 {
			var el = $c.items[this[0].id];
			if(el) 
			{
				var ret = typeof rv === "object" ? rv : av;
				
				for(var n in av) 
				{
					tp = typeof el[n];
					
					if(tp !== "undefined") 
					{
						if(tp === "function") {
							ret[n] = el[n]();
						}else{
							ret[n] = el[n];
						}
					}else{
						tp = typeof el["get"+n];
						if(tp !== "undefined") {
							if(tp==="function") {
								ret[n] = el["get"+n]();
							}else{
								ret[n] = el["get"+n];
							}
						}
					}
				}
				return ret;
			}else{
				return typeof rv === "object" ? rv : null;
			}
		}else if(mode == "move" || mode == "rotate") {
			return this.each( function(i,d) {
				var obj = $c.items[d.id] || null;
				if(obj) {
					obj[mode](av, rv);
				}
			});
		}else if(mode == "reset" || mode == "update" || mode == "updateSize") {
			return this.each( function(i,d) {
				var obj = $c.items[d.id] || null;
				if(obj) {
					obj[mode]();
				}
			});
		}else if(mode === "matrixTransition") {
			if(typeof av === "string") {
				return this.each( function(i,d) {
					var obj = $c.items[d.id] || null;
					if(obj) {
						if(obj instanceof $c.View3d) {
							$c.cssProp(obj.container, "transition", $c.pfxCss  + "transform " + av);
						}else{
							$c.cssProp(d, "transition", $c.pfxCss  + "transform " + av);
						}
					}
				});
			}
			return this;
		}else if(mode === "css") {
			if(typeof av === "string" && typeof rv === "string") {				
				return this.each( function(i,d) 
				{
					var obj = $c.items[d.id] || null;
					if(obj) {
						if(obj instanceof $c.View3d) {
							$c.cssProp(obj.container, av, rv);
						}else{
							$c.cssProp(d, av, rv);
						}
					}
					
				});
			}
		}else if(mode == "browserPrefix") {
			return $c.pfx;
		}else if(mode == "cssPrefix") {
			return $c.pfxCss;
		}else if(mode === "support") { 
			return $c.support;
		}else if(mode === "frameRate") {
			$c.frameRate = av;
			if($c.iid != null) {
				clearInterval($c.iid);
				$c.iid = setInterval($c.interval, 1000/$c.frameRate);
			}
		}else{
			
			// try properties / function calls with mode (update, move, rotate etc.)
			
			var at = typeof av;
			
			if(at === "undefined") 
			{
				// Get propertyof of first jquery item
				var obj = $c.items[this[0].id];
				
				if(obj) 
				{
					tp = typeof obj[mode];
					if(tp !== "undefined") {
						if(tp === "function") {
							return obj[mode]();
						}else{
							return obj[mode];
						}
					}else{
						tp = typeof obj["get"+mode];
						if(tp !== "undefined") {
							if(tp==="function") {
								return obj["get"+mode]();
							}else{
								return obj["get"+mode];
							}
						}
					}
				}
				
			}else{
				
				// try set mode as value
				
				var obj = $c.items[this[0].id];
					
				if(obj) 
				{
					tp = typeof obj[mode];
					if(tp !== "undefined") 
					{
						if(tp === "function") {
							try {
								obj[mode](av);
							}catch(e)  {
								var tm;
							}
						}else{
							if(typeof obj[mode] !== "undefined") {
								obj[mode] = av;
							}
						}
					}else{
						tp = typeof obj["set"+mode];
						if(tp !== "undefined") {
							if(tp==="function") {
								try {
									obj["set"+mode](av);
								}catch(e)  {
									var tm;
								}
							}else{
								if(typeof obj["set"+mode] !== "undefined") {
									obj["set"+mode] = av;
								}
							}
						}
					}
					if(obj.invalidSize) obj.updateSize();
					
				} // if obj	
			}
		
			
			
		}
		return this;
	} // world 
	
/*															  
________/\\\\\\\\\____________________________________________        
 _____/\\\////////_____________________________________________       
  ___/\\\/______________________________________________________      
   __/\\\_________________/\\\\\_____/\\/\\\\\\\______/\\\\\\\\__     
    _\/\\\_______________/\\\///\\\__\/\\\/////\\\___/\\\/////\\\_    
     _\//\\\_____________/\\\__\//\\\_\/\\\___\///___/\\\\\\\\\\\__   
      __\///\\\__________\//\\\__/\\\__\/\\\_________\//\\///////___  
       ____\////\\\\\\\\\__\///\\\\\/___\/\\\__________\//\\\\\\\\\\_ 
        _______\/////////_____\/////_____\///____________\//////////__
*/
	
	$.fn.world.core = {
		items:{},
		frameRate:50,
		iid:null,
		pfx:'',
		pfxCss:'',
		running:false,
		tu:[],
		cssProp :function(d,n,v) 
		{
			var pf = $c.pfx;
			if(d) d.style[pf+(pf==""?n:n.charAt(0).toUpperCase() + n.substring(1))] = v;
		},
		setInvalid :function(obj) {
			
			if($c.isIE) {
				if( obj instanceof $c.View3d) {
					obj.update();
					return;
				}
			}
			for(var i=0; i<$c.tu.length; i++) {
				if($c.tu[i] === obj) {
					return;	
				}
			}
			
			$c.tu.push(obj);
		},
		interval: function () {
			if($c.tu.length > 0) 
			{
				var t = $c.tu;
				for(var i=t.length-1; i>=0; i--) 
				{
					t[i].update();
				}
				$c.tu = [];
			}
		},
		Matrix3d:function(){this.id();},
		Object3d:function(){this.create();},
		View3d:function (div, width, height, fov, noSetup) 
		{
			var t = this;
			t.create();
			t._ortho = false;
			t.cDiv = t.container = t.wrap1 = t.wrap2 = null;
			t._perspective = 0;
			t.sprites = [];
			t._width = 0;
			t._height = 0;
			t.startDepth=1;
			t.createView = function (div, width, height, fov, noSetup) {
				var t=this;
				
				if(width == 0 || width == null) width = div.getAttribute("data-width") || div.width || div.offsetWidth || 800;	
				if(height == 0 || height == null) height = div.getAttribute("data-height") || div.height || div.offsetHeight || 600;	
				if(fov == 0 || fov == null) fov = (Number(div.getAttribute("data-fov")) || 55)*Math.PI/180;
				
				t._width = width;
				t._height = height;
				
				if(div) 
				{
					t.cDiv = div;
					div.style.width = width+"px";
					div.style.height = height+"px";
					div.style.overflow = "hidden";
					div.style.position = "relative";
					//div.style.clip = "rect(0px "+width+"px "+height+"px 0px)";
				
					t.container = document.createElement('div');
					t.wrap1 = document.createElement('div');
					t.wrap2 = document.createElement('div');
					
					t.wrap1.appendChild(t.wrap2);
					t.wrap2.appendChild(t.container);
					
					if(!$c.isIE && $c.support) {
						//$c.cssProp(t.wrap2,"perspectiveOrigin","0px 0px");
						//$c.cssProp(t.wrap2,"transformOrigin","0px 0px 0px");
						$c.cssProp(t.wrap2,"transformStyle","preserve-3d");
						$c.cssProp(t.container,"transformStyle","preserve-3d");
					}
					
					div.appendChild(t.wrap1);
					t.wrap1.style.position = "absolute";
					t.updateSize();
					
					$c.setupDataTransform(div, t);
					t.setfov(fov);
					
					if(!noSetup) {
						t.addElements(div);	
					}
				}
			}
			
			t.addElements = function (div) 
			{
				var ch, c;
				
				if( typeof div.length !== "undefined" ) {
					ch = div;
					for(var i=ch.length-1; i>=0; i--) 
					{
						c = ch[i];
						if(c.nodeType === 1 && c !== this.wrap1) {
							this.newSprite(c);
						}
					}
				}else{
					ch = div.childNodes;
					for(var i=ch.length-1; i>=0; i--) 
					{
						c = ch.item(i);
						if(c.nodeType === 1 && c !== this.wrap1) {
							this.newSprite(c);
						}
					}
				}
			}
			t.add = function (c) {
				if(c.nodeType === 1) {
					this.newSprite( c );
				}
			}
			t.removeElements = function (div) 
			{
				var ch, c;
				
				if( typeof div.length !== "undefined" ) {
					ch = div;
					for(var i=ch.length-1; i>=0; i--) 
					{
						c = ch[i];
						if(c.nodeType === 1 && c !== this.wrap1) {
							this.remove(c);
						}
					}
				}else{
					ch = div.childNodes;
					for(var i=ch.length-1; i>=0; i--) 
					{
						c = ch.item(i);
						if(c.nodeType === 1 && c !== this.wrap1) {
							this.remove(c);
						}
					}
				}
			}
			t.remove = function (c) 
			{
				if(c.nodeType === 1) 
				{
					for(var i=0; i<this.sprites.length; i++) 
					{
						if(this.sprites[i].div === c) 
						{
							this.sprites.splice(i,1);
							this.container.removeChild( c );
							delete $c.items[c.id];
							break;
						}
					}
				}
			}
			t.getwidth = function () { return this._width; }
			t.setwidth = function (v) {
				this._width = v;
				this.invalidSize = true;	
			}
			t.getheight = function () { return this._height; }
			t.setheight = function (v) {
				this._height = v;
				this.invalidSize = true;	
			}
			t.setortho = function (enable) {
				this._ortho = Boolean(enable);
				this.setfov(this._fov);
			}
			t.getortho = function () {
				return this._ortho;	
			}
			t._fov = 0;
			t.getfov = function () { return this._fov; };
			t.setfov = function (r) {
				this._fov = r;
				this.setperspective( this.getFocalLength() );
				$c.setInvalid(this);
			}
			t.setFocalLength = function (f) { this._fov = Math.atan2(this._height/2,f)*2 ; };
			
			t.getFocalLength = function () {
				var f = this._fov/2;
				return (this._height/2)*(Math.cos(f)/Math.sin(f));
			};
			
			t.setperspective = function (p) {
				this._perspective = p;
				this.setFocalLength( p );
				if(!$c.isIE) {
					if(this._ortho) {
						if($c.support) $c.cssProp(this.wrap2,"perspective","none");
					}else{
						if($c.support) $c.cssProp(this.wrap2,"perspective",p+ ($c.pfx == "Webkit" ? "":"px"));
					}
					this.update();
				}
			}
			
			t.update = function () 
			{
				var t = this;
				
				if($c.support) 
				{
					if(!$c.isIE) 
					{
						var x = t.tgv;
						var px = -(t._x * x.a + t._y * x.b + t._z * x.c);
						var py = t._x * x.e + t._y * x.f + t._z * x.g;
						var pz = (t._x * x.i + t._y * x.j + t._z * x.k)+this._perspective;
						
						var e = 0.00001;
						if( px < e && px > -e) px = 0;
						if( py < e && py > -e) py = 0;
						if( pz < e && pz > -e) pz = 0;
						
						$c.cssProp(this.container,"transform","matrix3d("+  (x.a)+","+(-x.e)+","+(-x.i)+",0,"+
																			(x.b)+","+(-x.f)+","+(-x.j)+",0,"+
																			(x.c)+","+(-x.g)+","+(-x.k)+",0,"+
																			px + "," + py + "," + pz+",1)");
						
					}
					else
					{
						// IE needs to update all sprites with calculated camera matrix
						// pretty slow currently
						
						for(var i=0; i<t.sprites.length; i++) {
							t.sprites[i].update();
						}
						
						t.sprites.sort( $c.sortFunc );
						for(i=0; i<t.sprites.length; i++) {
							t.sprites[i].div.style.zIndex = t.startDepth + i;
						}
					}
				}
			}
			t.updateSize = function() {
				var st;
				t.invalidSize = false;
				if($c.support) {
					st = this.wrap1.style;
					st.left = Math.floor(this._width/2)+"px";
					st.top = Math.floor(this._height/2)+"px";
				}
				st = this.cDiv.style;
				st.width = this._width+"px";
				st.height = this._height+"px";
				//st.clip = "rect(0px "+this._width+"px "+this._height+"px 0px)";
				
				this.setfov(this._fov);
			}
			t.newSprite = function (div) {
				var sp = new $c.Sprite3d();
				sp.view = this;
				sp.setDiv(div);
				this.sprites.push(sp);
				$c.items[div.id] = sp;
				sp.updateSize();
				$c.setupDataTransform(div,sp);
				sp.update();
				this.container.appendChild(div);
				return sp;
			}
			t.createView(div, width, height, fov, noSetup);
		},
		setupDataTransform :function(div, obj) {
			var name, sval, val;
			
			for(var n in div.attributes) 
			{	
				name = div.attributes[n].name;
				
				if(name && name.charAt(0) == "d") {
					
					sval = div.getAttribute(name);
					val = Number(sval);
					
					switch ( name ) 
					{
						/* Position */
						case "data-x":
						case "data-position-x":
							obj.setx(val);
							break;
						case "data-y":
						case "data-position-y":
							obj.sety(val);
							break;
						case "data-z":
						case "data-position-z":
							obj.setz(val);
							break;
						
						/* Rotation */
						case "data-rx":
						case "data-rotate-x":
							obj.setrotateX(val);
							break;
						case "data-ry":
						case "data-rotate-y":
							obj.setrotateY(val);
							break;
						case "data-rz":
						case "data-rotate-z":
							obj.setrotateZ(val);
							break;
							
						/* Scale */
						case "data-sx":
						case "data-scale-x":
							obj.setscaleX(val);
							break;
						case "data-sy":
						case "data-scale-y":
							obj.setscaleY(val);
							break;
						case "data-sz":
						case "data-scale-z":
							obj.setscaleZ(val);
							break;
							
						/* Move Methods */
						case "data-mx":
						case "data-move-x":
							obj.moveX( val );
							break;
						case "data-my":
						case "data-move-y":
							obj.moveY( val );
							break;
						case "data-mz":
						case "data-move-z":
							obj.moveZ( val );
							break;
							
						/* Rotate Methods */
						case "data-lrx":
						case "data-local-rotate-x":
							obj.localRotateX( val );
							break;
						case "data-lry":
						case "data-local-rotate-y":
							obj.localRotateY( val );
							break;
						case "data-lrz":
						case "data-local-rotate-z":
							obj.localRotateZ( val );
							break;
							
						/* View setup */
						case "data-ortho":
						case "data-oorthographic":
							if(obj instanceof $c.View3d) obj.setortho( Boolean(sval) );
							break;
						
						default:
						break;	
					}
				}
			}
		}
	}
	var $c = $.fn.world.core;
	
	$c.Matrix3d.prototype={
		id :function () {
			var t=this;
			t.a = t.f = t.k = 1;
			t.b = t.c = t.e = t.g = t.i = t.j = 0; 
		}
	};

	$c.Object3d.prototype = {
		
		create: function () {
			var t=this;
			t.invalidSize=true;
			t.tgv=new $c.Matrix3d();
			t._x=0; t._y=0; t._z = 0;
			t._scaleX=1; t._scaleY=1; t._scaleZ=1;
			t.rx=0; t.ry=0; t.rz=0;
		},
		
		getx :function () { return this._x; },
		setx :function (v) { this._x = v; $c.setInvalid(this); },
		
		gety :function () { return this._y; },
		sety :function (v) { this._y = v; $c.setInvalid(this); },
		
		getz :function () { return this._z; },
		setz :function (v) { this._z = v; $c.setInvalid(this); },
		
		setoffsetX :function (v) {this._x += v; $c.setInvalid(this); },
		setoffsetY :function (v) {this._y += v; $c.setInvalid(this); },
		setoffsetZ :function (v) {this._z += v; $c.setInvalid(this); },
		
		getrotateX :function () { return this.rx == 0 ? 0 : this.rx/Math.PI*180; },
		setrotateX :function (v) 
		{
			this.rx = v == 0 ? 0 : v*Math.PI/180;
			this.initAxis();
			$c.setInvalid(this);
		},
		getrotateY :function () { return this.ry == 0 ? 0 : this.ry/Math.PI*180; },
		setrotateY :function (v) {
			this.ry = v == 0 ? 0 : v*Math.PI/180;
			this.initAxis();
			$c.setInvalid(this);
		},
		getrotateZ :function () { return this.rz == 0 ? 0 : this.rz/Math.PI*180; },
		setrotateZ :function (v) {
			this.rz = v == 0 ? 0 : v*Math.PI/180;
			this.initAxis();
			$c.setInvalid(this);
		},
		
		setoffsetRotateX :function (v) {this.rx += v == 0 ? 0 : v*Math.PI/180; this.initAxis(); $c.setInvalid(this); },
		setoffsetRotateY :function (v) {this.ry += v == 0 ? 0 : v*Math.PI/180; this.initAxis(); $c.setInvalid(this); },
		setoffsetRotateZ :function (v) {this.rz += v == 0 ? 0 : v*Math.PI/180; this.initAxis(); $c.setInvalid(this); },
		
		move :function (axis, val) {
			this._x += axis.x*val; this._y += axis.y*val; this._z += axis.z*val;
			$c.setInvalid(this);
		},
		
		moveX:function (d) { this.move(this.getXAxis(), d);},
		moveY:function (d) { this.move(this.getYAxis(), d);},
		moveZ:function (d) { this.move(this.getZAxis(), d);},
		
		rotate :function (axis, r) {
			if(Math.abs(r) < 0.0005) return;
			
			r = r*Math.PI/180;
			var x = axis.x, y = axis.y, z = axis.z;
			
			var _m = Math.sqrt(x*x+y*y+z*z);
			x /= _m; y /= _m; z /= _m;
						
			var s = Math.sin(r);
			var _c = Math.cos(r);
						
			var u = 1-_c;
			var sx = s*x;	var sy = s*y;	var sz = s*z;
			var xy = y*x*u;	var zy = y*z*u;	var xz = z*x*u;
			
			var mata = x*x* u + _c;	var matb = xy + sz;		var matc = xz - sy;
			var mate = xy - sz;		var matf = y*y* u + _c;	var matg = zy + sx;
			var mati = xz + sy;		var matj = zy - sx;		var matk = z*z* u + _c;
			
			var tr = this.tgv;
			var ta = tr.a;	var tb = tr.b;	var tc = tr.c;
			var te = tr.e;	var tf = tr.f;	var tg = tr.g;
			var ti = tr.i;	var tj = tr.j;	var tk = tr.k;
			
			tr.a = ta*mata + tb*mate + tc*mati; tr.b = ta*matb + tb*matf + tc*matj; tr.c = ta*matc + tb*matg + tc*matk;	
			tr.e = te*mata + tf*mate + tg*mati; tr.f = te*matb + tf*matf + tg*matj; tr.g = te*matc + tf*matg + tg*matk;
			tr.i = ti*mata + tj*mate + tk*mati; tr.j = ti*matb + tj*matf + tk*matj; tr.k = ti*matc + tj*matg + tk*matk;
			
			var e = 0.00001;
			if( tr.a < e && tr.a > -e) tr.a = 0;
			if( tr.b < e && tr.b > -e) tr.b = 0;
			if( tr.c < e && tr.c > -e) tr.c = 0;
			
			if( tr.e < e && tr.e > -e) tr.e = 0;
			if( tr.f < e && tr.f > -e) tr.f = 0;
			if( tr.g < e && tr.g > -e) tr.g = 0;
			
			if( tr.i < e && tr.i > -e) tr.i = 0;
			if( tr.j < e && tr.j > -e) tr.j = 0;
			if( tr.k < e && tr.k > -e) tr.k = 0;
			
			$c.setInvalid(this);
			this.updateRotation(tr);
		},
				
		localRotateX:function (d) { this.rotate( this.getXAxis(), d); },
		localRotateY:function (d) { this.rotate( this.getYAxis(), d); },
		localRotateZ:function (d) { this.rotate( this.getZAxis(), d); },
		
		updateRotation :function (r) {
			var tx = Math.asin(r.j);
			this.ry = 0;
			this.rx = -tx;
			if(tx < Math.PI/2) {
				if(tx > -Math.PI/2) {
					this.rz = -Math.atan2(-r.b, r.f);
					this.ry = -Math.atan2(-r.i, r.k);
				}else{
					this.rz = Math.atan2(r.b, r.a);
				}
			}else{
				this.rz = -Math.atan2(r.c, r.a);
			}
		},
		
		initAxis :function () {
			var ax = -this.rx;
			var ay =  this.ry;
			var az = -this.rz;
			
			var cx = Math.cos(ax);
			var sx = Math.sin(ax);
			var cy = Math.cos(ay);
			var sy = Math.sin(ay);
			var cz = Math.cos(az);
			var sz = Math.sin(az);
			
			var tr = this.tgv;
			tr.a = cz*cy-sz*-sx*sy;
			tr.b = -sz*cx;
			tr.c = cz*-sy-sz*-sx*cy;
			tr.e = sz*cy+cz*-sx*sy;
			tr.f = cz*cx;
			tr.g = sz*-sy+cz*-sx*cy;
			tr.i = cx*sy;
			tr.j = sx;
			tr.k = cx*cy;
			
			var e = 0.00001;
			if( tr.a < e && tr.a > -e) tr.a = 0;
			if( tr.b < e && tr.b > -e) tr.b = 0;
			if( tr.c < e && tr.c > -e) tr.c = 0;
			
			if( tr.e < e && tr.e > -e) tr.e = 0;
			if( tr.f < e && tr.f > -e) tr.f = 0;
			if( tr.g < e && tr.g > -e) tr.g = 0;
			
			if( tr.i < e && tr.i > -e) tr.i = 0;
			if( tr.j < e && tr.j > -e) tr.j = 0;
			if( tr.k < e && tr.k > -e) tr.k = 0;
		},
		
		getXAxis :function () { return {x:this.tgv.a, y:this.tgv.b, z:this.tgv.c}; },
		getYAxis :function () {	return {x:this.tgv.e, y:this.tgv.f, z:this.tgv.g}; },
		getZAxis :function () { return {x:this.tgv.i, y:this.tgv.j, z:this.tgv.k}; },
		
		getscaleX :function () { return this._scaleX; },
		setscaleX :function (v) { this._scaleX = v; $c.setInvalid(this); },
		
		getscaleY :function () { return this._scaleY; },
		setscaleY :function (v) { this._scaleY = v; $c.setInvalid(this); },
		
		getscaleZ :function () { return this._scaleZ; },
		setscaleZ :function (v) { this._scaleZ = v; $c.setInvalid(this); },
		
		reset :function () {
			this.tgv.id();
			this._x = this._y = this._z = 0;
			this.rx = this.ry = this.rz = 0;
			this._scaleX = this._scaleY = this._scaleZ = 1;
		}
	} // Object3d

	$c.View3d.prototype = new $c.Object3d();


	$c.Sprite3d = function () 
	{
		var d = this;
		d.create();
		d.div = null;
		d.view = null;
		d.zdepth = -1;
		d.updateSize = function() {
			var t = this.div;
			var w = Math.floor(t.width>0?(t.width*.5) : (t.offsetWidth*.5));
			var h = Math.floor(t.height>0?(t.height*.5) : (t.offsetHeight*.5));
			$c.cssProp(t,"transformOrigin", w+"px "+h+"px 0px");
			t.style.left = "-"+w+"px";
			t.style.top = "-"+h+"px";
		}
		
		d.update = function () 
		{
			if($c.support) 
			{
				var d = this;
				
				if( !$c.isIE ) {
				  $c.cssProp(d.div, "transform", "translate3d("+d._x+"px,"+(d._y)+"px,"+d._z+"px) rotateY("+(d.getrotateY())+"deg) rotateX("+(d.getrotateX())+"deg) rotateZ("+(d.getrotateZ())+"deg) scale3d("+(d._scaleX)+","+(-d._scaleY)+","+(-d._scaleZ)+")");
				 
				/*
				// matrix is buggy in mozilla with css transitions
				var r = d.tgv;
				$c.cssProp(d.div,"transform", "matrix3d("+ (r.a*d._scaleX)+","+(r.b*d._scaleX)+","+(r.c*d._scaleX)+",0,"+
															(-r.e*d._scaleY)+","+(-r.f*d._scaleY)+","+(-r.g*d._scaleY)+",0,"+
															(-r.i*d._scaleZ)+","+(-r.j*d._scaleZ)+","+(-r.k*d._scaleZ)+",0,"+
															d._x+","+d._y+","+d._z+",1)");*/
				} else {
					
					// concat matrix with transposed camera matrix
					var t = d.tgv;
					var p = d.view.tgv;
					
					var pa = p.a, pb = (-p.e), pc = -p.i,
					    pe = p.b, pf = (-p.f), pg = -p.j,
					    pi = p.c, pj = (-p.g), pk = -p.k;
						
					var px = -(d.view._x * p.a + d.view._y * p.b + d.view._z * p.c);
					var py = -(d.view._x * (-p.e) + d.view._y * (-p.f) + d.view._z * (-p.g));
					var pz = -(d.view._x * (-p.i) + d.view._y * (-p.j) + d.view._z * (-p.k));
		
					var ra = (t.a*pa + t.b*pe + t.c*pi)*d._scaleX;
					var rb = (t.a*pb + t.b*pf + t.c*pj)*d._scaleX;
					var rc = (t.a*pc + t.b*pg + t.c*pk)*d._scaleX;
					
					var re = ((-t.e)*pa + (-t.f)*pe + (-t.g)*pi)*d._scaleY;
					var rf = ((-t.e)*pb + (-t.f)*pf + (-t.g)*pj)*d._scaleY;
					var rg = ((-t.e)*pc + (-t.f)*pg + (-t.g)*pk)*d._scaleY;
					
					var ri = (t.i*pa + t.j*pe + t.k*pi)*-d._scaleZ;
					var rj = (t.i*pb + t.j*pf + t.k*pj)*-d._scaleZ;
					var rk = (t.i*pc + t.j*pg + t.k*pk)*-d._scaleZ;
					
					var rm = d._x*pa + d._y*pe + d._z*pi + px;
					var rn = d._x*pb + d._y*pf + d._z*pj + py;
					var ro = d._x*pc + d._y*pg + d._z*pk + pz;
					
					var v0  = ra,	v1 = rb, v2 = rc, 
						v4  = re,	v5 = rf, v6 = rg,
						v8  = ri, v9 = rj, v10 = rk,
						v12 = (rm),  v13 = (rn),  v14 = (ro + d.view._perspective);
						
					d.zdepth = -ro;
					
					$c.cssProp(d.div, "transform", "perspective("+d.view._perspective+"px) matrix3d("+v0+","+v1+","+v2+",0,"+v4+","+v5+","+v6+",0,"+v8+","+v9+","+v10+",0,"+v12+","+v13+","+v14+",1)");
				}
				
			}
		}
		
		d.setDiv = function (d) 
		{
			this.div = d;
			d.style.position = "absolute";
			if(!$c.isIE) {
				$c.cssProp(d,"transformStyle","preserve-3d");
			}
		}
	}
	$c.Sprite3d.prototype = new $c.Object3d();
	
	$c.isIE = false;
	$c.sortFunc = function(a,b) { return b.zdepth-a.zdepth; }
	$c.support = (function() 
	{
		var i,pf,d = document.createElement("div"), prefixes = ["Webkit","Moz","O","khtml","ms"];
		for(i=0; i<prefixes.length; i++) {
			pf = prefixes[i];
			if( (pf + "Perspective") in d.style ) {
				$c.pfx = pf;
				$c.pfxCss = "-"+pf.toLowerCase()+"-";
				if(pf=="ms"){
					$c.isIE = true;
					// for future ie versions prefix can already be removed..
					//$c.pfx = "";
					//$c.pfxCss = "";
				}
				return true;
			}
		}
		return false;
	})();

})(jQuery); 