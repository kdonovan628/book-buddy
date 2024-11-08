import { Routes, Route } from "react-router-dom";
import { useState } from 'react';

import AllBooks from "./components/AllBooks";
import BookDetails from "./components/BookDetails";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import AccountDetails from "./components/AccountDetails";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails'); // Clear user details on logout
    setToken('');
  };

  return (
    <>
      <NavBar logOutButton={token ? <button onClick={logOut}>Log Out</button> : null} />

      <Routes>
        <Route path="/" element={<Homepage setToken={setToken} token={token}/>} />
        <Route path="/bookcatalog" element={<AllBooks checkedOutBooks={checkedOutBooks} />} />
        <Route path="/bookcatalog/:id" element={<BookDetails setCheckedOutBooks={setCheckedOutBooks} />} />
        <Route path="/accountdetails" element={<AccountDetails checkedOutBooks={checkedOutBooks} token={token} setToken={setToken} />} />
        </Routes>
    </>
  );
};

export default App
