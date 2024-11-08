import { useState } from "react";

const LogInForm = ({ setToken, onLoginSuccess }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const logInUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const accessToken = result.token;

        if (accessToken) {
          setToken(accessToken);
          localStorage.setItem('token', accessToken);

          // Fetch user details after successful login
          const userDetailsResponse = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const userDetails = await userDetailsResponse.json();
          onLoginSuccess(userDetails); // Pass user details to AccountDetails
          localStorage.setItem('userDetails', JSON.stringify(userDetails)); // Save details in localStorage
        } else {
          console.error("Access token is missing from the response:", result);
        }
      } else {
        console.error('Login failed:', result.error);
      }

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <form id="login-form" onSubmit={logInUser}>
      <input 
        placeholder="email" 
        onChange={(event) => setInputEmail(event.target.value)}
      />
      <input 
        placeholder="password" 
        type="password"
        onChange={(event) => setInputPassword(event.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LogInForm;