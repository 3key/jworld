jworld - 3D for jQuery
======================

* @name jquery.jworld.js
* @author Daniel Reitterer (http://3key.at/jworld)
* @version 0.9.8
* @codename: Amethyst
* @category jQuery plugin
* @license MIT license
* @example http://3key.at/jworld

* JWorld is a fast and lightweight 3D-sprite engine based on HTML5 and CSS-3D transforms
* JWorld  makes it easy to create camera animations in the browser without any plugins.
* It is possible to set camera position, rotation, move and rotate about local axis, and set the field of view
* Html elements can be positioned, rotated, and scaled in 3d

Modes
=====

* add                | Add a div to the view
* addElements        | Add Array of sprite divs, the children of a div, or a jquery object to a view
* browserPrefix      | Prefix for Javascript
* css                | Set special css with correct browser prefix like perspective, transform, transition etc.
* cssPrefix          | Prefix for css
* get                | Get value
* matrixTransition   | Set css transition property for css transform
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
* width         | Camera width
* height        | Camera height
* fov           | Camera field of view in degree
* perspective   | Camera perspective
