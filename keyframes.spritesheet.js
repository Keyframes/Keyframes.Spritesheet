
(function() {

  vendorPrefix + vendorPrefix = $.keyframe.getVendorPrefix();

  $.keyframe = $.extend($.keyframe, {

    spriteSheets: {},

    spriteSheet: function(opts){

      var defaults = {
        name: ''
        rows: 1,
        cols: 1,
        height: 0,
        width: 0,
        offsetX: 0,
        offsetY: 0,
        count: (rows * cols),
        spriteWidth: (opts.width / opts.cols),
        spriteHeight: (opts.height / opts.rows),
        loop: true
      };

      $.extend(defaults, opts);

      $.keyframe.spriteSheets[opts.name] = opts;

      spriteStep = 100 / opts.count;
      spriteFrames = {};
      var x = opts.offsetX;
      var y = opts.offsetY;
      for(var i = 0; i < opts.count; i++){
        spriteFrames[(spriteStep * i) + '%'] = {
          'background-position': '-' + (opts.spriteWidth + x) + 'px -' + (opts.spriteHeight + y) + 'px'
        }
        if(x >= (opts.cols * opts.spriteWidth)){
          y += opts.spriteHeight;
          x = 0;
        }else{
          x += opts.spriteWidth;
        }
      }

      return $.extend({ name: opts.name }, spriteFrames);

    }

  });

  $.fn.playSpriteSheet = function(name, time, loops, opts){
    if(opts){
      opts['name'] = name;
      $.keyframe.spriteSheet(opts);
      $(this).playSpriteSheet(name);
    }else{
      opts = $.keyframe.spriteSheets[name];
      if(opts){
        if(loops){
          if(loops < 0){
            loops = 'infinite';
          }
        }else{
          loops = 'infinite';
        }

        var animate = name + ' ' + time + ' steps(' + opts.count + ') ' + loops;
        var existingAnimation = $(this).css('animation');
        if(existingAnimation){
          animate = existingAnimation + ', ' + animate;
        }
        $(this).css(vendorPrefix + 'animation', animate);
      }
    }
  }

}).call(this);