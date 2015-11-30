
var rootURL = "http://localhost:8080/Rest_v2/api/";


$(document).ready(function () {
    $("#bookForm").trigger('reset');
    $("#authorForm").trigger('reset');
    findAllBooks();
    findAllAuthors();
});

function deleteBookTableRows(){
    $('#bookTable tr').remove();
}

function findAllBooks() {

    $.ajax({
        type: 'GET',
        url: rootURL + "v1/books",
        dataType: 'json',
        success: getBookList
    });

}

function getBookList(books) {
    $.each(books, function () {
        var row = "<tr> <td> " + this.bookID + "</td>" +
                "<td>" + this.title + "</td>" +
                "<td>" + this.datePublished + "</td>" +
                "<td>" + this.authorID.authorID + "</td>" +
                "</tr>";
        $("#bookTable").append(row);
    });
}

function saveBook() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'v1/books',
        dataType: "json",
        data: authorFormToJSON(),
        success: function () {
            deleteBookTableRows(),
            findAllBooks();
        }
    });
}

var $bookID;
function updateBook(){
    $bookID = $('#bookID').val();
    $authorID = $('#bookAuthorID').val();
    $.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: rootURL + "v1/books/" + $bookID + "/"+$authorID,
        mimeType: 'text/html',
        data: bookFormToJSON(),
        success: function() {
            deleteBookTableRows(),
            findAllBooks();
        }
                
    });
}


function deleteBook(id) {
    $.ajax({
        type: 'DELETE',
        contentType: 'application/json',
        url: rootURL + "v1/books/" + id,
        data: bookFormToJSON(),
        success: function () {
            deleteBookTableRows(),
            findAllBooks();
        }
    });
}

function bookFormToJSON(){
    return JSON.stringify({
        bookID: $('#bookID').val(),
        title: $('#title').val(),
        datePublished: $('#datePublished').val(),
        bookAuthorID: $('bookAuthorID').val()
        
    });
}


// Author 

function deleteAuthorTableRows() {
    $('#authorTable tr').remove();
}

function findAllAuthors() {
    $.ajax({
        type: 'GET',
        url: rootURL + "v1/authors",
        dateType: 'json',
        success: getAuthorList
    });
}

function saveAuthor() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + 'v1/authors',
        dataType: "json",
        data: authorFormToJSON(),
        success: function () {
            deleteAuthorTableRows(),
            findAllAuthors();
        }
    });
}

function updateAuthor() {
    var $authorID = $('#authorID').val();
    $.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: rootURL + "v1/authors/" + $authorID,
        mimeType: "text/html",
        data: authorFormToJSON(),
        success: function () {
            deleteAuthorTableRows(),
            findAllAuthors();
        }

    });
}

function deleteAuthor(id) {
    $.ajax({
        type: 'DELETE',
        contentType: 'application/json',
        url: rootURL + "v1/authors/" + id,
        success: function () {
            deleteAuthorTableRows(),
            findAllAuthors();
        }
    });
}

function getAuthorList(authors) {

    $.each(authors, function () {
        var row = "<tr> <td>" + this.authorID + "</td>" +
                "<td>" + this.authorFirstName + "</td>" +
                "<td>" + this.authorLastName + "</td>" +
                "</tr>";
        $("#authorTable").append(row);
    });

}

function authorFormToJSON() {
    return JSON.stringify({
        authorID: $('#authorID').val(),
        authorFirstName: $('#authorFirstName').val(),
        authorLastName: $('#authorLastName').val()
    });
}

var $authorID;
$('#authorDeleteButton').on('click', function () {
    var $authorID = $('#authorID').val();
    deleteAuthor($authorID);
});

$('#bookDeleteBtn').on('click', function(){
    var $bookID = $('#bookID').val();
    deleteBook($bookID);

});


var digitRegEx = new RegExp('^\\d+$');
$('#authorFormBtn').on('click', function () {
    $authorID = $('#authorID').val();
    if ($authorID.match(digitRegEx)) {
        updateAuthor();
    } else {
        saveAuthor();
    }
});

var formObjects = [];
var $authorTable = $('#authorTable');
$($authorTable).on('click', 'tr', function () {
    formObjects = [$('#authorID'), $('#authorFirstName'), $('#authorLastName')];
    for (var i = 0; i < formObjects.length; i++) {
        formObjects[i].val(this.cells[i].textContent);
    }
});

var $bookTable = $('#bookTable');
$($bookTable).on('click', 'tr', function(){
    formObjects = [$('#bookID'), $('#title'), $('#datePublished'), $('#bookAuthorID')];
    for (var i = 0; i < formObjects.length; i++){
        formObjects[i].val(this.cells[i].textContent);
    }
});

$('#bookFormBtn').on('click', function(){
    $bookID = $('#bookID').val();
    if($bookID.match(digitRegEx)) {
        updateBook();
    } else {
        saveBook();
    }
});





