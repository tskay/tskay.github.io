$(window).scroll(function() {
  
    // selectors
    var $window = $(window),
        $body = $('body'),
        $panel = $('.panel');
        $sdgfontcol = $('.sdgfontcol');
    
    // Change 33% earlier than scroll position so colour is there when you arrive.
    var scroll = $window.scrollTop() + ($window.height() / 3);
   
    $panel.each(function () {
      var $this = $(this);
      
      // if position is within range of this panel.
      // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
      // Remember we set the scroll to 33% earlier in scroll var.
      if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
            
        // Remove all classes on body with color-
        $body.removeClass(function (index, css) {
          return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
        });
        $sdgfontcol.removeClass(function (index, css) {
          return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
        });

        var color = $this.data('color');
         
        // Add class of currently active div
        $body.addClass('color-' + $(this).data('color'));
        $sdgfontcol.addClass('color-' + $(this).data('color'));
      }
    });    
    
  }).scroll();

  window.onload = function() {
    // Trigger "Amun" effect on page load or reload
    $('[data-fx="Amun"]').trigger('click');
  };

  