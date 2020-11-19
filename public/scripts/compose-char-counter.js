$(document).ready(() => {
  const tweetText = $('#tweet-text');

  tweetText.on('input', function() {
    let inputValue = $(this).val();
    let counter = 140 - inputValue.length;

    const characterCountHtml = $(this.form[2])
    characterCountHtml.text(140 - inputValue.length)

    if (counter >= 0) {
      characterCountHtml.removeClass('red-text')
    }
    if (counter < 0) {
      characterCountHtml.addClass('red-text')
    }
  })
});