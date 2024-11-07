// fetch individual book details 
// display them on the page 
// allow users to click book in all books view to render details
// create a back button to go back to the all books view
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookDetails = () => {
  const [selectedBook, setSelectedBook] = useState(null);
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

  return (
    <>
       {selectedBook?.coverimage && (
          <img
            src={selectedBook.coverimage}
            alt={`Cover image for ${selectedBook.title}`}
            height="500"
            width="350"
          />
        )}
      <h2>{selectedBook.title}</h2>
      <h3>{selectedBook.author}</h3>
      <p>{selectedBook.description}</p>

      <button
        onClick={() => { navigate(`/bookcatalog/`); }}
      >Back To Book Catalog</button>
      <button>Checkout Book</button>
    </>
  );
};

export default BookDetails;