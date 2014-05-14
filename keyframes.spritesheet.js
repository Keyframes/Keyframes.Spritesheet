
(function() {

  $.keyframe = $.extend($.keyframe, {

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
        fps: 24,
        loop: true
      };

      $.extend(defaults, opts);

      spriteFrames = {};
      var x = 0;
      var y = 0;
      for(var i = 0; i < opts.count; i++){
        
      }

      $.keyframe.define([
        $.extend({ name: opts.name }, spriteFrames)
      ]);

    }

  });

}).call(this);