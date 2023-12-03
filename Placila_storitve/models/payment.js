

class Payment {
    constructor(PaymentID, UserID, EventID, TicketID, Amount, PaymentMethod, TransactionDate, 
        Status, PaymentToken, CardLastFour, TransactionID, RefundableUntil) {
        this.PaymentID = PaymentID;
        this.UserID = UserID;
        this.EventID = EventID;
        this.TicketID = TicketID;
        this.Amount = Amount;
        this.PaymentMethod = PaymentMethod;
        this.TransactionDate = TransactionDate;
        this.Status = Status;
        this.PaymentToken = PaymentToken;
        this.CardLastFour = CardLastFour;
        this.TransactionID = TransactionID;
        this.RefundableUntil = RefundableUntil;
    }
}

module.exports = Payment;

const paymentRoutes = require('./routes/payments');
app.use('/payments', paymentRoutes);
