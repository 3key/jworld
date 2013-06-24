

/**
*
*
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
*              http://3key.at/jworld   http://github.com/3key/jworld   contact: dr101 [at] gmx [.] at
*           _________________________________________________________________________________________________
*
*       
*  Render jworld scenes in html4 browsers
*
*  Rendering supports only the div styles: left, top, width and height
*
*/

(function($) {
	
	if($.fn.world) {
	
		var $c = $.fn.world.core;
		
		$c.degradeHtml4 = {			
			updateSprite :function (sp) 
			{
				var vec1 = {}, vec2 = {}, vec3 = {}, vec4 = {},
				 ct = sp.view._width/2,
				 cs = sp.view._height/2,
				 cw = sp._width,
				 ch = sp._height;
				
				$c.stp.projectPoint( sp.view, sp, 0, 0, 0, vec1, true);
				
				var display = "block";
				
				if( vec1.culled ) {
					sp.div.style.display = "none";
					return;
				}else{
					sp.div.style.left = (Math.floor(vec1.sx)) + "px";
					sp.div.style.top = (Math.floor(vec1.sy)) + "px";
				}
				
				
				if(typeof sp.noDepthScale === "undefined") {
						
					$c.stp.projectPoint( sp.view, sp, .01, -ch/2, .01, vec2, true);
					$c.stp.projectPoint( sp.view, sp, cw/2, .01, .01, vec3, true);
					
					var dx_w =  vec3.sx - vec1.sx; 
					var dy_w =  vec3.sy - vec1.sy;
					var dw = Math.sqrt(dx_w*dx_w + dy_w*dy_w);
					 
					var dx_h = vec2.sx - vec1.sx; 
					var dy_h = vec2.sy - vec1.sy;
					var dh = Math.sqrt(dx_h*dx_h + dy_h*dy_h);
					 
					 if( dx_w > 0 ) { 
						 sp.div.style.width = Math.floor(dw*2) + "px";
						 sp.div.style.left = (Math.floor(vec1.sx)-dw) + "px";
					 }else{
						 if(sp._doubleSided == true) {
							 sp.div.style.width = Math.floor(-dw*2) + "px";
							 sp.div.style.left = (Math.floor(vec1.sx)+dw) + "px";
						 }else{
						 	display = "none";
						 }
					 }
					
					if( dy_h > 0 ) {
						 sp.div.style.height = Math.floor(dh*2) + "px";
						 sp.div.style.top = (Math.floor(vec1.sy)-dh) + "px";
					}else{
						if(sp._doubleSided == true) {
							sp.div.style.height = Math.floor(-dh*2) + "px";
						 	sp.div.style.top = (Math.floor(vec1.sy)+dh) + "px";
						}else{
							display = "none";
						}
						 
					}
					
				}
				sp.div.style.display = display;
				
			
			},
			updateSizeSprite :function (sp) {},
			updateSizeView :function (view) 
			{
				var _farClipping = 987654; 
				var _nearClipping = 0.01;
				
				if(!view._ortho) {
					
					var aspect = view._height/view._width;
					var h2 = Math.cos(view._fov/2)/Math.sin(view._fov/2);
					var w2 = aspect * h2;
					var q = _farClipping/(_farClipping-_nearClipping);
					
					$c.stp.html4_a = w2;
					$c.stp.html4_f = h2;
					$c.stp.html4_k = q;
					$c.stp.html4_o = -q * _nearClipping;
				}
			},
			
			updateView :function (view) 
			{
				var gv = view.tgv;
				var cgv = $c.stp.html4_cgv;
				
				cgv.a = gv.a*$c.stp.html4_a;	cgv.b = gv.e*$c.stp.html4_f;	cgv.c = gv.i*$c.stp.html4_k;	
				cgv.e = gv.b*$c.stp.html4_a;	cgv.f = gv.f*$c.stp.html4_f;	cgv.g = gv.j*$c.stp.html4_k;	
				cgv.i = gv.c*$c.stp.html4_a;	cgv.j = gv.g*$c.stp.html4_f;	cgv.k = gv.k*$c.stp.html4_k;
				
				var x = view._x;
				var y = view._y;
				var z = view._z;
				
				$c.stp.html4_x = -(x * gv.a + y * gv.b + z * gv.c) * $c.stp.html4_a;
				$c.stp.html4_y = -(x * gv.e + y * gv.f + z * gv.g) * $c.stp.html4_f;
				$c.stp.html4_z = -(x * gv.i + y * gv.j + z * gv.k) * $c.stp.html4_k + $c.stp.html4_o;
				
				for(var i=0; i<view.sprites.length; i++) {
					view.sprites[i].update();
					$c.cancelUpdate(view.sprites[i]);
				}
				
				view.sprites.sort( $c.sortFunc );
				for(i=0; i<view.sprites.length; i++) {
					view.sprites[i].div.style.zIndex = view.startDepth + i;
				}
			}
		}
		$c.stp.projectPoint = function (view,obj,x,y,z,out,cull) {
			if(obj != null) {
				var mt = obj.tgv;
				var x2 = mt.a*x + mt.e*y + mt.i*z + obj._x;
				var y2 = mt.b*x + mt.f*y + mt.j*z + obj._y;
				var z2 = mt.c*x + mt.g*y + mt.k*z + obj._z;
				
				x = x2;
				y = y2;
				z = z2;
			}
			var cgv = $c.stp.html4_cgv;
			out.wx = cgv.a*x + cgv.e*y + cgv.i*z + $c.stp.html4_x;
			out.wy = cgv.b*x + cgv.f*y + cgv.j*z + $c.stp.html4_y;
			out.wz = cgv.c*x + cgv.g*y + cgv.k*z + $c.stp.html4_z + 0.01;
			
			var s = view._height/2;
			var t = view._width/2;
			
			if(!view._ortho) {
					if(cull) {
						if(out.wz < 0.01 || out.wy < -out.wz || out.wy > out.wz || out.wx < -out.wz || out.wx > out.wz) {
							out.culled = true;
						}
					}else{
						out.culled = false;
					}
				if(out.wz>0) {
					out.sy =  - out.wy/out.wz * s;
					out.sx =  out.wx/out.wz * t;
				}else{
					out.sy =  - out.wy * s;
					out.sx =  out.wx * t;
				}
			}
		}
		$c.stp.html4_cgv = new $c.Matrix3d();
		$c.stp.html4_x = 0;
		$c.stp.html4_y = 0;
		$c.stp.html4_z = 0;
		$c.stp.html4_a = 0;
		$c.stp.html4_f = 0;
		$c.stp.html4_k = 0;
		$c.stp.html4_o = 0;
		
		
		// use html4 degrade functions in core
		$c.degrade = $c.degradeHtml4;
		
		
	}
	
	
})(jQuery); 