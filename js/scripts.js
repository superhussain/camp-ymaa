(function ($) {
  jQuery(document).ready(function ($) {
    //functions on doc ready
    scroll();
    hamburger();
    contactForm();
    slider();
    navScroll();
    $(window).scroll(function() {
      // functions on scroll
      navScroll();
    });
  });
})(jQuery);

var scroll = function() {
  $(".scroll").click(function (event) { // When a link with the .scroll class is clicked
    event.preventDefault(); // Prevent the default action from occurring
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top
    }, 500); // Animate the scroll to this link's href value
  });
}

var hamburger = function() {
  $('.hamburger-menu').on('click', function() {
    $('.bar').toggleClass('animate');
    $('nav ul.navbar').slideToggle('slow');
  });
}

var contactForm = function() {
  $("#contact-submit").on('click', function () {
    $contact_form = $('#contact-form');
    var fields = $contact_form.serialize();
    $.ajax({
      type: "POST",
      url: "js/contact.php",
      data: fields,
      dataType: 'json',
      success: function (response) {
        if (response.status) {
          $('#contact-form input').val('');
          $('#contact-form textarea').val('');
        }
        $('#response').empty().html(response.html);
      }
    });
    return false;
  });
}

var slider = function() {
  var $slider = $('.slide-wrapper');
  var $offset = $slider.offset().left;
  var $width = $(window).width() + 17;

  $('i.slide-right').on('click', function() {
    console.log('slide right');
    if ($offset * -1 + $width >= $slider.width() - 50) {
      $offset = 0;
      $slider.animate({marginLeft: $offset}, 500);
    } else {
      $offset = $offset - $width;
      $slider.animate({marginLeft: $offset}, 500);
    }
  });

  $('i.slide-left').on('click', function() {
    console.log('slide left');
    if ($offset == 0) {
      $offset = ($width) * -2;
      $slider.animate({marginLeft: $offset}, 500);
    } else {
      $offset = $offset + $width;
      $slider.animate({marginLeft: $offset}, 500);
    }
  });

  setInterval(function() {
    if ($offset * -1 + $width >= $slider.width() - 50) {
      $offset = 0;
      $slider.animate({marginLeft: $offset}, 500);
    } else {
      $offset = $offset - $width;
      $slider.animate({marginLeft: $offset}, 500);
    }
  }, 10000);
}

var navScroll = function() {
  var $scrollTop = $(window).scrollTop();
  if ($scrollTop >= 50) {
    $('nav').addClass('scrolled');
  } else {
    $('nav').removeClass('scrolled');
  }
}
