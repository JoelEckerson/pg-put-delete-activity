$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);
  $( '#bookShelf' ).on( 'click', '.deleteButton', deleteBook );

  // TODO - Add code for edit & delete buttons
}

function handleSubmit() {
  console.log('Submit button clicked.');
  let book = {};
  book.author = $('#author').val();
  book.title = $('#title').val();
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookToAdd,
    }).then(function(response) {
      console.log('Response from server.', response);
      refreshBooks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add book at this time. Please try again later.');
    });
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function(response) {
    console.log(response);
    renderBooks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}


// Displays an array of books to the DOM
function renderBooks(books) {
  $('#bookShelf').empty();
  for(let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
    $('#bookShelf').append(`
      <tr data-id=${book.id}>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
          <button class="deleteButton">Delete</button>
        </td>
      </tr>
    `);
  }
}

function deleteBook(){
  //test w/console log
  console.log( 'in deleteBook..deleting book with id:', $( this ).closest('tr').data( 'id' ) );
  //make new variable to send as object
  let bookId = $( this ).closest('tr').data( 'id' );
  //call ajax
  $.ajax({
    method: 'DELETE',
    url: `/books/${bookId}` //adding id to url
  }).then( function ( response ){
    console.log('Response from server.', response);
    refreshBooks();
  }).catch( function ( error ){
    console.log( 'Error in DELETE', error )
    alert( 'Unable to DELETE book at this time. Please try again later.' );
  });
}//end deleteBook





