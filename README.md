Keyframes.Spritesheet
=====================
Keyframes.Spritesheet is a plugin for jQuery.Keyframes that easily generates css3 keyframes for elements using animated spritesheets.

Installation
------------

```
bower install keyframesspritesheet
```

Usage
-----

#### Defining spritesheet keyframes.
```javascript
var keyframes = $.keyframe.spriteSheet({
  name: 'gem', // Name of the spritesheet
  rows: 6, // Number of rows
  cols: 7, // Number of columns
  width: 210, // Width of the spritesheet in pixels
  height: 180, // Height of the spritesheet in pixels
  offsetX: 0, // [Optional] When you have multiple spritesheets in one -
  offsetY: 0, // - image use these to define their offset. 
  count: 39 // [Optional] Define the number of sprites in total
});
```
#### Applying them to an element
```javascript
$(selector).playSpriteSheet(name, time, loop, keyframes);
```
* ```name``` - name of the spritesheet.
* ```time``` - time for the animation to complete.
* ```loop``` - [optional] number of times to repeat the animation (-1 for infinite)
* ```keyframes``` - [optional] pass keyframes to get them defined

#### For example
```javascript
$('.spriteContainer').playSpriteSheet('gem', '3s', -1, keyframes);
```

Credits
-------
"Gems" Image created by Lokiare. Image is subject to the creative commons license: http://creativecommons.org/licenses/by/3.0/
