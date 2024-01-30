import React, { useState, useEffect } from 'react';
import './TicketPage.css';
import { useNavigate } from 'react-router-dom';

function TicketPage() {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const userId = localStorage.getItem("userID");
    const jwtToken = localStorage.getItem("jwtToken");
    
    

    useEffect(() => {
        fetch(`http://localhost:11126/tickets/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`, 
            },
        })
        .then(response => response.json())
        .then(data => setTickets(data))
        .catch(error => console.error('Error:', error));
    }, [userId, jwtToken]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('sl-SI', options);
    };

    const handlePaymentClick = (ticketID) => {
        navigate(`/placilo/${ticketID}`);
    };


    return (
        <div>
            <h1 className="ticket-header">Vse vstopnice</h1>
            <p>Vstopnice glede uporabnika z ID: {userId}</p>
            <div>
                {tickets.map(ticket => (
                    <div key={ticket.ticketID} className="ticket-container">
                        <p className="ticket-detail"><strong>ID dogodtka:</strong> {ticket.eventID}</p>
                        <p className="ticket-detail"><strong>ID vstopnice:</strong> {ticket.ticketID}</p>
                        <p className="ticket-detail"><strong>Dan nakupa:</strong> {formatDate(ticket.purchaseDate)}</p>
                        <p className="ticket-detail"><strong>Cena:</strong> {ticket.price.amount} {ticket.price.currency}</p>
                        <p className="ticket-detail"><strong>Sedež:</strong> {ticket.seatNumber}</p>
                        <p className="ticket-detail"><strong>Status:</strong> {ticket.status}</p>
                        <p className="ticket-detail"><strong>Veljavno do:</strong> {formatDate(ticket.validUntil)}</p>
                        <button onClick={() => handlePaymentClick(ticket.ticketID)}>Prikaži podrobnosti plačila</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TicketPage;