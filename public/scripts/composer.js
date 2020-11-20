$(document).ready(() => {

  //Jquery cached variables
  const $tweetBtn = $('.new-tweet-btn');
  const $animatedTextarea = $('.animation');
  const $arrows = $('.arrows');
  const $footerContainer = $('.footer-container');
  const $backToTopBtn = $('.back-to-top-btn');
  const $tweetText = $('#tweet-text');

  //New tweet input button
  $tweetBtn.mouseenter(() => {
    $arrows.addClass('animate__bounce animate__animated animate__infinite	infinite');
  });

  $tweetBtn.mouseleave(() => {
    $arrows.removeClass('animate__bounce animate__animated animate__infinite	infinite');
  });

  $tweetBtn.click(() => {
    $animatedTextarea.slideToggle('slow');
    $tweetText.focus();
  });

  $(window).scroll(() => {
    if ($(window).scrollTop() > 50) {
      $footerContainer.show('slow');
    }
  });

  $backToTopBtn.click(() => {
    $("body").get(0).scrollIntoView();
    $footerContainer.hide('slow');
  });
});
