import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
  
  const [geslo, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [ime, setIme] = useState('');
  const [priimek, setPri] = useState('');
  const [vloga] = useState('obiskovalec');
  //const [_id, setId] = useState('');
  //const [prijavljeniDogodki, setP] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    const userData = { ime, priimek,email, geslo, vloga };
    console.log(userData);
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registracija uspešna');
        navigate('/'); // Preusmeritev na prijavno stran
      } else {
        toast.error(data.message || 'Uporabnik že obstaja ali napaka pri registraciji');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Napaka pri komunikaciji s strežnikom');
    }
  };

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
          <label>Ime:</label>
          <input
            type="text"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
          />
        </div>
        <div>
          <label>Priimek:</label>
          <input
            type="text"
            value={priimek}
            onChange={(e) => setPri(e.target.value)}
          />
        </div>
        
        <div>
          <label>Geslo:</label>
          <input
            type="password"
            value={geslo}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Registriraj se</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;
