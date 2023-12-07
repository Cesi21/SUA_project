using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ObvestilaAPI
{
    public class Event
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; }
        public string Naslov { get; set; }
        public string Opis { get; set; }
        public DateTime DatumZacetka { get; set; }
        public DateTime DatumKonca { get; set; }
        public string Lokacija { get; set; }
    }
}
