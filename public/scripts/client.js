
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  $(".new-tweet").hide(); // By Default , our compose tweet section is hidden . 
  $(".validation-message").hide(); // By Default our validation message is hidden.

  // Our Database 
  const tweetsData = [

  ];
  // Function to prevent cross scripting 
  const escapeSpan = function (str) {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  };
  const escapeDiv = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // Create a tweet template that will be rendered
  const createTweetElement = (tweet) =>{
    const $tweet =
      `<article class="old-tweet">
      <header class="old-tweet_header">
         <div>
          <img src="/images/profile-hex.png" alt ="user-avatar">
          <span>${escapeSpan(tweet["user"].name)}</span>
         </div>
          <span>${escapeSpan(tweet["user"].handle)}</span>
      </header>
        <div class ="old-tweet_text">
          <div>${escapeDiv(tweet["content"].text)}</div>
        </div>
       <footer class="old-tweet_footer">
          <div>
            <span class="red-in-color">${escapeSpan(timeago.format(tweet["created_at"]))}</span>
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
    $('#tweets-container').empty();// empty the tweet container 
    for (let tweet of tweetsData){
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }
  // Validates the form 
  const ValidateForm = () => {
    // Check if textarea is empty 
    if(!$("textArea").val()){
      $(".validation-message").text("Tweet can't be empty!").slideDown('fast');
      return false;
    }else if($("textArea").val().length > 140){ // Checks if length of tweet greater than 140 characters
      $(".validation-message").text("Tweet cannot be longer than 140 characters").slideDown('fast');
      return false;
    }
    $('.validation-message').slideUp('fast');
    $('textArea').val(""); // Clears the textbox 
    $('.counter').text(140); // Resets the counter to 140.
    return true;
  }

  // Handling form Submission
  $("form").on("submit", function(event) {
    event.preventDefault();
    // get user input that will be sent
    const formData = $(this).serialize();
    if(ValidateForm()){
      // Sending a Post request
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: formData,
        success: function() {
          loadTweets();
        },
        dataType: 'string'
      });
    loadTweets();
    };
    loadTweets();
  })

  // fetching tweets from the http://localhost:8080/tweets page
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      dataType: 'JSON',
      success: function(data) {
        renderTweet(data);
      },
    });
  }
  loadTweets();

  // Stretch Part of the Project:
  $("nav :last-child").on("click", function(event){
    event.stopPropagation();
    $(".new-tweet").slideToggle('slow');
  })
});
