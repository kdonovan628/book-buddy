import { useState } from "react";

const NewUserRegistration = ({ setToken }) => {
  const [inputFirst, setInputFirst] = useState('');
  const [inputLast, setInputLast] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const registerNewUser = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: inputFirst,
          lastname: inputLast,
          email: inputEmail,
          password: inputPassword
        }),
      });
  
      const tokenObj = await response.json();
  
      if (response.ok) {
        const accessToken = tokenObj.access_token;
        setToken(accessToken);
        localStorage.setItem('token', accessToken);
      } else {
        console.error('Registration failed:', tokenObj);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <h2>New User Registration</h2>

    <form 
      id="registration-form"
      onSubmit={registerNewUser}>
      <input 
        placeholder="firstname" 
        onChange={(event) => { setInputFirst(event.target.value); }}
      />
      <input 
        placeholder="lastname" 
        onChange={(event) => { setInputLast(event.target.value); }}
      />
      <input 
        placeholder="email" 
        onChange={(event) => { setInputEmail(event.target.value); }}
      />
      <input 
        placeholder="password" 
        type="password"
        onChange={(event) => { setInputPassword(event.target.value); }}
      />
      <button>Register</button>
    </form>
    </>
  );
};

export default NewUserRegistration;