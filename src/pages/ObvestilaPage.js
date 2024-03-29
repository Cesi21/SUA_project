import React, { useState, useEffect } from 'react';
import './MojeSejePage.css'; 
//import { useNavigate } from 'react-router-dom';
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ObvestilaPage() {

    const [tickets, setTickets] = useState([]); 
    const userId = localStorage.getItem("userID");

    useEffect(() => {
        fetch(`http://localhost:11124/notification`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'

            },
        })
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error:', error));
    }, [userId]);


    return (
        <div>
            <h1 className="ticket-header">Obvestila</h1>

            <div>
                {tickets.map(ticket => (
                    <div key={ticket.notificatioID} className="ticket-container">
                        <p className="ticket-detail"><strong>Obvestilo:</strong> {ticket.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ObvestilaPage;