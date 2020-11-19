$(document).ready(() => {

  //Jquery cached variables
  const $tweetBtn = $('.new-tweet-btn');
  const $animatedTextarea = $('.animation');
  const $arrows = $('.arrows')

  //New tweet input button
  $tweetBtn.mouseenter(() => {
    $arrows.addClass('animate__bounce animate__animated animate__infinite	infinite');
  });

  $tweetBtn.mouseleave(() => {
    $arrows.removeClass('animate__bounce animate__animated animate__infinite	infinite');
  });

  $tweetBtn.on('click', () => {
    $animatedTextarea.slideToggle('slow');
    $('#tweet-text').focus();
  })

  $(window).scroll(() => {
    if ($(window).scrollTop() > 50) {
      $('.footer-container').show('slow')
    }
  })

  $('.back-to-top-btn').click(() => {
    $("body").get(0).scrollIntoView();
    $('.footer-container').hide('slow');
  })
});
