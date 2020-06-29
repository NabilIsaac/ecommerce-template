$(document).ready(function() {

  $('.color-choose input').on('click', function() {
      var headphonesColor = $(this).attr('data-image');

      $('.active').removeClass('active');
      $('.left-column img[data-image = ' + headphonesColor + ']').addClass('active');
      $(this).addClass('active');
  });
  var scrollTop = 0;
  $(window).scroll(function(){
      scrollTop = $(window).scrollTop();
      $('.counter').html(scrollTop);
      if (scrollTop >= 100) {
          $('#scrolled').addClass('scrolled-nav');
      } else if (scrollTop < 100) {
          $('#scrolled').removeClass('scrolled-nav');
      }
  });

});
