$(document).ready(() => {
  const createTweetElement = (tweetObject) => {
    const datePosted = tweetObject.created_at
    const today = new Date();
    const difference = Date.parse(today) - datePosted;
    const daysPosted = Math.floor(difference / (24 * 60 * 60 * 1000));

    let $tweet =
      `<article class="tweet-main">
  <header>
    <div class="name-plate">
      <img src="${tweetObject.user.avatars}" alt="user avatar"/>
      <h2>${tweetObject.user.name}</h2>
    </div>
    <h3 class="username">${tweetObject.user.handle}</h3>
  </header>

  <div class="tweet-content">
    <p>${tweetObject.content.text}</p>
  </div>
  <footer>
    <p>posted ${daysPosted} days ago</p>
    <div class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`
    return $tweet;
  };

  //Renders the tweet template to the DOM
  const renderTweets = (tweets) => {
    tweets.forEach((element) => {
      $('#tweet-container').append(createTweetElement(element))
    })
  }

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets)
      })
  };

  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();

    let text = $('#tweet-text').val();

    if (text === null || text === '') {
      alert('Nothing entered')
      return;
    }
    if (text.length > 140) {
      alert('Tweet is to long')
      return;
    }

    $.post('/tweets',
      $('#new-tweet-form').serialize());
    $('#tweet-text').val('');
    $('.char-counter').text(140)
    loadTweets()
  })
});

