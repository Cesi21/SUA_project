using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;


namespace ObvestilaAPI
{
    public class Notification
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        public ObjectId _id { get; set; }
      
        public string NotificationID { get; set; }

        public string EventID { get; set; }

        public string UserID { get; set; }

        public string Description { get; set; }
    }
}
