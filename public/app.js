const MOCK_STATUS_UPDATES = {
  statusUpdates: [
        {
            id: '1111111',
            image: 'https://media.gettyimages.com/photos/family-caring-for-their-chickens-picture-id894813736',
            created: 'April 12, 2017',
            text: 'Fed chickens today! So grateful for my fun family'
        },
        {
            id: '2222222',
            image: 'https://media.gettyimages.com/photos/young-couple-embraces-in-a-forest-picture-id928512404',
            created: 'May 1, 2017',
            text: 'Walked in the woods this afternoon. The sunset was beautiful.'
        },
        {
            id: '3333333',
            image: 'https://media.gettyimages.com/photos/beach-umbrellas-cabanas-blue-sky-picture-id921459204',
            created: 'May 15, 2017',
            text: 'Time at the beach!'
        },
        {
            id: '4444444',
            image: 'https://media.gettyimages.com/photos/hazy-dtla-sunset-picture-id927536670',
            created: 'August 11, 2017',
            text: 'Vacation started today. Going to the city to eat and drink.'
        },
        {
            id: '5555555',
            image: 'https://media.gettyimages.com/photos/alice-in-maggie-picture-id932459356',
            created: 'October 28, 2017',
            text: 'Baby girl!'
        },
        {
            id: '6666666',
            image: 'https://media.gettyimages.com/photos/baby-sloth-holding-onto-a-wooden-structure-picture-id931491418',
            created: 'November 13, 2017',
            text: 'Team-building at the zoo today.'
        },
        {
            id: '7777777',
            image: 'https://media.gettyimages.com/photos/toddler-on-the-trampoline-picture-id934227210',
            created: 'December 27, 2017',
            text: 'This trampoline is the best $200 spent. Ever.'
        },
        {
            id: '8888888',
            image: 'https://media.gettyimages.com/photos/aerial-shot-of-young-girl-standing-amongst-flock-of-chickens-picture-id923228468',
            created: 'February 3, 2018',
            text: 'Fun at the farm.'
        },
        {
            id: '9999999',
            image: 'https://media.gettyimages.com/photos/tower-cranes-working-at-dusk-picture-id916422234',
            created: 'March 23, 2018',
            text: 'View from my office. Crazy cool.'
        }
    ]
};

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getRecentStatusUpdates(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
  setTimeout(function(){ callbackFn(MOCK_STATUS_UPDATES)}, 1);
}

// this function stays the same when we connect
// to real API later
function displayStatusUpdates(data) {
  for (let index in data.statusUpdates) {
    console.log('data:', data);
    const gratDisplay = $(`
      <div class="grat-card">
        <img class="grat-image" src="${data.statusUpdates[index].image}" width=250px</>
        <p class="grat-timestamp">${data.statusUpdates[index].created}</p>
        <p class="grat-text">${data.statusUpdates[index].text}</p>
      </div>`);
  $('.gratitudes').append(gratDisplay);
  }
}


// function displayRows(data) {
//   const gratData = data.statusUpdates;
//   console.log('gratData:', gratData);
//   const items = gratData.map((result, index) => {
//   const openRow = $(`<div class="row">`);
//   const closeRow = $(`</div>`);
//     if ((index % 3) == 0) {
//       return $(displayStatusUpdates(result)).prepend(openRow);
//     } else if ((index % 3) == 2) {
//       return $(displayStatusUpdates(result)).append(closeRow);
//     } else {
//       return displayStatusUpdates(result);
//     }
//   });
//   $('.gratitudes').html(items);
// }



// this function can stay the same even when we
// are connecting to real API
function getAndDisplayStatusUpdates() {
  getRecentStatusUpdates(displayStatusUpdates);
  //getRecentStatusUpdates(displayRows);
}

//  on page load do this
$(function() {
  getAndDisplayStatusUpdates();
})
