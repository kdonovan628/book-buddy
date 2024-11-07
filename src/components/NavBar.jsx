import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/bookcatalog">Book Catalog</Link>
        <Link to="/accountdetails">Account</Link>
      </nav>
    </>
  );
};

export default NavBar;