import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PaymentPage.css'; // Ustvarite CSS datoteko za stiliranje, če želite

function PaymentPage() {
    const { ticketID } = useParams();
    const [payments, setPayment] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:3001/payments/ticket/${ticketID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                
            },
        })
            .then(response => response.json())
            .then(data => setPayment(data))
            .catch(error => console.error('Error:', error));
    }, [ticketID]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('sl-SI', options);
    };

    if (!payments) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="payment-header">
            {payments.map(payment => (
                    <div key={payment.ticketID} className="payments-container">
                        <p className="pay-detail"><strong>ID vstopnice:</strong> {payment.TicketID}</p>
                        <p className="pay-detail"><strong>Dan nakupa:</strong> {formatDate(payment.TransactionDate)}</p>
                        <p className="pay-detail"><strong>Cena:</strong> {payment.Amount}</p>
                        <p className="pay-detail"><strong>Valuta:</strong> {payment.Currency}</p>
                        <p className="pay-detail"><strong>Zadnje številke kartice:</strong> {payment.CardLastFour}</p>
                        <p className="pay-detail"><strong>Status:</strong> {payment.Status}</p>
                        <p className="pay-detail"><strong>ID transakcije:</strong> {payment.TransactionID}</p>
                        <p className="pay-detail"><strong>Povračilo možno do:</strong> {formatDate(payment.RefundableUntil)}</p>
                    </div>
                ))}
        </div>
    );
}

export default PaymentPage;