(function() {

  vendorPrefix = $.keyframe.getVendorPrefix();

  $.keyframe = $.extend($.keyframe, {

    spriteSheets: {},

    spriteSheet: function(opts){

      var defaults = {
        name: '',
        rows: 1,
        cols: 1,
        height: 0,
        width: 0,
        offsetX: 0,
        offsetY: 0,
        count: (opts.rows * opts.cols),
        spriteWidth: (opts.width / opts.cols),
        spriteHeight: (opts.height / opts.rows),
        loop: true
      };

      opts = $.extend(defaults, opts);

      $.keyframe.spriteSheets[opts.name] = opts;

      spriteStep = 100 / opts.count;
      spriteFrames = {};
      var x = opts.offsetX;
      var y = opts.offsetY;
      for(var i = 0; i < opts.count; i++){
        spriteFrames[Math.round(spriteStep * i) + '%'] = {
          'background-position': '-' + x + 'px -' + y + 'px'
        }
        if(x >= opts.width - opts.spriteWidth){
          y += opts.spriteHeight;
          x = opts.offsetX;
        }else{
          x += opts.spriteWidth;
        }
      }

      return $.extend({ name: opts.name }, spriteFrames);

    }

  });

  $.fn.playSpriteSheet = function(name, time, loops, keyframes){
    if(keyframes){
      $.keyframe.define(keyframes);
    }
    if(loops){
      if(loops < 0){
        loops = 'infinite';
      }
    }else{
      loops = 'infinite';
    }

    var animate = name + ' ' + time + ' steps(1) ' + loops;
    var existingAnimation = this.css(vendorPrefix + 'animation');
    if(existingAnimation == ""){
      existingAnimation = this[0].style.animation;
      eaArray = existingAnimation.split(' ');
      if(eaArray[eaArray.length-1] != "none"){
        animate = existingAnimation + ', ' + animate;
      }
    }else{
      if(existingAnimation.split(' ')[0] != "none"){
        animate = existingAnimation + ', ' + animate;
      }
    }
    
    this.css(vendorPrefix + 'animation', animate);
    return this;
  }

}).call(this);