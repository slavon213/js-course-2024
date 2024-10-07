import { bookList } from "./view.js";
import { library } from "./model.js";



let html = document.querySelector("#library");
let bookForm = document.querySelector("#bookForm");
let editId = null;

function render () {
    fetch("./template/book-card.html")
    .then(response => {
        if(!response.ok) {
            throw new Error("File with template not found");
        }
        return response.text()
    })
    .then(template => {
        bookList.renderWithTemplate(library.books, html, template)

    })
}

bookForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let book = {
        title: bookForm.formTitle.value,
        author: bookForm.formAuthor.value,
        year: bookForm.formYear.value,
        genre: bookForm.formGenre.value,
    };
    library.addBook(book);
    bookForm.reset()
    render();
})




render();
