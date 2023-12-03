using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace SUA_vstopnice.Models
{
    public class Payment
    {
        
        public string PaymentID { get; set; }
        public string UserID { get; set; }
        public string EventID { get; set; }
        public string TicketID { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Status { get; set; }

        public string PaymentToken{ get; set; }
        public int CardLastFour { get; set; }
        public string TransactionID { get; set; }
        public DateTime RefundableUntil { get; set; }
    }
}
