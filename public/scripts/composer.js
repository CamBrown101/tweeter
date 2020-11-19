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
  })

  //Back to top button
  $(window).scroll(() => {
    $('.footer-container').show('slow')
  })
  $('.back-to-top-btn').click(() => {
    $animatedTextarea.slideDown('slow');
    $("body").get(0).scrollIntoView();
    $('.back-to-top-btn').hide('slow');
  })
});
