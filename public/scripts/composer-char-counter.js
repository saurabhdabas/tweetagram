$(document).ready(function() {
  // A counter to keep track of live input by user.

  $('#tweet-text').on('keyup', function(e) {
    let charCount = $(this).val().length;
    let remainingChars = 140 - charCount;

    //traversing dom to access element with class 'counter'
    let counter = $(this).next('div').children('.counter');
    counter.text(remainingChars);

    if (remainingChars < 0) {
      counter.addClass('red-in-color');
    } else {
      counter.removeClass('red-in-color');
    }
  });
});
