function a() {
  document.getElementById('stage').addEventListener('mousedown', function(e){
    console.log('statge licke', e);

    var div = document.createElement('div');
    div.className = 'block';
    div.style.left = e.clientX + 'px';
    div.style.top = e.clientY + 'px';
    div.addEventListener('mousedown', function(e) {
      var self = this;
      document.addEventListener('mousemove',move(e, div));
      e.stopPropagation();
    });
    div.addEventListener('mouseup', function(e) {
      console.log('up');
      document.removeEventListener('mousemove', move);
    });
    this.appendChild(div);
  });
}
function move(e, div) {
  div.style.left = e.clientX + 'px';
  div.style.top = e.clientY + 'px';
}
$(function() {
  var dragging = [];
  var moving = false;
  $(document).on('mousedown touchstart', function(e) {
    if (!moving) {
      if (typeof e.originalEvent.touches != 'undefined') {
        for (var i = 0; i < e.originalEvent.touches.length; i++) {
          var block = $('<div class="block"></div>');
          block.css({
            left: e.originalEvent.touches[i].pageX,
            top: e.originalEvent.touches[i].pageY
          });
          $('#stage').append(block);
          $(div).hammer({
            drag: true,
            transform: true
          });
        }
      }
      else {
        var block = $('<div class="block"></div>');
        block.css({
          left: e.originalEvent.pageX,
          top: e.originalEvent.pageY
        });
        $('#stage').append(block);
      }
    }
    e.preventDefault();
    return false;
  });
  $('#stage').on('mousedown touchstart', '.block', function(e) {
    var self = this;
    var currentWidth = $(this).width();
    moving = true;
    $(document).on('mousemove touchmove', function(e) {
      if (typeof e.originalEvent.touches != 'undefined') {
        e.originalEvent.touches[0]
        $(self).css({
          left: e.originalEvent.touches[0].pageX - (currentWidth/2),
          top: e.originalEvent.touches[0].pageY - (currentWidth/2)
        });

      }
      else {
        $(self).css({
          left: e.originalEvent.pageX,
          top: e.originalEvent.pageY
        });
      }
      e.preventDefault();
      return false;
    });
    $(this).hammer().on('rotate', function() {
      console.log('rotate');
      $(self).css({
        width: e.originalEvent.scale * currentWidth,
        height: e.originalEvent.scale * currentWidth,
        'webkitTransform': 'rotate('+e.originalEvent.rotation+'deg)'
      });
      e.preventDefault();
      e.stopPropagation();
    });
    $(document).on('mouseup touchend', function(e) {
      var remove = true;
      if (typeof e.originalEvent.touches != 'undefined') {
        if (e.originalEvent.touches.length != 0) {
          remove = false;
        }
      }
      if (remove) {
        moving = false;
        $(document).off('mousemove touchmove gesturechange');
      }
    });
    e.stopPropagation();
  });
});
