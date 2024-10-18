import { library } from "./model.js";

let editId = "";
let bookForm = document.getElementById("bookForm");




function editButtonClick(event) {
    const cardBody = event.target.closest(".card-body");
    const id = cardBody.getAttribute("data-id");
    edit(id);
    bookForm.title.focus();
}


function edit(id) {
    let editBook = library.findBook(id);
    editId = editBook.id;
    bookForm.title.value = editBook.title;
    bookForm.author.value = editBook.author;
    bookForm.year.value = editBook.year;
    bookForm.genre.value = editBook.genre;
}



bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let book = {
        title: bookForm.title.value,
        author: bookForm.author.value,
        year: bookForm.year.value,
        genre: bookForm.genre.value,
    };

    if (!editId) {
        library.add(book);
    } else {
        book.id = editId;
        library.update(book);
    }
    render();
});

function render() {
    fetch("./templates/card.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("File with template not found");
            }
            return response.text();
        })
        .then((template) => {
            let html = "";
            library.books.forEach((book) => {
                html += Mustache.render(template, book);
            });
            let bookList = document.getElementById("bookList");
            bookList.innerHTML = html;
            let editId = "";
            bookForm.reset();
            document.querySelectorAll(".edit-button").forEach(button => {
                button.addEventListener("click", editButtonClick);
                console.log("add click")
            })
        });
}

render();
