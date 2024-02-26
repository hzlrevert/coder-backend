const fs = require('fs');

class BookManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addBook(book) {
    const books = this.getBooks();

    // Asignar un id autoincrementable único
    book.id = this.generateId(books);

    // Agregar el nuevo libro al array
    books.push(book);

    // Guardar el array actualizado en el archivo
    this.saveBooksToFile(books);
      // Ejemplo en el método addBook
       

    console.log("Libro agregado correctamente.");
  }

  getBooks() {
    try {
      // Leer el archivo y convertir su contenido a un array de libros
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      // En caso de error (puede ser que el archivo no exista), devolver un array vacío
      return [];
    }
  }

  getBookById(id) {
    const books = this.getBooks();

    // Buscar el libro con el id especificado
    const book = books.find((item) => item.id === id);

    if (book) {
      return book;
    } else {
      throw new Error("Libro no encontrado.");
    }
  }

  updateBook(id, updatedFields) {
    const books = this.getBooks();

    // Buscar el índice del libro con el id especificado
    const index = books.findIndex((item) => item.id === id);

    if (index !== -1) {
      // Actualizar el libro con los campos proporcionados
      books[index] = { ...books[index], ...updatedFields };

      // Guardar el array actualizado en el archivo
      this.saveBooksToFile(books);

      console.log("Libro actualizado correctamente.");
    } else {
      throw new Error("Libro no encontrado.");
    }
  }

  deleteBook(id) {
    let books = this.getBooks();

    // Filtrar el array para excluir el libro con el id especificado
    const filteredBooks = books.filter((item) => item.id !== id);

    if (filteredBooks.length < books.length) {
      // Guardar el array actualizado en el archivo solo si se eliminó algún libro
      this.saveBooksToFile(filteredBooks);

      console.log("Libro eliminado correctamente.");
    } else {
      throw new Error("Libro no encontrado.");
    }
  }

  saveBooksToFile(books) {
    //MostRar los libros entes de guardarlos
    console.log("Libros antes de guardar:", books);
    // Guardar el array de libros en el archivo
    fs.writeFileSync(this.path, JSON.stringify(books, null, 2), 'utf-8');
    

  }

  generateId(books) {
    const maxId = books.reduce((max, book) => (book.id > max ? book.id : max), 0);
    return maxId + 1;
  }
}

// Pruebas específicas para la gestión de libros
const bookManager = new BookManager('libros.json');

// Prueba 1
console.log("Prueba 1 - getBooks al crear la instancia:", bookManager.getBooks());

// Prueba 2
bookManager.addBook({
  title: 'Libro Prueba',
  description: 'Este es un libro de prueba',
  price: 19.99,
  thumbnail: 'sin_imagen.jpg',
  code: 'PRB001',
  stock: 30
});

console.log("Prueba 2 - getBooks después de agregar un libro:", bookManager.getBooks());

// Prueba 3
const bookId = 1; // Id generado automáticamente en la prueba 2
console.log("Prueba 3 - getBookById:", bookManager.getBookById(bookId));

// Prueba 4
bookManager.updateBook(bookId, { price: 24.99 });
console.log("Prueba 4 - getBooks después de actualizar el libro:", bookManager.getBooks());

// Prueba 5
bookManager.deleteBook(bookId);
console.log("Prueba 5 - getBooks después de eliminar el libro:", bookManager.getBooks());

// Manejo de errores
try {
  console.log("Prueba 6 - getBookById con id inexistente:", bookManager.getBookById(999));
} catch (error) {
  console.error("Error en Prueba 6:", error.message);
}

try {
  console.log("Prueba 7 - updateBook con id inexistente:");
  bookManager.updateBook(999, { price: 30 });
} catch (error) {
  console.error("Error en Prueba 7:", error.message);
}

try {
  console.log("Prueba 8 - deleteBook con id inexistente:");
  bookManager.deleteBook(999);
} catch (error) {
  console.error("Error en Prueba 8:", error.message);
}
