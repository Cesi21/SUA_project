import React, { useState, useEffect } from 'react';
import './SejePage.css'; // Dodajte to vrstico
import { useNavigate } from 'react-router-dom';

function SejePage() {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]); // Stanje za shranjevanje podatkov o vstopnicah
    const userId = "322632"; // ID uporabnika, za katerega želite pridobiti vstopnice
    
    useEffect(() => {
        fetch(`http://localhost:3005/seje`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                
            },
        })
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error:', error));
    }, [userId]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('sl-SI', options);
    };
    const handlePaymentClick = (ticketID) => {
        // Dodajte tukaj dodatno logiko, če je potrebno
      //  navigate(`/placilo/${ticketID}`);
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
                        <button onClick={() => handlePaymentClick(ticket._id)}>Prikaži podrobnosti plačila</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SejePage;