import { library } from "./model.js";

let editId = "";
let bookForm = document.getElementById("bookForm");

bookForm.title.addEventListener("input", function (e) {
    e.preventDefault();
    let title = bookForm.title;
    let book = library.findBookByTitle(title.value);
    if (book) {
        title.setCustomValidity("Книжка з такою газвою існує");
    } else {
        title.setCustomValidity("");
    }
});

bookForm.year.addEventListener("input", function(e) {
    e.preventDefault();
    let currentYear = new Date().getFullYear();
    let minYear = 1400;
    let year = bookForm.year;
    if (year.value < minYear || year.value > currentYear) {
        year.setCustomValidity(`Рік повинен бути в проміжку між ${minYear} та ${currentYear}`)
    } else {
        year.setCustomValidity("");
    }
})

function editButtonClick(event) {
    const cardBody = event.target.closest(".card-body");
    const id = cardBody.getAttribute("data-id");
    edit(id);
    bookForm.title.focus();
}

function deleteButtonClick(event) {
    const cardBody = event.target.closest(".card-body");
    const id = cardBody.getAttribute("data-id");
    remove(id);
}

function edit(id) {
    let editBook = library.findBook(id);
    editId = editBook.id;
    bookForm.title.value = editBook.title;
    bookForm.author.value = editBook.author;
    bookForm.year.value = editBook.year;
    bookForm.genre.value = editBook.genre;
}

function remove(id) {
    library.remove(id);
    render();
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

function addEditHandlerButton() {
    document.querySelectorAll(".edit-button").forEach((button) => {
        button.addEventListener("click", editButtonClick);
    });
}

function addDeleteHandlerButton() {
    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", deleteButtonClick);
    });
}

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

            addEditHandlerButton();
            addDeleteHandlerButton();
        });
}

render();
