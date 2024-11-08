import { useState, useEffect } from "react";
import LogInForm from "./LogInForm";
import NewUserRegistration from "./NewUserRegistration";

const AccountDetails = ({ token, setToken, checkedOutBooks }) => {
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

  return (
    <>
      {userDetails ? (
        <section>
          <h2>Welcome back, {userDetails.firstname} {userDetails.lastname}!</h2>
          <p id="p1">Email: {userDetails.email}</p>
          <h2>Currently Checked Out Books</h2>
          <ul>
            {checkedOutBooks.map((book) => (
              <li key={book.id} style={{ textAlign: 'center' }}> {/* Center the content inside each list item */}
                <img
                  src={book.coverimage}
                  alt={`Cover image for ${book.title}`}
                  height="150" // Adjust the size as needed
                  width="100" // Adjust the size as needed
                />
                <p style={{ fontSize: '16px', color: '#520909', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                  {book.title}
                </p>
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