'use strict'

function getRecentGratitudes(callbackFn) {
  // getJSON call to get posts
  $.getJSON('/posts', function(data) {
    callbackFn(data)
  })
}

function displayGratitudes(data) {
  // HTML for creating new gratitude post
  console.log('data:', data);
  for (let index in data) {
    const gratDisplay = $(`
      <div class="grat-card">
        <div class="img-container">
          <img class="grat-image" src="${data[index].image}"></>
        </div>
        <a class="grat-id hidden" id="grat-id">${data[index].id}</a>
        <p class="grat-date">${data[index].created}</p>
        <p class="grat-text" id="grat-text">${data[index].text}</p>
        <button class="open-button" type="submit">Open</button>
      </div>`);
  $('.gratitudes').append(gratDisplay);
  }
}

function getAndDisplayGratitudes() {
  getRecentGratitudes(displayGratitudes);
}

function displayAddNew() {
  // HTML for new gratitude post/form
  const newGratForm = $(`
    <div class="new-gratitude">
          <h3>Create a New Gratitude</h3>
          <form id="form" action="/posts" method="post" enctype="multipart/form-data">
            <label for="new-gratitude-image">Upload your image*</label>
            <br>
            <input id="img" class="upload-image" name="postImg" type="file" onchange="readURL(this);" aria-required="true"/>
            <br>
            <br>
            <div class="img-container">
              <img id="thumbnail" src="http://placehold.it/250" alt="your uploaded image"/>
            </div>
            <br>
            <label for="new-gratitude-text">What are you grateful for today?*</label><br>
            <textarea maxlength="140" rows="4" cols="50" class="grat-text" name="text" aria-required="true"/></textarea><br>
            <p class="required">[* Required]</p>
            <button class="submit-button" type="submit">Save</button>
            <button class="cancel-button" type="reset">Cancel</button>
          </form>
    </div>`);
  $('.new-container').html(newGratForm);
}

function readURL(input) {
  // display thumbnail of image after selecting, prior to loading
  if(input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      $('#thumbnail').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function noFileError() {
  // display error message if required fields are blank
  $('#form').submit(function() {
    if($.trim($('.upload-image').val()) === '') {
      swal('Please attach your image file.')
      return false;
    }
  })
}

function handleFile() {
  $('#form').submit(function() {
    const fileInput = document.getElementById('img');
    const filePath = fileInput.value;
    const allowedExt = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if(!allowedExt.exec(filePath)){
      swal('Please upload a .jpeg/.jpg/.png/.gif file.');
      fileInput.value = '';
      return false;
    }
  })
}

function addNewGratitude() {
  // handle click for the Add New button on home page
  $('.add-new').on('click', function(event) {
    event.preventDefault();
    $('.new-container').removeClass('hidden');
    $('.add-new').addClass('hidden');
  });
}

function singlePost(data) {
  // HTML for displaying a single gratitude post
  console.log('single post data:', data);
    const singlePost = $(`
      <div id="single-grat">
        <div class="img-container">
          <img class="grat-image" src="${data.image}"></>
        </div>
        <a class="grat-id hidden" id="grat-id">${data._id}</a>
        <p class="grat-date">${data.created}</p>
        <p class="grat-text">${data.text}</p>
        <button class="edit-button" type="submit">Edit</button>
        <button class="delete-button" type="submit">Delete</button>
        <button class="cancel-button" type="reset">Cancel</button>
      </div>`);
    $('.single-post').html(singlePost);
    $('.gratitudes').addClass('hidden');
    const editGratForm = $(`
    <div id="editor">
      <div class="img-container">
        <img class="grat-image" src="${data.image}"></>
      </div>
      <a class="grat-id hidden" id="grat-id">${data._id}</a>
      <p class="grat-date">${data.created}</p>
      <textarea rows="4" cols="50" name="text" class="grat-text" aria-required="true"></textarea>
      <br>
      <button class="update-button" type="submit">Update</button>
      <button class="update-cancel-button" type="reset">Cancel</button>
    </div>`);
    $('.editor').html(editGratForm);
}

function handleSingle() {
  // handle click for opening a single gratitude post
  $('.gratitudes').on('click', '.open-button', function(event) {
    event.preventDefault()
    const gratId = $(this).closest('.grat-card').find('.grat-id').text();
    console.log('gratId:', gratId);
    const textArea = $(this).closest('.grat-card').find('.grat-text').text();
    sessionStorage['gratText'] = textArea;
    $('.add-new').addClass('hidden');
    getSinglePost(gratId);
  });
}

function getSinglePost(id) {
  // get response for a single gratitude post
  const url = '/posts/'+id;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function(data) {
      singlePost(data);
    }
  });
}

function handleDelete() {
  // handle click for deleting whole posts
  $('.single-post').on('click', '.delete-button', function(event) {
    event.preventDefault()
    console.log('Delete button clicked')
    const delGratId = $(this).closest('#single-grat').find('.grat-id').text();
    console.log('delete delGratId:', delGratId);
    deletePost(delGratId);
  })
}

function deletePost(id) {
  // function to delete whole posts by id
  const url = '/posts/'+id;
  $.ajax({
    type: 'DELETE',
    url: url,
    dataType: 'json',
    success: function() {
      location.reload();
    }
  });
}

function handleEdit() {
  // handle click for editing whole posts
   $('.single-post').on('click', '.edit-button', function(event) {
    event.preventDefault();
    const editGratId = $(this).closest('#single-grat').find('.grat-id').text();
    console.log('editGratId:', editGratId);
    const currentText = sessionStorage['gratText'];
    $('.grat-text').val(currentText);
    $('.editor').removeClass('hidden');
    $('.single-post').addClass('hidden');
  });
}

function updatePost() {
  $('.editor').on('click', '.update-button', function(event) {
    event.preventDefault();
    const updateId = $(this).closest('.editor').find('.grat-id').text();
    const updateText = $(this).closest('.editor').find('textarea').val();
    editPost(updateId, updateText);
  } )
}

function editPost(id, text) {
  // function to edit whole posts by id
  const url = '/posts/'+id;
  $.ajax({
    method: 'PATCH',
    url: url,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      id,
      text: text
    }),
    success: function() {
      location.reload();
    }
  })
}

function handleCancel() {
  // handle click for deleting whole posts
  $('.single-post').on('click', '.cancel-button', function(event) {
    event.preventDefault()
    location.reload();
  })
}

function handleAddCancel() {
  // handle click for canceling new post
  $('.new-gratitude').on('click', '.cancel-button', function(event) {
    event.preventDefault()
    location.reload();
  })
}




function newGratError() {
  // display error message if required fields are blank
  $('#form').submit(function() {
    if($.trim($('.grat-text').val()) === '') {
      swal('Please enter your gratitude text.')
      return false;
    }
  })
}

function handleEditCancel() {
  // handle click for editing posts
  $('.editor').on('click', '.update-cancel-button', function(event) {
    event.preventDefault()
    $('.editor').addClass('hidden');
    $('.single-post').removeClass('hidden');
  })
}

function handleClient() {
  addNewGratitude();
  displayAddNew();
  getAndDisplayGratitudes();
  handleSingle();
  handleDelete();
  handleEdit();
  updatePost();
  handleCancel();
  handleEditCancel();
  handleAddCancel();
  newGratError();
  noFileError();
  handleFile();
  readURL();
}

$(handleClient);

