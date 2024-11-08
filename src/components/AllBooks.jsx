// fetch book data 
// map through book data 
// display books on page with image and title

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllBooks = ({ checkedOutBooks }) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  
  useEffect (() => {
    const getBooks = async () => {
      try {
        const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
        const bookData = await response.json();
        setBooks(bookData.books)

        // console.log(bookData);

      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    getBooks();
  }, []);

  const availableBooks = books.filter(
    (book) => !checkedOutBooks.find((checkedOutBook) => checkedOutBook.id === book.id)
  );

  return (
    <>
      <h1>Book Catalog</h1>

      <section id="all-books">
        {availableBooks.map((book) => (
          <section 
            onClick={() => { navigate(`/bookcatalog/${book.id}`); }}
            key={book.id}
          >
            <h3>{book.title}</h3>
              <img 
              src={book.coverimage} 
              alt={`The cover photo of ${book.name}`}
              height="350"
              width="250"
              />
          </section>
        ))}
      </section>
    </>
  );
};

export default AllBooks;