import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'; // Dodajte ta uvoz
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


 let res = 0;
function HomePage() {
    const navigate = useNavigate();
    const [email, setUsername] = useState('');
    const [geslo, setPassword] = useState('');
    

    const handleSubmit = async () => { // Popravite ime funkcije tukaj
        try {
            const response = await fetch('http://localhost:5500/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, geslo }),
            });
            res = response.status;
           

            const data = await response.json();
           
            
            if (response.ok) {
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('userID', email);
                console.log('JWT Token:', data.token);
                navigate(`/tickets`);
            }
             
        } catch (error) {
          
          if(res === 401)
            {
              toast.error('Prijava ni uspela');
              
            }else{
              toast.error('Napaka pri komunikaciji s strežnikom');
            }
        }
    };


    return (
      <div>
        <h1>Dobrodošli na Dogodkotu!</h1>
        <p>Vpišite se v svoj uporabniški račun ali pa si ustvarite novega.</p>

        <form className='formdiv'>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={geslo}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleSubmit}>Login</button> {/* Popravite tukaj */}
          <p>Ali ste nov uporabnik? <Link to="/register">Registriraj se</Link></p>
        </form>
        <img src='mitja_slikar.png' alt="AI-slika"></img>
        <ToastContainer />
      </div>
    );
}

export default HomePage;