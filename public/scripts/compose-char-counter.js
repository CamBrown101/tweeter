$(document).ready(() => {
  $('#tweet-text').on('input', function() {
    let inputValue = $(this).val();
    let counter = 140 - inputValue.length;
    $(this.form[2]).text(140 - inputValue.length)

    if (counter >= 0) {
      $(this.form[2]).removeClass('red-text')
    }
    if (counter < 0) {
      $(this.form[2]).addClass('red-text')
    }
  })
})