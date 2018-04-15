'use strict'

const POSTS_URL = 'http://localhost:8080/api/posts'

function getRecentGratitudes(callbackFn) {
  $.getJSON(POSTS_URL, function(data) {
    callbackFn(data)
  })
}

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

function getAndDisplayGratitudes() {
  getRecentGratitudes(displayGratitudes);
  //getRecentGratitudes(displayRows);
}


function addNewGratitude() {
  // handle click for the Add New button on home page
}





$(getAndDisplayGratitudes);

