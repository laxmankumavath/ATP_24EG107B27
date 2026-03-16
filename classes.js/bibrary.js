// Library Book Management System

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isAvailable = true;
  }

  borrow() {
    if (this.isAvailable) {
      this.isAvailable = false;
      return `${this.title} has been borrowed.`;
    }
    return `${this.title} is not available.`;
  }

  returnBook() {
    this.isAvailable = true;
    return `${this.title} has been returned.`;
  }

  getInfo() {
    return `${this.title} by ${this.author} (${this.pages} pages)`;
  }

  isLongBook() {
    return this.pages > 300;
  }
}


// Create 5 book objects

const book1 = new Book("Harry Potter", "J.K. Rowling", 350);
const book2 = new Book("1984", "George Orwell", 328);
const book3 = new Book("The Hobbit", "J.R.R. Tolkien", 310);
const book4 = new Book("The Alchemist", "Paulo Coelho", 208);
const book5 = new Book("Atomic Habits", "James Clear", 320);

const library = [book1, book2, book3, book4, book5];


// Operations

// i. Display info of all books

library.forEach(book => console.log(book.getInfo()));


// ii. Borrow 2 books

console.log(book1.borrow());
console.log(book3.borrow());

console.log(book1.title, "Available:", book1.isAvailable);
console.log(book3.title, "Available:", book3.isAvailable);


// iii. Return 1 book

console.log(book1.returnBook());
console.log(book1.title, "Available:", book1.isAvailable);


// iv. Count long books (>300 pages)
const longBooksCount = library.filter(book => book.isLongBook()).length;
console.log("\nNumber of Long Books:", longBooksCount);


// v. List all available books
const availableBooks = library
  .filter(book => book.isAvailable)
  .map(book => book.title);

console.log("\nAvailable Books:", availableBooks);