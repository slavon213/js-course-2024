import { booklist } from "./view.js";
import {library} from "./model.js";



let html = document.querySelector("#library");

function render() {
    let template = fetch("./templates/book.html")
    .then(response => {
        if(!response.ok) {
            console.log("error get template file");
            return;
        }
        return response.text();
    })
    .then(template => {
        if(template) {

            // console.log(template);
            booklist.renderWithTemplate(library.books, html, template);
        }
    })
    
}

render();
