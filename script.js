let myLibrary = JSON.parse(localStorage.getItem('libraryArray')) || [];
const library = document.querySelector('.library-holder');

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read );
    myLibrary.push(book)
}

function clearLibrary() {
    library.replaceChildren();
}

function libraryLoop () {

    for (let i = 0; i < myLibrary.length; i++) {

        // let bookOrder = i + 1;
        let bookTitle = myLibrary[i].title;
        let bookAuthor = myLibrary[i].author;
        let bookPages = myLibrary[i].pages;
        let bookRead = myLibrary[i].read;

        let bookCard = document.createElement('div');

        // let bookCardOrder = document.createElement('div');
        // bookCardOrder.classList.add('card', 'card-order');
        // bookCardOrder.textContent = `${bookOrder}`;
;
        let bookCardTitle = document.createElement('div');
        bookCardTitle.classList.add('card', 'card-title');
        bookCardTitle.textContent = `${bookTitle}`;

        let bookCardAuthor = document.createElement('div');
        bookCardAuthor.classList.add('card', 'card-author');
        bookCardAuthor.textContent = `${bookAuthor}`;

        let bookCardPages = document.createElement('div');
        bookCardPages.classList.add('card', 'card-pages');
        bookCardPages.textContent = `${bookPages}`;

        let bookCardRead = document.createElement('div');
        bookCardRead.classList.add('card', 'card-read');
        if(bookRead == true) {
            bookCardRead.textContent = `Read`;
            bookCardRead.classList.add('read');
        } else {
            bookCardRead.textContent = 'Not Read';
            bookCardRead.classList.add('not-read');
        }

        let bookCardRemove = document.createElement('button');
        bookCardRemove.classList.add('card-remove');
        bookCardRemove.textContent = `${'X'}`

        // bookCard.appendChild(bookCardOrder);
        bookCard.appendChild(bookCardTitle);
        bookCard.appendChild(bookCardAuthor);
        bookCard.appendChild(bookCardPages);
        bookCard.appendChild(bookCardRead);
        bookCard.appendChild(bookCardRemove);
        
        bookCard.classList.add('library-card');
        bookCard.dataset.indexNumber = `${i}`;

        library.appendChild(bookCard);
    }
    localStorage.setItem('libraryArray', JSON.stringify(myLibrary));
}

function addToLibrary (e) {
    e.preventDefault();

    let title = newBookTitleInput.value;
    let author = newBookAuthorInput.value;
    let pages = newBookPagesInput.value;
    let read;

    if (newBookReadInput.checked === true) {
        read = true;

    } else {
        read = false;
    }

    addBookToLibrary(title, author, pages, read);
    clearLibrary();
    libraryLoop(); 
}

const addToLibraryButton = document.getElementById('add-new-book');
const newBookTitleInput = document.querySelector('.new-title');
const newBookAuthorInput = document.querySelector('.new-author');
const newBookPagesInput = document.querySelector('.new-pages');
const newBookReadInput = document.querySelector('.new-read');
const libraryPane = document.querySelector('.library-pane');


addToLibraryButton.addEventListener('click', addToLibrary);
libraryPane.addEventListener('click', function(event) {
    if(event.target.className === 'card-remove') {
        
        let item = event.target.parentElement.dataset.indexNumber;
        myLibrary = myLibrary.filter(el => el !== myLibrary[item]);
        let li = event.target.parentElement;
        library.removeChild(li);

        clearLibrary();
        libraryLoop();
        
    }
})

libraryPane.addEventListener('click', function(event) {
    if(event.target.className === 'card card-read read') {
        event.target.classList.remove('card', 'card-read', 'read');
        event.target.classList.add('card', 'card-read', 'not-read');
        event.target.textContent = 'Not Read';
    } else if(event.target.className === 'card card-read not-read') {
        event.target.classList.remove('card', 'card-read', 'not-read');
        event.target.classList.add('card', 'card-read', 'read');
        event.target.textContent = 'Read';
    }
})

libraryLoop();