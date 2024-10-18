import { library } from "./model.js";

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
        });
}



render();
