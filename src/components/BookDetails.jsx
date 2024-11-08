// fetch individual book details 
// display them on the page 
// allow users to click book in all books view to render details
// create a back button to go back to the all books view

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookDetails = ({ setCheckedOutBooks }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleBook = async () => {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        const data = await response.json();
        setSelectedBook(data.book || {}); 

      } catch (error) {
        console.error("Error fetching single book:", error);
      }
    };

    getSingleBook();
  }, [id]);

  if (!selectedBook) {
    return <p>Loading...</p>;
  }

  const handleCheckout = () => {
    setCheckedOutBooks((prevBooks) => [...prevBooks, selectedBook]);
    setIsCheckedOut(true);
  };

  return (
    <>
       {selectedBook?.coverimage && (
          <img
            id="book-photo"
            src={selectedBook.coverimage}
            alt={`Cover image for ${selectedBook.title}`}
            height="500"
            width="350"
          />
          )}
          <h2 id="book-title">{selectedBook.title}</h2>
          <h3 id="book-author">{selectedBook.author}</h3>
          <p id="book-description">{selectedBook.description}</p>

        <button
          id="back-button"
          onClick={() => { navigate(`/bookcatalog/`); }}
        >Back To Book Catalog</button>

        {!isCheckedOut ? (
          <button 
          id="checkout-button"
          onClick={handleCheckout}>Checkout Book</button>
        ) : (
          <p>Checked Out!</p>
      )}
    </>
  );
};

export default BookDetails;