'use strict'

function submitLogin() {
  $('.login-button').on('click', function(event) {
    event.preventDefault();
    let username = $(this).find('input[type="username"]').val();
    let password = $(this).find('input[type="password"]').val();
    $.ajax({
     type: 'POST',
      url: '/api/auth/login',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({username, password}),
      success: function(res) {
        localStorage['token'] = res.authToken
        goHome();
        //window.location.href = '/home'
      }
    })
  console.log('submitLogin ran');
  console.log('localStorage token:', localStorage['token']);
  })
}

var goHome = function() {
  const token = localStorage['token'];
  $.ajax({
    url: '/home',
    method: 'get',
    dataType: 'text',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    success: function() {
    window.location.href='/home';
    },
    error: function(err) {
    console.log('error', err);
    }
  });
  console.log('goHome ran');
}

$(submitLogin);
//$(goHome);
