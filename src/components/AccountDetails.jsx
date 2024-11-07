import { useState, useEffect } from "react";
import LogInForm from "./LogInForm";
import NewUserRegistration from "./NewUserRegistration";

const AccountDetails = ({ token, setToken }) => {
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  return (
    <>
      <NewUserRegistration setToken={setToken} />

      {token ? null : <LogInForm setToken={setToken} />}
    </>
  );
};

export default AccountDetails;