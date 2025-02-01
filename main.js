function addBook(title, author, genre, pageNumber, dateRead) {
  var table = document.getElementById('book-table').getElementsByTagName('tbody')[0];

  var newRow = table.insertRow();

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);

  // Create ID for row
  var id_val = table.rows.length;
  newRow.id = id_val

  // Add remove button to last cell
  var removeLink = document.createElement("a");
  removeLink.onclick = function() {
    removeBook(newRow.id);
  };

  var removeIcon = document.createElement("i");
  removeIcon.classList.add("fa", "fa-trash-o","remove-icon");
  removeIcon.style.color = "#C5705D";
  removeLink.appendChild(removeIcon);

  cell1.innerHTML = title;
  cell2.innerHTML = author;
  cell3.innerHTML = genre;
  cell4.innerHTML = pageNumber;
  cell5.innerHTML = dateRead;
  cell6.appendChild(removeLink); 

  // Save the book to localStorage
  saveBooks();

  // After adding a book, update the summary
  updateSummary();

}

function removeBook(id) {
  var row = document.getElementById(id);
  if (row) {
    row.parentNode.removeChild(row);
    saveBooks();  // Re-save books to localStorage after removal
  }
}


// Function to save books to localStorage
function saveBooks() {
  var table = document.getElementById('book-table').getElementsByTagName('tbody')[0];
  var rows = table.rows;

  var books = [];

  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].cells;
    var book = {
      title: cells[0].innerText,
      author: cells[1].innerText,
      genre: cells[2].innerText,
      pageNumber: cells[3].innerText,
      dateRead: cells[4].innerText
    };

    books.push(book)
  }

  // Save the books array to localStorage
  localStorage.setItem("books", JSON.stringify(books));
}

// Function to load books from localStorage when the page is loaded

function loadBooks() {
  var books = JSON.parse(localStorage.getItem("books"));

  // add on these two variables to test out my addSummary function
  var bookCount = books.length;
  var pagesCount = 0;

  if (books) {
    books.forEach(function(book) {
      addBook(book.title, book.author, book.genre, book.pageNumber, book.dateRead);
      pagesCount += Number(book.pageNumber);
    });
  }
  
  // load summary
  addSummary(bookCount, pagesCount);
  
}

// Function to add Summary Row after loading books from localStorage
function addSummary(bookCount, pagesCount) {
  
  var table = document.getElementById("book-table");
  var tfoot = table.getElementsByTagName('tfoot')[0];

  // If there is already a summary row, don't create another one
  if (tfoot.rows.length === 0) {
    var newRow = tfoot.insertRow(tfoot.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
  
    // Set concent of each cell
    cell1.colSpan = 5; // Make summary span across all columns
    cell1.style.textAlign = "center"; // Center-align the content

    // Set the summary text
    cell1.innerHTML = `No. of Books Read: ${bookCount} | No. of Pages Read: ${pagesCount}`;
  }
}

// Function to update the summary row (book count and total pages)
function updateSummary() {
  var books = JSON.parse(localStorage.getItem("books"));

  var bookCount = books.length;
  var pagesCount = 0;

  books.forEach(function(book) {
    pagesCount += Number(book.pageNumber);
  });

  // Update the existing summary row
  var tfoot = document.getElementById("book-table").getElementsByTagName("tfoot")[0];
  var summaryRow = tfoot.rows[0];  // The existing summary row

  if (summaryRow) {
    // Update the content of the existing summary row
    summaryRow.cells[0].innerHTML = `No. of Books Read: ${bookCount} | No. of Pages Read: ${pagesCount}`;
  }
}

function showForm() {
  document.getElementById("bookForm").style.display = "flex";
}

function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the values from the form
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var genre = document.getElementById("genre").value;
  var pageNumber = document.getElementById("pageNumber").value;
  var dateRead = document.getElementById("dateRead").value;

  // Call addRow to insert the new book into the table
  addBook(title, author, genre, pageNumber, dateRead);

  // Clear the form fields
  document.getElementById("addBookForm").reset();

  // Close the form modal
  closeForm();
}

function closeForm() {
  document.getElementById("bookForm").style.display = "none";
}

