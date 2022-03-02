/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const tweetsData = [

  ];
  // Create a tweet template that will be rendered
  const createTweetElement = (tweet) => {
    
    const $tweet =
      `<article class="old-tweet">
      <header class="old-tweet_header">
         <div>
          <img src="/images/profile-hex.png" alt ="user-avatar">
          <span>${tweet["user"].name}</span>
         </div>
          <span>${tweet["user"].handle}</span>
      </header>
        <div class ="old-tweet_text">
          <div>${tweet["content"].text}</div>
        </div>
       <footer class="old-tweet_footer">
          <div>
            <span>${timeago.format(tweet["created_at"])}</span>
              <div>
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
          </div>
      </footer>
    </article>
     `
    return $tweet;
  }
  // Loop through tweets Database to render each tweet to the user.
  const renderTweet = (tweetsData) => {
    // empty the tweet container
    $('#tweets-container').empty();
    for (let tweet of tweetsData) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }
  
  // Handling form Submission

  $("form").on("submit", function(event){
    event.preventDefault();
    // get user input that will be sent
    const formData = $(this).serialize();
    // Sending a Post request
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: formData,
      success: function(){
        console.log("success");
        loadTweets();
      },
      dataType: 'string'
    });
    // loadTweets();
  })
  // fetching tweets from the http://localhost:8080/tweets page
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      dataType: 'JSON',
      success: function(data){
        console.log("data received",data);
        renderTweet(data);
      },
    });
  }
  loadTweets();
});
