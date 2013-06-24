jworld - 3D for jQuery
======================

* @name jquery.jworld.js
* @author Daniel Reitterer (http://3key.at/jworld)
* @version 0.9.13
* @codename: Amethyst
* @category jQuery plugin
* @license MIT license
* @example http://3key.at/jworld/demo.html

* JWorld is a fast and lightweight 3D-sprite engine based on HTML5 and CSS-3D transforms
* JWorld  makes it easy to create camera animations in the browser without any plugins.
* It is possible to set camera position, rotation, move and rotate about local axis, and set the field of view
* Html elements can be positioned, rotated, and scaled in 3d

Modes
=====

* add                | Add a div to the view
* addElements        | Add Array of sprite divs, the children of a div, or a jquery object to a view
* animation          | Set css keyframe animations
* browserPrefix      | Prefix for Javascript
* container          | Returns the html element for views and sprites
* css                | Set special css üroperties with correct browser prefix like perspective, transform, transition etc.
* cssPrefix          | Prefix for css
* frameRate          | frameRate for internal rendering update, default: 50 fps. The frameRate does not change the frameRate for css-transitions and animations
* get                | Get value
* matrixChannel      | Create a new keyframe channel for css animation, arguments: channel-name, optional-object3d, frame1, ... frameN
* matrixTransition   | Set css transition property for css transform
* object3d           | Returns the core Object3d object for views and sprites
* remove             | Remove a div from view
* removeElements     | Remove a list of sprite divs from the view
* reset              | Reset the transform of the item
* set                | Set value
* support            | Boolean indicates if css 3d transform is available
* update             | Redraw the item or view
* updateSize         | Update the view size

Properties for world function (get/set)
=======================================
* Name          | Value
* ===============================
* x             | Object Position
* y             | 
* z             | 
* moveX         | Move Object on local axis
* moveY         | 
* moveZ         | 
* offsetX       | Move Object by offset
* offsetY       | 
* offsetZ       | 
* rotateX       | get/set Object Rotation
* rotateY       | 
* rotateZ       | 
* offsetRotateX | Rotate Object by offset
* offsetRotateY | 
* offsetRotateZ | 
* localRotateX  | set Rotate Object on local axis
* localRotateY  | 
* localRotateZ  | 
* scaleX        | Object Scale
* scaleY        | (get/set)
* scaleZ        |
* pivotX        | Registration point for sprites, string, left, center, right or number
* pivotY        | Registration point for sprites, string, top, middle, center, bottom or number
* pivotZ        | Registration point for sprites, string, center or number
* width         | Camera width
* height        | Camera height
* fov           | Camera field of view in degree
* perspective   | Camera perspective
* noSetup       | dont create 3d sprites when the view is created, default is false
