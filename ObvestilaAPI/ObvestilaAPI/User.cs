using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ObvestilaAPI
{
    public class User
    {
        
        public string _id { get; set; }
        public string Email { get; set; }
        public string Geslo { get; set; }
        public string Ime { get; set; }
        public string Priimek { get; set; }
        public string Vloga { get; set; }

    }
}
