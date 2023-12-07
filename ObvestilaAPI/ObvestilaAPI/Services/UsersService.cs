using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace ObvestilaAPI.Services
{
    public class UsersService
    {
        private readonly HttpClient _httpClient;

        public UsersService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetUserEmailAsync()
        {
            string url = "http://localhost:11122/users";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            var users = Newtonsoft.Json.JsonConvert.DeserializeObject<List<User>>(responseBody);

            return users.Count > 0 ? users[0].Email : null;
        }
    }
}
