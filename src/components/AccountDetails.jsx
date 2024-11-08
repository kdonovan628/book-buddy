import { useState, useEffect } from "react";
import LogInForm from "./LogInForm";
import NewUserRegistration from "./NewUserRegistration";

const AccountDetails = ({ token, setToken, checkedOutBooks, setCheckedOutBooks }) => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(() => {
    const storedDetails = localStorage.getItem('userDetails');
    return storedDetails ? JSON.parse(storedDetails) : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  const handleLoginSuccess = (user) => {
    setUserDetails(user);
    localStorage.setItem('userDetails', JSON.stringify(user));
  };

  const handleReturnBook = (bookId) => {
    setCheckedOutBooks(checkedOutBooks.filter((book) => book.id !== bookId));
  };

  return (
    <>
      {userDetails ? (
         <section>
         <h2>Welcome back, {userDetails.firstname} {userDetails.lastname}!</h2>
         <p id="p1">Email: {userDetails.email}</p>
         <h2>Currently Checked Out Books</h2>
         <ul>
           {checkedOutBooks.map((book) => (
             <li 
             id="checked-out"
             key={book.id}
             >
               <img
                 src={book.coverimage}
                 alt={`Cover image for ${book.title}`}
                 height="120"
                 width="90"
               />
               <h3>{book.title}</h3>
               <button 
               id="return-book-button"
               onClick={() => handleReturnBook(book.id)}
               >Return Book</button>
             </li>
           ))}
         </ul>
       </section>
      ) : (
        <>
          {showWelcomeMessage ? (
            <p>Welcome {username}! You can now log in below.</p>
          ) : (
            <NewUserRegistration 
              setToken={setToken} 
              onRegistrationSuccess={(username) => {
                setShowWelcomeMessage(true);
                setUsername(username);
              }} 
            />
          )}

          {token ? null : <LogInForm setToken={setToken} onLoginSuccess={handleLoginSuccess} />}
        </>
      )}
    </>
  );
};

export default AccountDetails;