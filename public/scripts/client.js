$(document).ready(() => {
  //Initilize WOW adds animation on scroll
  new WOW().init();

  //Cached Jqueries
  const $errorMessage = $('.error-message');
  const $newTweetForm = $('#new-tweet-form');
  const $text = $('#tweet-text');
  const $charCounter = $('.char-counter');
  const $tweetContainer = $('#tweet-container');
  const $animatedTextarea = $('.animation');

  //Prevent js from being injected in tweets from the form
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Create the tweet template
  const createTweetElement = (tweetObject) => {
    const datePosted = tweetObject.created_at;
    const timeSincePost = moment(datePosted).fromNow();

    let $tweet =
      `<article class="tweet-main wow animate__fadeIn animate__animated">
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
          <p>posted ${timeSincePost}</p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`;

    return $tweet;
  };

  //Render the tweet template to the DOM
  const renderTweets = (tweets) => {
    $tweetContainer.empty();
    tweets.reverse().forEach((element) => {
      $tweetContainer.append(createTweetElement(element));
    });
  };

  const loadTweets = () => {
    return $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets);
      });
  };

  //Create and shows error message
  const errorMessage = (message) => {
    $errorMessage.text(message).slideDown('slow');
  };

  //Initial load of tweets
  loadTweets();

  //Tweet submission
  $newTweetForm.submit((event) => {
    event.preventDefault();
    const $textValue = $text.val();

    //Tweet Validation
    if (!$textValue.trim()) {
      errorMessage('Input is empty');
      return false;
    }
    if ($textValue.length > 140) {
      errorMessage('Input exceeds 140 characters');
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

    //Hide the new tweet form and show the new tweet button
    $animatedTextarea.slideUp('slow');

  });

  //Clear error message when the text is changed
  $text.on('input', () => {
    $errorMessage.slideUp('slow', () => {
      $errorMessage.hide();
    });
  });
});
