import { bookList } from "./view.js";
import { library } from "./model.js";

let html = document.querySelector("#library");
let bookForm = document.querySelector("#bookForm");
let editId = null;



function render() {
    fetch("./template/book-card.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("File with template not found");
            }
            return response.text();
        })
        .then((template) => {
            bookList.renderWithTemplate(library.books, html, template);
            addRemoveFunc();
            addEditFunc();
        });
}

function addRemoveFunc() {
    document.querySelectorAll(".btn-danger").forEach((button) => {
        button.addEventListener("click", function () {
            const id = button.getAttribute("data-id");
            if (confirm("Видалити книгу?")) {
                remove(id);
            }
        });
    });
}

function addEditFunc() {
    document.querySelectorAll(".btn-warning").forEach((button) => {
        button.addEventListener("click", function () {
            const id = button.getAttribute("data-id");
            edit(id);
        });
    });
}

function remove(id) {
    library.remove(id);
    render();
}

function edit(id) {
    const book = library.find(id);
    editId = id;
    bookForm.formTitle.value = book.title;
    bookForm.formAuthor.value = book.author;
    bookForm.formYear.value = book.year;
    bookForm.formGenre.value = book.genre;
    render();
    bookForm.formTitle.focus();
}


bookForm.formTitle.addEventListener("input", function() {
    let userValue = bookForm.formTitle.value;
    if(library.findByTitle(userValue)){
        bookForm.formTitle.setCustomValidity("Книга з такою назвою існує");
    } else {
        bookForm.formTitle.setCustomValidity("");
    }
})

bookForm.formYear.addEventListener("input", function() {
    let userValue = bookForm.formYear.value;
    let minYear = 1450;
    let maxYear = new Date().getFullYear();
    if(userValue<minYear | userValue > maxYear) {
        bookForm.formYear.setCustomValidity("Рік повинен бути в проміжку між 1450 і поточним роком");
    } else {
        bookForm.formYear.setCustomValidity("");
    }

})

bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let book = {
        title: bookForm.formTitle.value,
        author: bookForm.formAuthor.value,
        year: bookForm.formYear.value,
        genre: bookForm.formGenre.value,
    };
    if (editId === null) {
        library.addBook(book);
    } else {
        library.update(editId, book);
        editId = null;
    }

    bookForm.reset();
    render();
});

render();
