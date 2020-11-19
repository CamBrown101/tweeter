$(document).ready(() => {
  //Cached queries 
  const $errorMessage = $('.error-message');
  const $newTweetForm = $('#new-tweet-form');
  const $text = $('#tweet-text');
  const $charCounter = $('.char-counter');
  const $tweetContainer = $('#tweet-container');

  //Prevents js from processed in tweets
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str))
    return div.innerHTML
  };

  //Creates the tweet template
  const createTweetElement = (tweetObject) => {
    const datePosted = tweetObject.created_at
    const today = new Date();
    let difference = (Date.parse(today) - datePosted)
    //Sending quick requests to the server results in a delay server side causing negative times 
    difference = (difference < 0) ? 0 : difference;
    const daysPosted = Math.floor(difference / (24 * 60 * 60 * 1000));

    let $tweet =
      `<article class="tweet-main">
        <header>
          <div class="name-plate">
            <img src="${escape(tweetObject.user.avatars)}" alt="user avatar"/>
            <h2>${escape(tweetObject.user.name)}</h2>
          </div>
          <h3 class="username">${escape(tweetObject.user.handle)}</h3>
        </header>

        <div class="tweet-content">
          <p>${escape(tweetObject.content.text)}</p>
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
    $tweetContainer.empty();
    tweets.reverse().forEach((element) => {

      $tweetContainer.append(createTweetElement(element));
    })
  }

  const loadTweets = function() {
    return $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets);
      })
  };
  //Initial load of tweets
  loadTweets();

  //Creates and shows error message
  const errorMessage = (message) => {
    $errorMessage.text(message).slideDown('slow');
  };

  $newTweetForm.submit((event) => {
    event.preventDefault();
    const $textValue = $text.val();

    //Tweet Validation
    if (!$textValue.trim()) {
      errorMessage('Input is empty');
      return false;
    }
    if ($textValue.length > 140) {
      errorMessage('Input exceeds 140 characters')
      return false;
    }

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $newTweetForm.serialize(),
    }).then(() => {
      $text.val('');
      $charCounter.text(140);
      return loadTweets();
    });
  });

  //Clears error message when the text is changed
  $text.on('input', () => {
    $errorMessage.slideUp('slow', () => {
      $errorMessage.hide();
    });
  });
});
