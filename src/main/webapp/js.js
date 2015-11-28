
var rootURL = "http://localhost:8080/Rest_v2/api/";


$(document).ready( function(){
   findAllBooks(); 
   findAllAuthors();
});

function findAllAuthors(){
    $.ajax({
        type: 'GET',
        url: rootURL+"v1/authors",
        dateType: 'json',
        success: getAuthorList
    });
}


function findAllBooks() {

    $.ajax({
        type: 'GET',
        url: rootURL+"v1/books",
        dataType: 'json',
        success: getBookList
    });

}

function getBookList(books){
    
    $.each(books, function(){
        var row = "<tr> <td> "+ this.bookID + "</td>" +
                        "<td>" + this.title + "</td>" + 
                        "<td>"+ this.datePublished + "</td>" +
                        "<td>" + this.authorID + "</td>"+
                        "</tr>";
                $("#bookTable").append(row);
    });
}    
function getAuthorList(authors){
    
    $.each(authors, function(){
       var row =  "<tr> <td>"+ this.authorID + "</td>" +
                        "<td>" + this.authorFirstName + "</td>" + 
                        "<td>"+ this.authorLastName + "</td>" +
                        "</tr>";
                $("#authorTable").append(row);
    });
    
}    

$('#authorFormBtn').on('click', function(){
   updateAuthor(); 
});

var $authorTable = $('#authorTable');

$($authorTable).on('click', 'tr', function () {
    var formObjects = [$('#authorID'), $('#authorFirstName'), $('#authorLastName')];
    for (var i = 0; i < formObjects.length; i++) {
        formObjects[i].val(this.cells[i].textContent);
    }
});

function deleteAuthorTableRows(){
    $('#authorTable tr').remove();
} 
    
function updateAuthor(){
    var $authorID = $('#authorID').val();
      $.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: rootURL + "v1/authors/" + $authorID,
        mimeType: "text/html",
        data: authorFormToJSON(),
        success: function(authors){
            deleteAuthorTableRows(),
            findAllAuthors(authors);
        }
        
    });
}


function authorFormToJSON(){
    return JSON.stringify({
        authorID: $('#authorID').val(),
        authorFirstName: $('#authorFirstName').val(),
        authorLastName: $('#authorLastName').val()
    });
}









