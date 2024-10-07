

export const booklist = {
    renderWithTemplate(books, element, template) {
        let html = "";
        books.forEach((book) => {
            console.log(book);
            html += Mustache.render(template, book);
        });
        element.innerHTML = html;
    },
};
