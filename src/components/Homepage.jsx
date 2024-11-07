import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Donovan County Library</h1>

      <img
        src="/library.jpg"
        alt="Library image"
        height="500"
        width="800"
      />
      <button
        id="view-books-button"
        onClick={() => { navigate(`/bookcatalog/`); }}
      >View Available Books</button>
    </>
  );
};

export default Homepage;