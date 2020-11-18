
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];



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

  const renderTweets = (tweets) => {
    tweets.forEach((element) => {
      $("#tweet-container").append(createTweetElement(element))
    })
  }
  renderTweets(data);
});

