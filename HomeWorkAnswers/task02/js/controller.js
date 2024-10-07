import { bookList } from "./view.js";
import { library } from "./model.js";



let html = document.querySelector("#library");

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

render();
