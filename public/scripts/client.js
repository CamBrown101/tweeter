$(document).ready(() => {

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
    $('#tweet-container').empty();
    tweets.reverse().forEach((element) => {

      $('#tweet-container').append(createTweetElement(element));
    })
  }

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets);
      })
  };
  //Initial load of tweets
  loadTweets();

  //On new tweet form submit
  $('#new-tweet-form').submit((event) => {
    event.preventDefault();
    const text = $('#tweet-text').val();
    const $errorMessage = $('.error-message');
    const errorMessage = (message) => {
      $errorMessage.text(message).slideDown('slow');
    };
    //Tweet Validation
    if (!text) {
      errorMessage('Input is empty');
      return false;
    }
    if (text.length > 140) {
      errorMessage('Input exceeds 140 characters')
      return false;
    }
    $('#tweet-text').on('input', () => {
      $errorMessage.slideUp('slow', () => {
        $errorMessage.css('display', 'none')
      });
    });

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $('#new-tweet-form').serialize(),
    })
      //Reset char Counter bad reload tweets
      .then(() => {
        $('#tweet-text').val('');
        $('.char-counter').text(140);
        loadTweets();
      })
  });
})
