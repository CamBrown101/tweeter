$(document).ready(() => {
  const $tweetBtn = $('.new-tweet-btn');
  const $animatedTextarea = $('.animation');

  $tweetBtn.mouseenter(() => {
    $tweetBtn.addClass('animate__bounce animate__animated animate__infinite	infinite');
  });
  $tweetBtn.mouseleave(() => {
    $tweetBtn.removeClass('animate__bounce animate__animated animate__infinite	infinite');
  });
  $tweetBtn.on('click', () => {
    $animatedTextarea.slideToggle('slow');
  });
});
