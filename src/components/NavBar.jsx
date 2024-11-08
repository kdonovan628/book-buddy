import { Link } from 'react-router-dom';

const NavBar = ({ logOutButton }) => {
  return (
    <>
      <nav id="navbar">
        <Link to="/">Home</Link>
        <Link to="/bookcatalog">Book Catalog</Link>
        <Link to="/accountdetails">Account</Link>
        {logOutButton}
      </nav>
    </>
  );
};

export default NavBar;