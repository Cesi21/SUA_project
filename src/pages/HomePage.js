import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './HomePage.css';
function HomePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement login logic here
    console.log('Login Attempt:', username, password);
  };

  return (
    <div>
      <h1>Dobrodošli na Dogodkotu!</h1>
      <p>Vpišite se v svoj uporabniški račun ali pa si ustvarite novega.</p>
      
      <form onSubmit={handleSubmit} class='formdiv'>
      
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
        <button type="submit">Login</button>
        {/* Register Button */}
        <p>Ali ste nov uporabnik? <Link to="/register">Registriraj se</Link></p>
      </form>
      <img src='mitja_slikar.png' alt="AI-slika"></img>
    </div>



//DISPLAY NEKI DOGODKI 






/* Top spletna prodaja
01
STING
02
Siddharta - Prepovedana turneja 2024
03
SLOVENSKA MUSKA V STOŽICAH
04
FEJMIČI: SAMA STA NAJBOLJŠA
05
ŽIGOLO S.P. | DOMEN VALIČ
06
ROD STEWART
07
CEDEVITA OLIMPIJA - PARIS BASKETBALL
08
STRAST, DOJENČEK IN ROMPOMPOM
09
NINA PUŠLAR
10
IZNENADA SALOME
*/

  );
}

export default HomePage;
