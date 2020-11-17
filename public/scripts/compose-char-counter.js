$(document).ready(() => {
  $('#tweet-text').on('input', function() {
    let inputValue = this.value;
    let counter = 140 - inputValue.length;
    $(this.form[2]).html(counter)
    if (counter <= 0) {
      $(this.form[2]).addClass('red-font')
    }
    console.log();
  })
})