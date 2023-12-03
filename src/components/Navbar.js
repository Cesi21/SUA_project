import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/events">Dogodki</Link>
      <Link to="/tickets">Vstopnice</Link>
      <Link to="/seje">Seje</Link>
      {/*<Link to="/events">Obvestila</Link>
      <Link to="/events">Nastavitve</Link>
      <Link to="/events">Odjava</Link>
       Add additional navigation links here */}
    </nav>
  );
}

export default Navbar;