import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './TicketPage.css'; // Dodajte to vrstico
import 'react-toastify/dist/ReactToastify.css';

function EventPage() {
  const [userID] = useState(localStorage.getItem("userID"));
  //const [price] = useState({ amount: 20, currency: "EUR" });
  const [seatNumber] = useState('A102');
  const [status] = useState("Aktivna");

  const [events, setEvents] = useState([]); 
  
  useEffect(() => {
    fetch(`http://localhost:5025/dogodki`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => setEvents(data))
    .catch(error => console.error('Error:', error));
  }, []);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('sl-SI', options);
  };

  const handleClick = async (eventIDX, datumKoncaX) => {
    const userData = { 
   
      
      TicketID: eventIDX + "12345", // Uporabite velike začetnice, če je to potrebno
    EventID: eventIDX, // Uporabite velike začetnice, če je to potrebno
    UserID: userID, // Uporabite velike začetnice, če je to potrebno
    PurchaseDate: new Date().toISOString(), // Preverite, ali je to pravi format
    Price: { Amount: 20, Currency: "EUR" }, // Preverite, ali je to prava struktura
    SeatNumber: seatNumber,
    Status: status,
    ValidUntil: new Date(datumKoncaX).toISOString()
    };

    try {
      const response = await fetch('https://localhost:7069/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
        
      });
      console.log(userData);
      console.log("NEKAJJJJJJJJ");
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success('Uspešno ste kupili vstopnico');
        // navigate('/'); // Preusmeritev na prijavno stran
      } else {
        toast.error(data.message || 'Vstopnica ni na voljo');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Napaka pri komunikaciji s strežnikom');
    }
  };

  return (
    <div>
      <h1 className="ticket-header">Vsi dogodki</h1>
      <div>
        {events.map(event => (
          <div key={event.naslov} className="ticket-container">
            <p className="ticket-detail"><strong>Naslov:</strong> {event.naslov}</p>
            <p className="ticket-detail"><strong>Opis:</strong> {event.opis}</p>
            <p className="ticket-detail"><strong>Začetek dogodka:</strong> {formatDate(event.datumZacetka)}</p>
            <p className="ticket-detail"><strong>Konec Dogodka:</strong> {formatDate(event.datumKonca)}</p>                      
            <p className="ticket-detail"><strong>Lokacija:</strong> {event.lokacija}</p>
            <button onClick={() => handleClick(event.naslov, event.datumKonca)}>Kupi vstopnico</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventPage;