import React, { useState, useEffect } from 'react';
import './MojeSejePage.css'; // Dodajte to vrstico
//import { useNavigate } from 'react-router-dom';
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MojeSejePage() {

    const [tickets, setTickets] = useState([]); // Stanje za shranjevanje podatkov o vstopnicah
    const userId = localStorage.getItem("userID"); // ID uporabnika, za katerega želite pridobiti vstopnice

    useEffect(() => {
        fetch(`http://localhost:3005/seje/prijave/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error:', error));
    }, [userId]);


    return (
        <div>
            <h1 className="ticket-header">Moje seje</h1>

            <div>
                {tickets.map(ticket => (
                    <div key={ticket.id_seje} className="ticket-container">
                        <p className="ticket-detail"><strong>Naslov seje:</strong> {ticket.id_seje}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MojeSejePage;