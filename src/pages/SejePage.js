import React, { useState, useEffect } from 'react';
import './SejePage.css'; // Dodajte to vrstico
//import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SejePage() {
    
    const [tickets, setTickets] = useState([]); 
    const userId = localStorage.getItem("userID"); 
    const jwtToken = localStorage.getItem("jwtToken");
    useEffect(() => {
        fetch(`http://localhost:3005/seje`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
                
            },
        })
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error:', error));
    }, [userId,jwtToken]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('sl-SI', options);
    };


    const [id_seje, setSeja] = useState('');
    const [id_user, setUser] = useState('');

    const InsertSeja = async (event) => {
        
        setSeja(event);
        const userId = localStorage.getItem("userID");
        setUser(userId);
        const userData = { id_seje,id_user };
        console.log(userData);
        const jwtToken = localStorage.getItem("jwtToken");
        try {
          const response = await fetch('http://localhost:3005/seje/prijave', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(userData),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            toast.success('Prijava uspešna');
            
           
          } else {
            toast.error(data.message || 'Prijava že obstaja');
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Napaka pri komunikaciji s strežnikom');
        }
      };



    

    return (
        <div>
            <h1 className="ticket-header">Vse seje</h1>
            
            <div>
                {tickets.map(ticket => (
                    <div key={ticket.title} className="ticket-container">
                        <p className="ticket-detail"><strong>Naslov:</strong> {ticket.title}</p>
                        <p className="ticket-detail"><strong>Opis:</strong> {ticket.description}</p>
                        <p className="ticket-detail"><strong>Lokacija:</strong> {ticket.location}</p>
                        <p className="ticket-detail"><strong>Začetek:</strong>  {formatDate(ticket.start)}</p>
                        <p className="ticket-detail"><strong>Konec:</strong> {formatDate(ticket.end)}</p>
                        <p className="ticket-detail"><strong>Organizator:</strong> {ticket.organizer}</p>
                        <p className="ticket-detail"><strong>Kontakt:</strong> {ticket.contact}</p>
                        <button onClick={() => InsertSeja(ticket.title)}>Prijavi se na sejo</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SejePage;