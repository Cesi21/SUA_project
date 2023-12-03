import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();

  function LoginOK(ID) {
    if (ID === "0000") {
      alert('Napačno uporabniško ime ali geslo');
    } else {
      navigate(`/tickets/${ID}`);
    }
  }

  function HandleSubmit() {
    const userpass = username + "%" + password;

    fetch(`https://localhost:7069/tickets/user/${userpass}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        
        LoginOK(data.UserID);
      })
      .catch(error => {
        console.error('Error:', error);
        LoginOK("0000");
      });
  }

  return (
    <div>
      <h1>Dobrodošli na Dogodkotu!</h1>
      <p>Vpišite se v svoj uporabniški račun ali pa si ustvarite novega.</p>

      <form className='formdiv'>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={HandleSubmit}>Login</button>
        <p>Ali ste nov uporabnik? <Link to="/register">Registriraj se</Link></p>
      </form>
      <img src='mitja_slikar.png' alt="AI-slika"></img>
    </div>
  );
}

export default HomePage;