import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function RegistrationOK(success) {
    if (success) {
      alert('Registracija uspešna');
      navigate('/'); // Preusmeritev na prijavno stran
    } else {
      alert('Uporabnik že obstaja ali napaka pri registraciji');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userData = { username, email, password };

    fetch('https://localhost:7069/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        RegistrationOK(data.success);
      })
      .catch(error => {
        console.error('Error:', error);
        RegistrationOK(false);
      });
  }

  return (
    <div>
      <h1>Registracija</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Uporabniško ime:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Geslo:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Registriraj se</button>
      </form>
    </div>
  );
}

export default RegisterPage;
