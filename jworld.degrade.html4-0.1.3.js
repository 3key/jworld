
/**
*
*
*________________________________________________________________________________________________
*_______/\\\\\\\\\\\__/\\\______________/\\\______________________________/\\\\\\____________/\\\__        
* ______\/////\\\///__\/\\\_____________\/\\\_____________________________\////\\\___________\/\\\__          
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
*  Render jworld scenes in html4 browsers, requires the jworld version 0.9.15 
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
				var vec1 = {}, vec2 = {}, vec3 = {},
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
				
				sp.zd = vec1.wz;
				
				if(typeof sp.noDepthScale === "undefined") {
						
					$c.stp.projectPoint( sp.view, sp, 0, -ch/2, 0, vec2, true);
					$c.stp.projectPoint( sp.view, sp, cw/2, 0, 0, vec3, true);
					
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
						 if(sp._ds == true) {
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
						if(sp._ds == true) {
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
			
			updateView :function (gv) 
			{
				var cgv = $c.stp.html4_cgv;
				
				cgv.a = gv.ma*$c.stp.html4_a;	cgv.b = gv.me*$c.stp.html4_f;	cgv.c = gv.mi*$c.stp.html4_k;	
				cgv.e = gv.mb*$c.stp.html4_a;	cgv.f = gv.mf*$c.stp.html4_f;	cgv.g = gv.mj*$c.stp.html4_k;	
				cgv.i = gv.mc*$c.stp.html4_a;	cgv.j = gv.mg*$c.stp.html4_f;	cgv.k = gv.mk*$c.stp.html4_k;
				
				var x = gv._x;
				var y = gv._y;
				var z = gv._z;
				
				$c.stp.html4_x = -(x * gv.ma + y * gv.mb + z * gv.mc) * $c.stp.html4_a;
				$c.stp.html4_y = -(x * gv.me + y * gv.mf + z * gv.mg) * $c.stp.html4_f;
				$c.stp.html4_z = -(x * gv.mi + y * gv.mj + z * gv.mk) * $c.stp.html4_k + $c.stp.html4_o;
				
				for(var i=0; i<gv.sprites.length; i++) {
					gv.sprites[i].update();
					$c.cancelUpdate(gv.sprites[i]);
				}
				
				gv.sprites.sort( $c.sortFunc );
				for(i=0; i<gv.sprites.length; i++) {
					gv.sprites[i].div.style.zIndex = gv.zd + i;
				}
			}
		}
		$c.stp.projectPoint = function (view,obj,x,y,z,out,cull) {
			if(obj != null) {
				var x2 = obj.ma*x + obj.me*y + obj.mi*z + obj._x;
				var y2 = obj.mb*x + obj.mf*y + obj.mj*z + obj._y;
				var z2 = obj.mc*x + obj.mg*y + obj.mk*z + obj._z;
				
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
		$c.stp.html4_cgv = {a:1,b:0,c:0, e:0,f:1,g:0, i:0,j:0,k:1};
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