import { useState } from "react";

const LogInForm = ({ setToken }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const logInUser = async (event) => {
    event.preventDefault();

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

    const tokenObj = await response.json();

    if (response.ok) {
      const accessToken = tokenObj.access_token;
      setToken(accessToken);
      localStorage.setItem('token', accessToken);
    } else {
      console.error('Login failed:', tokenObj.error);
    }
  };

  return (
    <form 
    id="login-form"
    onSubmit={logInUser}>
      <input 
        placeholder="email" 
        onChange={(event) => { setInputEmail(event.target.value); }}
      />
      <input 
        placeholder="password" 
        type="password"
        onChange={(event) => { setInputPassword(event.target.value); }}
      />
      <button>Log In</button>
    </form>
  );
};

export default LogInForm;