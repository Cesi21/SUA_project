

namespace SUA_vstopnice.Models
{

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
    public class Ticket
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        public string TicketID { get; set; }
        public string EventID { get; set; }
        public string UserID { get; set; }
        public DateTime PurchaseDate { get; set; }
        public Cost Price { get; set; }
        public string SeatNumber { get; set; }
        public string Status { get; set; }
        public DateTime ValidUntil { get; set; }
    }

    public class Cost
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; }
    }

}
