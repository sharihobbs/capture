'use strict'

const POSTS_URL = 'http://localhost:8080/api/posts'

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getRecentGratitudes(callbackFn) {
  $.getJSON(POSTS_URL, function(data) {
    callbackFn(data)
  })
}

// this function stays the same when we connect
// to real API later
function displayGratitudes(data) {
  console.log('data:', data);
  for (let index in data) {
    const gratDisplay = $(`
      <div class="grat-card">
        <img class="grat-image" src="${data[index].image}" width=250px</>
        <p class="grat-date">${data[index].created}</p>
        <p class="grat-text">${data[index].text}</p>
      </div>`);
  $('.gratitudes').append(gratDisplay);
  }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayGratitudes() {
  getRecentGratitudes(displayGratitudes);
  //getRecentGratitudes(displayRows);
}

//  on page load do this
$(function() {
  getAndDisplayGratitudes();
})
