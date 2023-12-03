using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using SUA_vstopnice.Models; // Za dostop do modela Ticket

namespace SUA_vstopnice.TestClient
{
    class Program
    {

        
        
        
        

        static async Task Main(string[] args)
        {
            var handler = new HttpClientHandler();


            handler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };

            


            
            Cost a = new Cost();
            a.Amount = 50; 
            a.Currency = "EUR";
            var vstopnica = new Ticket
            {
                Id = new ObjectId { },
                TicketID = "stringXY",
                EventID = "stringE",
                UserID = "stringU",
                PurchaseDate = DateTime.Now,
                Price = a,
                SeatNumber = "string",
                Status = "active",
                ValidUntil = DateTime.Now.AddDays(30)



            };
            Cost b = new Cost();
            b.Amount = 0;
            b.Currency = "string";
            var vstopnicab = new Ticket
            {

                
                Id = new ObjectId { },
                TicketID = "string",
                EventID = "string",
                UserID = "string",
                PurchaseDate = DateTime.Now,
                Price = b,



                SeatNumber = "A102",
                Status = "string",
                ValidUntil = DateTime.Now.AddDays(-30),
                
                




            };
            using (var client = new HttpClient(handler))
            {

                client.Timeout = TimeSpan.FromSeconds(15);
                Console.WriteLine("Čakam, da se servis zažene...");
                await Task.Delay(10000);
                client.BaseAddress = new Uri("http://localhost:5256/");

                // Testiranje pridobivanja vseh vstopnic
                await GetAllTickets(client);

                // Testiranje ustvarjanja nove vstopnice
                await CreateTicket(vstopnica, client);

                // Testiranje pridobivanja posamezne vstopnice
                await GetTicketById("stringXY", client);

                // Testiranje posodabljanja vstopnice
                await UpdateTicket("stringXY", vstopnicab, client);

                //Testiranje pridobivanja vstopnic po ID dogodka
                await GetTicketsByEventId("stringE", client);

                // Testiranje pridobivanja vstopnic po ID uporabnika
                await GetTicketsByUserId("stringU", client);

                // Testiranje pridobivanja vstopnic po statusu
                await GetTicketsByStatus("active", client);
                
                // Testiranje brisanja vstopnice
                await DeleteTicket("stringXY", client);
            }
            
        }

        private static async Task GetAllTickets(HttpClient client)
        {
            HttpResponseMessage response = await client.GetAsync("tickets");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error: {response.StatusCode}");
            }
            else
            {
                Console.WriteLine($"Status: {response.StatusCode}");
            }
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        private static async Task GetTicketById(string ticketId, HttpClient client)
        {
            HttpResponseMessage response = await client.GetAsync($"tickets/{ticketId}");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error: {response.StatusCode}");
            }
            else
            {
                Console.WriteLine($"Status: {response.StatusCode}");
            }
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        private static async Task CreateTicket(Ticket ticket, HttpClient client)
        {
            var json = JsonSerializer.Serialize(ticket);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PostAsync("tickets", data);
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error: {response.StatusCode}");
            }
            else
            {
                Console.WriteLine($"Status: {response.StatusCode}");
            }
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        private static async Task UpdateTicket(string ticketId, Ticket ticket, HttpClient client)
        {
            var json = JsonSerializer.Serialize(ticket);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PutAsync($"tickets/{ticketId}", data);
            if (!response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error: {response.StatusCode}");
                Console.WriteLine($"Response Body: {responseBody}");
            }
            else
            {
                Console.WriteLine($"Status: {response.StatusCode}");
                string responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseBody);
            }
            await Task.Delay(15000);

        }


        private static async Task DeleteTicket(string ticketId , HttpClient client)
        {
            HttpResponseMessage response = await client.DeleteAsync($"tickets/{ticketId}");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error: {response.StatusCode}");
            }
            else
            {
                Console.WriteLine($"Status: {response.StatusCode}");
            }
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        private static async Task GetTicketsByEventId(string eventId, HttpClient client)
        {
            HttpResponseMessage response = await client.GetAsync($"tickets/event/{eventId}");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error: {response.StatusCode}");
            }
            else
            {
                Console.WriteLine($"Status: {response.StatusCode}");
            }
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        private static async Task GetTicketsByUserId(string userId, HttpClient client)
        {
            HttpResponseMessage response = await client.GetAsync($"tickets/user/{userId}");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error: {response.StatusCode}");
            }
            else
            {
                Console.WriteLine($"Status: {response.StatusCode}");
            }
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }

        private static async Task GetTicketsByStatus(string status, HttpClient client)
        {
            HttpResponseMessage response = await client.GetAsync($"tickets/status/{status}");
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error: {response.StatusCode}");
            }
            else
            {
                Console.WriteLine($"Status: {response.StatusCode}");
            }
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
            await Task.Delay(15000);
        }
    }
}
