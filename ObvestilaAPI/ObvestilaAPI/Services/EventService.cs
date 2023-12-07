using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace ObvestilaAPI.Services
{
    public class EventService
    {
        private readonly HttpClient _httpClient;

        public EventService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetEventTitleAsync()
        {
            string url = "http://localhost:11120/Dogodki";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            var events = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Event>>(responseBody);

            return events.Count > 0 ? events[0].Naslov : null;
        }

        public async Task<string> GetEventDateAsync()
        {
            string url = "http://localhost:11120/Dogodki";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            var events = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Event>>(responseBody);

            return events.Count > 0 ? events[0].DatumZacetka.ToShortDateString() : null;
        }

        public async Task<string> GetEventLocationAsync()
        {
            string url = "http://localhost:11120/Dogodki";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            var events = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Event>>(responseBody);

            return events.Count > 0 ? events[0].Lokacija : null;
        }
    }
}
