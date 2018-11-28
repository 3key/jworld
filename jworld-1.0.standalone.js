
(function() {
	
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
	
	jworld = 
	{
		items:{},
		frameRate:50,
		iid:null,
		pfx:'',
		pfxCss:'',
		tu:[],
		tuo:{},
		degrade : null,
		ie : false,
		isFF: false,
		stp : {},
		ctr : "transform",
		trEnd: "transitionend",
		anEnd: "animationend",
		e: 0.0000001,
		r2d: 180/Math.PI,
		d2r: Math.PI/180,
		sortFunc : function(a,b) { return b.zd-a.zd; },
		css :function(d,n,v) 
		{
			var p = $c.pfx;
			d.style[p+(p==""?n:n.charAt(0).toUpperCase() + n.substring(1))] = v;
		},
		inv :function(o) 
		{			
			if( o instanceof $c.View3d ) {
				if( !$c.tuo[ o.cDiv.id ]) {
					$c.tu.push(o);
					$c.tuo[ o.cDiv.id ] = true;
				}
			}else{
				if( !$c.tuo[ o.div.id ]) {
					$c.tu.splice(0,0,o);
					$c.tuo[ o.div.id ] = true;
				}
			}
		},
		cancelUpdate : function(o) 
		{
			var t = $c.tu, i;
			for(i=t.length-1; i>=0; i--) {
				if(t[i] === o) {
					$c.tuo[ o instanceof $c.View3d  ?  o.cDiv.id : o.div.id]=null;
					t.splice(i,1);
					return;	
				}
			}
		},
		interval: function () 
		{
			var i, t = $c.tu;
			if(t.length > 0) 
			{	
				for(i=t.length-1; i>=0; i--) 
				{
					t[i].update();
				}
				
				$c.tu = [];
				$c.tuo = {};
			}
		},
		Sprite3d: function () {},
		View3d:function (div, width, height, fov, noSetup) 
		{
			var t = this;
			t._ortho = false;
			t.cDiv = t.div = t.wrap1 = t.wrap2 = null;
			t._perspective = 0;
			t.sprites = [];
			t.createView = function (div, width, height, fov, noSetup) {
				var t=this;
				
				if(div) 
				{
					if(!width) width = div.getAttribute("data-width") || div.width || div.offsetWidth || 800;	
					if(!height) height = div.getAttribute("data-height") || div.height || div.offsetHeight || 600;	
					if(!fov) fov = Number(div.getAttribute("data-fov")) || 55;
					
					t._width = width;
					t._height = height;
					
					t.cDiv = div;
					div.style.width = width+"px";
					div.style.height = height+"px";
					div.style.overflow = "hidden";
					div.style.position = "relative";
					
					t.div = document.createElement('div');
					t.wrap1 = document.createElement('div');
					t.wrap2 = document.createElement('div');
					
					t.wrap1.appendChild(t.wrap2);
					t.wrap2.appendChild(t.div);
					
					if(!$c.ie && $c.support) {
						$c.css(t.wrap2,"perspectiveOrigin","0px 0px");
						$c.css(t.wrap2,"transformOrigin","0px 0px 0px");
						$c.css(t.wrap2,"transformStyle","preserve-3d");
						$c.css(t.div,"transformStyle","preserve-3d");
					}
					
					t.wrap1.style.position = "absolute";
					$c.setupDataTransform(div, t);
					t.fov(fov);
					
					if(!noSetup) {
						t.addElements(div);	
					}
					// t.updateSize();
					
					div.appendChild(t.wrap1);
					
				}
			};
			
			t.addElements = function (div) 
			{
				var ch, i;
				
				if( typeof div == "string" ) 
				{
					ch = this.div.childNodes;
					var si = ch.length;
					
					$(this.div).append( div );
					
					var ei = ch.length;
					
					for(i=si; i<ei; i++) {
						var sp = this.newSprite( ch.item(i) );
					}
				}
				else
				{
					if( typeof div.length != "undefined" ) {
						ch = div;
						for(i=ch.length-1; i>=0; i--) {
							this.newSprite(ch[i]);
						}
					}
					else
					{
						var c;
						ch = div.childNodes;
						for(i=ch.length-1; i>=0; i--) {
							c = ch.item(i);
							if(c.nodeType == 1 && c != this.wrap1) {
								this.newSprite(c);
							}
						}
					}
					
				}
			};
			
			t.add = function (c) {
				var sp = this.newSprite( c );
				//sp.updateSize();
				return sp;
			};
			
			t.newSprite = function (div) 
			{
				var sp = new $c.Sprite3d();
				sp.view = this;
				sp.setDiv(div);				
				this.sprites.push(sp);
				$c.items[div.id] = sp;
				$c.setupDataTransform(div,sp);
				sp.updateSize();
				sp.update();
				$c.cancelUpdate(sp);
				this.div.appendChild(div);
				return sp;
			};
			
			t.removeElements = function (div) 
			{
				var ch, c, i;
				
				if( typeof div.length != "undefined" ) {
					ch = div;
					for(i=ch.length-1; i>=0; i--) 
					{
						//c = ch[i];
						this.remove(ch[i]);
					}
				}else{
					ch = div.childNodes;
					for(i=ch.length-1; i>=0; i--) 
					{
						c = ch.item(i);
						if(c.nodeType == 1) this.remove(c);
					}
				}
			};
			t.remove = function (c) 
			{
				if(c.nodeType == 1) 
				{
					var i, a = this.sprites;
					for(i=0; i<a.length; i++) 
					{
						if(a[i].div === c) 
						{
							a.splice(i,1);
							this.div.removeChild( c );
							$c.items[c.id] = null;
							break;
						}
					}
				}
			};
			t.getwidth = function () { return this._width; };
			t.width = function (v) {
				this._width = v;
				this.invs = true;	
			};
			t.getheight = function () { return this._height; };
			t.height = function (v) {
				this._height = v;
				this.invs = true;	
			};
			t.ortho = function (enable) {
				this._ortho = enable;
				this.fov(this.getfov());
			};
			t.getortho = function () {
				return this._ortho;	
			};
			t._fov = 0;
			t.getfov = function () { return this._fov*$c.r2d; };
			t.fov = function (r) {
				this._fov = r * $c.d2r;
				this.perspective( this.getFocalLength() );
				$c.inv(this);
			};
			t.setFocalLength = function (f) { this._fov = Math.atan2(this._height/2,f)*2; };
			t.getFocalLength = function () {
				var f = this._fov/2;
				return (this._height/2)*(Math.cos(f)/Math.sin(f));
			};
			
			t.perspective = function (p) {
				var t = this;
				t._perspective = p;
				t.setFocalLength( p );
				if($c.support && !$c.ie) {
					if(t._ortho) {
						$c.css(t.wrap2,"perspective","none");
					}else{
						$c.css(t.wrap2,"perspective",p+ ($c.pfx == "Webkit" && !$c.isFF ? "":"px"));
					}
					$c.inv(t);
				}
			};
			
			t.update = function () 
			{
				var t = this;
				
				if($c.support) 
				{
					if(!$c.ie) 
					{
						var px = -(t._x * t.ma + t._y * t.mb + t._z * t.mc),
						py = t._x * t.me + t._y * t.mf + t._z * t.mg,
						pz = (t._x * t.mi + t._y * t.mj + t._z * t.mk)+this._perspective,
						
						e = $c.e;
						if( px < e && px > -e) px = 0;
						if( py < e && py > -e) py = 0;
						if( pz < e && pz > -e) pz = 0;
						
						t.div.style[$c.ctr] = "matrix3d("+ t.ma+","+(-t.me)+","+(-t.mi)+",0,"+
															  t.mb+","+(-t.mf)+","+(-t.mj)+",0,"+
															  t.mc+","+(-t.mg)+","+(-t.mk)+",0,"+
															  px + "," + py + "," + pz+",1)";
						
					}
					else
					{
						// IE needs to update all sprites with calculated camera matrix
						var i, a = t.sprites;
						
						for(i=0; i<a.length; i++) {
							a[i].update();
							$c.cancelUpdate(t.sprites[i]);
						}
						
						a.sort( $c.sortFunc );
						for(i=0; i<a.length; i++) {
							a[i].div.style.zIndex = t.zd + i;
						}
					}
					
				}else{
					
					// No CSS3 3D Transform available
					
					if( $c.degrade ) {
						$c.degrade.updateView(t);
					}
					
				}
			};
			t.updateSize = function() {
				var t = this, st = t.wrap1.style;
				t.invs = false;
				st.left = Math.floor(t._width/2)+"px";
				st.top = Math.floor(t._height/2)+"px";
				st = t.cDiv.style;
				st.width = t._width+"px";
				st.height = t._height+"px";
				//st.clip = "rect(0px "+this._width+"px "+this._height+"px 0px)";
				t.fov(t.getfov());
				
				if(!$c.support && $c.degrade) {
					$c.degrade.updateSizeView(t);	
				}
			};
			t.createView(div, width, height, fov, noSetup);
		},
		setupDataTransform :function(d, o) {
			var name, sv, v;
			
			for(var n in d.attributes) 
			{	
				name = d.attributes[n].name;
				sv = d.getAttribute(name);
				v = Number(sv);
				
				switch ( name ) 
				{
					/* Position */
					case "data-x":
					case "data-position-x":
						o.x(v);
						break;
					case "data-y":
					case "data-position-y":
						o.y(v);
						break;
					case "data-z":
					case "data-position-z":
						o.z(v);
						break;
					
					/* Rotation */
					case "data-rx":
					case "data-rotate-x":
						o.rotateX(v);
						break;
					case "data-ry":
					case "data-rotate-y":
						o.rotateY(v);
						break;
					case "data-rz":
					case "data-rotate-z":
						o.rotateZ(v);
						break;
						
					/* Scale */
					case "data-sx":
					case "data-scale-x":
						o.scaleX(v);
						break;
					case "data-sy":
					case "data-scale-y":
						o.scaleY(v);
						break;
					case "data-sz":
					case "data-scale-z":
						o.scaleZ(v);
						break;
						
					/* Pivot Point */
					case "data-px":
					case "data-pivot-x":
						o.pivotX(sv);
						break;
					case "data-py":
					case "data-pivot-y":
						o.pivotY(sv);
						break;
					case "data-pz":
					case "data-pivot-z":
						o.pivotZ(sv);
						break;
						
						
					/* Move Methods */
					case "data-mx":
					case "data-move-x":
						o.moveX( v );
						break;
					case "data-my":
					case "data-move-y":
						o.moveY( v );
						break;
					case "data-mz":
					case "data-move-z":
						o.moveZ( v );
						break;
						
					/* Rotate Methods */
					case "data-lrx":
					case "data-local-rotate-x":
						o.localRotateX( v );
						break;
					case "data-lry":
					case "data-local-rotate-y":
						o.localRotateY( v );
						break;
					case "data-lrz":
					case "data-local-rotate-z":
						o.localRotateZ( v );
						break;
					
					/* Sprite setup */
					case "data-double-sided":
						if(!(o instanceof $c.View3d)) o.doubleSided( Boolean(sv) );
						break;
					
						
					/* View setup */
					case "data-ortho":
					case "data-orthographic":
						if(o instanceof $c.View3d) o.ortho( Boolean(sv) );
						break;
					
					default:
					break;	
				}
			}
			
		}
	};
	var $c = jworld;
	
	$c.Sprite3d.prototype = {
		_x:0, _y:0, _z:0,
		_scaleX:1, _scaleY:1, _scaleZ:1,
		rx:0, ry:0, rz:0,
		_pivotX:"", _pivotY:"", _pivotZ:"",
		regX:0, regY:0, regZ:0,
		zd: 0,
		_width: 0,
		_height: 0,
		invs: true,
		ma:1, mb:0, mc:0,
		me:0, mf:1, mg:0,
		mi:0, mj:0, mk:1,
		
		id :function () {
			var t=this;
			t.ma = t.mf = t.mk = 1;
			t.mb = t.mc = t.me = t.mg = t.mi = t.mj = 0; 
		},
		clearCss :function () {
			if($c.support) {
				$c.css(this.div, "transformStyle","");
				$c.css(this.div, "transform", "");
				$c.css(this.div, "transformOrigin", "");
			}
		},
		getx :function () { return this._x; },
		x :function (v) { this._x = v; $c.inv(this); },
		
		gety :function () { return this._y; },
		y :function (v) { this._y = v; $c.inv(this); },
		
		getz :function () { return this._z; },
		z :function (v) { this._z = v; $c.inv(this); },
		
		offsetX :function (v) {this._x += v; $c.inv(this); },
		offsetY :function (v) {this._y += v; $c.inv(this); },
		offsetZ :function (v) {this._z += v; $c.inv(this); },
		
		move :function (axis, val) {
			this._x += axis.x*val;
			this._y += axis.y*val;
			this._z += axis.z*val;
			$c.inv(this);
		},
		
		moveX:function (d) { this.move(this.getXAxis(), d);},
		moveY:function (d) { this.move(this.getYAxis(), d);},
		moveZ:function (d) { this.move(this.getZAxis(), d);},
		
		getrotateX :function () { return this.rx * $c.r2d; },
		rotateX :function (v) {
			this.rx = v*$c.d2r;
			this.initAxis();
		},
		getrotateY :function () { return this.ry * $c.r2d; },
		rotateY :function (v) {
			this.ry = v * $c.d2r;
			this.initAxis();
		},
		getrotateZ :function () { return this.rz * $c.r2d; },
		rotateZ :function (v) {
			this.rz = v * $c.d2r;
			this.initAxis();
		},
		
		offsetRotateX :function (v) {this.rx += v * $c.d2r; this.initAxis(); },
		offsetRotateY :function (v) {this.ry += v * $c.d2r; this.initAxis(); },
		offsetRotateZ :function (v) {this.rz += v * $c.d2r; this.initAxis(); },
		
		rotate :function (axis, r) {
			var e = $c.e;
			if(Math.abs(r) < e) return;
			
			r = r * $c.d2r;
			var x = axis.x, y = axis.y, z = axis.z,
			t = this,
			_m = Math.sqrt(x*x+y*y+z*z);
			x /= _m; y /= _m; z /= _m;
						
			var s = Math.sin(r),
			_c = Math.cos(r),
						
			u = 1-_c,
			sx = s*x,	sy = s*y,	sz = s*z,
			xy = y*x*u,	zy = y*z*u,	xz = z*x*u,
			
			mata = x*x* u + _c,	matb = xy + sz,		matc = xz - sy,
			mate = xy - sz,		matf = y*y* u + _c,	matg = zy + sx,
			mati = xz + sy,		matj = zy - sx,		matk = z*z* u + _c,
			
			ta = t.ma,	tb = t.mb,	tc = t.mc,
			te = t.me,	tf = t.mf,	tg = t.mg,
			ti = t.mi,	tj = t.mj,	tk = t.mk;
			
			t.ma = ta*mata + tb*mate + tc*mati; t.mb = ta*matb + tb*matf + tc*matj; t.mc = ta*matc + tb*matg + tc*matk;	
			t.me = te*mata + tf*mate + tg*mati; t.mf = te*matb + tf*matf + tg*matj; t.mg = te*matc + tf*matg + tg*matk;
			t.mi = ti*mata + tj*mate + tk*mati; t.mj = ti*matb + tj*matf + tk*matj; t.mk = ti*matc + tj*matg + tk*matk;
			
			
			if( t.ma < e && t.ma > -e) t.ma = 0;
			if( t.mb < e && t.mb > -e) t.mb = 0;
			if( t.mc < e && t.mc > -e) t.mc = 0;
			
			if( t.me < e && t.me > -e) t.me = 0;
			if( t.mf < e && t.mf > -e) t.mf = 0;
			if( t.mg < e && t.mg > -e) t.mg = 0;
			
			if( t.mi < e && t.mi > -e) t.mi = 0;
			if( t.mj < e && t.mj > -e) t.mj = 0;
			if( t.mk < e && t.mk > -e) t.mk = 0;
			
			$c.inv(t);
			t.updateRotation(t);
		},
		getpivotX :function() { return this._pivotX; },
		pivotX :function (pv) {
			if(!isNaN(Number(pv))) this._pivotX = Number(pv);
			else this._pivotX = pv;
			this.invs = true;
		},
		getpivotY :function() { return this._pivotY; },
		pivotY :function (pv) {
			if(!isNaN(Number(pv))) this._pivotY = Number(pv);
			else this._pivotY = pv;
			this.invs = true;
		},
		getpivotZ :function() { return this._pivotZ; },
		pivotZ :function (pv) {
			if(!isNaN(Number(pv))) this._pivotZ = Number(pv);
			else this._pivotZ = pv;
			this.invs = true;
		},
		localRotateX:function (d) { this.rotate( this.getXAxis(), d); },
		localRotateY:function (d) { this.rotate( this.getYAxis(), d); },
		localRotateZ:function (d) { this.rotate( this.getZAxis(), d); },
		
		updateRotation :function (r) {
			var t = this, tx = Math.asin(r.mj);
			t.ry = 0;
			t.rx = -tx;
			if(tx < Math.PI/2) {
				if(tx > -Math.PI/2) {
					t.rz = -Math.atan2(-r.mb, r.mf);
					t.ry = -Math.atan2(-r.mi, r.mk);
				}else{
					t.rz = Math.atan2(r.mb, r.ma);
				}
			}else{
				t.rz = -Math.atan2(r.mc, r.ma);
			}
		},
		
		initAxis :function () {
			var t = this,
			ax = -t.rx, ay =  t.ry, az = -t.rz,
			
			 cx = Math.cos(ax),
			 sx = Math.sin(ax),
			 cy = Math.cos(ay),
			 sy = Math.sin(ay),
			 cz = Math.cos(az),
			 sz = Math.sin(az),
			 e = $c.e;
			
			t.ma = cz*cy-sz*-sx*sy;
			t.mb = -sz*cx;
			t.mc = cz*-sy-sz*-sx*cy;
			t.me = sz*cy+cz*-sx*sy;
			t.mf = cz*cx;
			t.mg = sz*-sy+cz*-sx*cy;
			t.mi = cx*sy;
			t.mj = sx;
			t.mk = cx*cy;
			
			if( t.ma < e && t.ma > -e) t.ma = 0;
			if( t.mb < e && t.mb > -e) t.mb = 0;
			if( t.mc < e && t.mc > -e) t.mc = 0;
			
			if( t.me < e && t.me > -e) t.me = 0;
			if( t.mf < e && t.mf > -e) t.mf = 0;
			if( t.mg < e && t.mg > -e) t.mg = 0;
			
			if( t.mi < e && t.mi > -e) t.mi = 0;
			if( t.mj < e && t.mj > -e) t.mj = 0;
			if( t.mk < e && t.mk > -e) t.mk = 0;
			
			$c.inv(this);
		},
		
		getXAxis :function () { return {x:this.ma, y:this.mb, z:this.mc}; },
		getYAxis :function () {	return {x:this.me, y:this.mf, z:this.mg}; },
		getZAxis :function () { return {x:this.mi, y:this.mj, z:this.mk}; },
		
		getscaleX :function () { return this._scaleX; },
		scaleX :function (v) { this._scaleX = v; $c.inv(this); },
		
		getscaleY :function () { return this._scaleY; },
		scaleY :function (v) { this._scaleY = v; $c.inv(this); },
		
		getscaleZ :function () { return this._scaleZ; },
		scaleZ :function (v) { this._scaleZ = v; $c.inv(this); },
		
		reset :function () {
			var t = this;
			t.id();
			t._x = t._y = t._z =
			t.rx = t.ry = t.rz = 0;
			t._scaleX = t._scaleY = t._scaleZ = 1;
		},
		
		getdoubleSided : function () { return this._ds; },
		doubleSided : function (d) {
			this._ds = d;
			$c.css(this.div, "backfaceVisibility", this._ds == true ? "visible" : "hidden");
			if(!$c.support && $c.degrade) {
				$c.inv(this);
			}
		},
		updateSize : function () 
		{
			var d = this,
			
			t = d.div, to = "", w, h;
			
			d.invs = false;
			
			if( t.hasAttribute("data-width") ) {
				w = Number( t.getAttribute("data-width") );
			}else{
				// Very slow.. reading offsetWidth
				w = t.width > 0? t.width : t.offsetWidth;
			}
			
			if(t.hasAttribute("data-height")) {
				h = Number( t.getAttribute("data-height") );
			}else{
				// Very slow.. reading offsetHeight
				h = t.height>0? t.height : t.offsetHeight;
			}
			
			d._width = w;
			d._height = h;
			var w2 = Math.floor(w*.5), h2 = Math.floor(h*.5);
			
			if(typeof d._pivotX == "number") {
				d.regX = d._pivotX -w2;
				to = d._pivotX + "px ";
			}else if(d._pivotX == "left") {	
				d.regX = -w2; 
				to = "0px ";
			}else if(d._pivotX == "right") {
				d.regX = w2;
				to = w+"px ";
			}else{
				d.regX = 0;
				to = w2+"px ";
			}
			
			if(typeof d._pivotY == "number") {
				d.regY = d._pivotY-h2;
				to += d._pivotY+"px ";
			}else if(d._pivotY == "top") {
				d.regY = -h2;
				to += "0px ";
			}else if(d._pivotY == "bottom") {
				d.regY = h2;
				to += h+"px ";
			}else{
				d.regY = 0;
				to += h2+"px ";
			}
			
			if(typeof d._pivotZ == "number") {
				if($c.pfx == "Moz" || $c.isFF) {
					d.regZ = d._pivotZ;
				}else{
					d.regZ = 0;	
				}
				to += (d._pivotZ)+"px";
			}else{
				d.regZ = 0;
				to += "0px";
			}
			t.style.left = (-w2)+"px";
			t.style.top = (-h2)+"px";
			
			if($c.support) {
				$c.css(t,"transformOrigin", to);
			}else{
				if( $c.degrade ) {	
					$c.degrade.updateSizeSprite(this);
				}
			}
		},
		
		update : function () 
		{
			if($c.support) 
			{
				var d = this;
				
				if( !$c.ie ) 
				{
				
				var r = $c.r2d;
				d.div.style[ $c.ctr ] = "translate3d("+(d._x-d.regX)+"px,"+(d._y-d.regY)+"px,"+(d._z-d.regZ)+"px) rotateY("+(d.ry*r)+"deg) rotateX("+(d.rx*r)+"deg) rotateZ("+(d.rz*r)+"deg) scale3d("+(d._scaleX)+","+(-d._scaleY)+","+(-d._scaleZ)+")";
				
				  
				/*
				// matrix may be buggy in mozilla with css transitions
				 d.div.style[ $c.ctr ] = "matrix3d("+ (d.ma*d._scaleX)+","+(d.mb*d._scaleX)+","+(d.mc*d._scaleX)+",0,"+
														(-d.me*d._scaleY)+","+(-d.mf*d._scaleY)+","+(-d.mg*d._scaleY)+",0,"+
														(-d.mi*d._scaleZ)+","+(-d.mj*d._scaleZ)+","+(-d.mk*d._scaleZ)+",0,"+
														(d._x-d.regX)+","+(d._y-d.regY)+","+(d._z-d.regZ)+",1)";*/
				} else {
					
					// concat matrix with transposed camera matrix
					var p = d.view,
					pa = p.ma, pb = (-p.me), pc = -p.mi,
					pe = p.mb, pf = (-p.mf), pg = -p.mj,
					pi = p.mc, pj = (-p.mg), pk = -p.mk,
						
					px = -(p._x * p.ma + p._y * p.mb + p._z * p.mc),
					py = -(p._x * (-p.me) + p._y * (-p.mf) + p._z * (-p.mg)),
					pz = -(p._x * (-p.mi) + p._y * (-p.mj) + p._z * (-p.mk)),
		
					ra = (d.ma*pa + d.mb*pe + d.mc*pi)*d._scaleX,
					rb = (d.ma*pb + d.mb*pf + d.mc*pj)*d._scaleX,
					rc = (d.ma*pc + d.mb*pg + d.mc*pk)*d._scaleX,
					
					re = ((-d.me)*pa + (-d.mf)*pe + (-d.mg)*pi)*d._scaleY,
					rf = ((-d.me)*pb + (-d.mf)*pf + (-d.mg)*pj)*d._scaleY,
					rg = ((-d.me)*pc + (-d.mf)*pg + (-d.mg)*pk)*d._scaleY,
					
					ri = (d.mi*pa + d.mj*pe + d.mk*pi)*-d._scaleZ,
					rj = (d.mi*pb + d.mj*pf + d.mk*pj)*-d._scaleZ,
					rk = (d.mi*pc + d.mj*pg + d.mk*pk)*-d._scaleZ,
					
					dx = d._x-d.regX,
					dy = d._y+d.regY,
					dz = d._z-d.regZ,
					
					rm = dx*pa + dy*pe + dz*pi + px,
					rn = dx*pb + dy*pf + dz*pj + py,
					ro = dx*pc + dy*pg + dz*pk + pz;
					
					d.zd = -ro;
					
					d.div.style[ $c.ctr ] = "perspective("+d.view._perspective+"px) matrix3d("+ra+","+rb+","+rc+",0,"+re+","+rf+","+rg+",0,"+ri+","+rj+","+rk+",0,"+rm+","+rn+","+(ro+d.view._perspective)+",1)";
				}
				
			}else{
				if($c.degrade) {
					$c.degrade.updateSprite(this);
				}
			}
		},
		
		setDiv : function (d) 
		{
			this.div = d;
			d.style.position = "absolute";
			$c.css(d,"transformStyle","preserve-3d");
		}
		
	}; // Sprite3d

	$c.View3d.prototype = new $c.Sprite3d();
	
	$c.startInterval = function () {
		if(!$c.running) {
			$c.running = true;
			$c.iid = setInterval($c.interval, 1000/$c.frameRate);
		}
	};
	
	$c.support = (function() 
	{
	    $c.isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	    
		var i,pf,d = document.createElement("div"), prefixes = ["Webkit","Moz","O","ms"];
		for(i=0; i<prefixes.length; i++) {
			pf = prefixes[i];
			if( (pf + "Perspective") in d.style ) {
				$c.pfx = pf;
				$c.pfxCss = "-"+pf.toLowerCase()+"-";
				$c.ctr = pf + "Transform";
				if(pf=="ms"){
					$c.ie = true;
				}else if(pf=="Webkit") {
					$c.trEnd = "webkitTransitionEnd";
					$c.anEnd = "webkitAnimationEnd";
				}
				
				return true;
			}
		}
		return false;
	})();

})();