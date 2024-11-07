import { useState } from "react";

const LogInForm = ({ setToken }) => {
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
  
      console.log(result);
  
      if (response.ok) {
        const accessToken = result.token;
  
        if (accessToken) {
          console.log("Login successful! Access token:", accessToken);
          setToken(accessToken);
          localStorage.setItem('token', accessToken);
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
        onChange={(event) => { setInputEmail(event.target.value); }}
      />
      <input 
        placeholder="password" 
        type="password"
        onChange={(event) => { setInputPassword(event.target.value); }}
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LogInForm;