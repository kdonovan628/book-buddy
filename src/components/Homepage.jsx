import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  // const [inputEmail, setInputEmail] = useState(``);
  // const [inputPassword, setInputPassword] = useState(``);

  // const logInUser = async(event) => {
  //   event.preventDefault();
  //   console.log(`Input Email`, inputEmail);
  //   console.log(`Input Password`, inputPassword);

  //   const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login`, {
  //     method: `POST`;
  //     headers: {}
  //   })

  // }

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
        onClick={() => { navigate(`/bookcatalog/`); }}
      >View Available Books</button>
    </>
  );
};

export default Homepage;