class BookManager {
    constructor() {
      this.books = [];
      this.autoIncrementId = 1;
    }
  
    addBook(title, description, price, thumbnail, code, stock) {
      // Validar campos obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios.");
        return;
      }
  
      // Validar código único
      if (this.books.some(book => book.code === code)) {
        console.log("El código ya existe. No se puede agregar el libro.");
        return;
      }
  
      // Agregar libro con id autoincrementable
      const newBook = {
        id: this.autoIncrementId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.books.push(newBook);
      console.log("Libro agregado correctamente.");
    }
  
    getBooks() {
      return this.books;
    }
  
    getBookById(id) {
      const book = this.books.find(book => book.id === id);
  
      if (book) {
        return book;
      } else {
        console.log("Libro no encontrado.");
      }
    }
  }
  
  // Ejemplo de uso
  const bookManager = new BookManager();
  
  bookManager.addBook("Cien años de soledad", "Novela que narra la historia de la familia Buendía", 20.99, "cien_anios.jpg", "ISBN123", 50);
  bookManager.addBook("El Principito", "Historia de un pequeño príncipe que viaja por el universo", 15.99, "el_principito.jpg", "ISBN456", 30);
  
  const allBooks = bookManager.getBooks();
  console.log("Todos los libros:", allBooks);
  
  const bookById = bookManager.getBookById(1);
  console.log("Libro con ID 1:", bookById);
  
  const nonExistingBook = bookManager.getBookById(3); // ID no existente
  