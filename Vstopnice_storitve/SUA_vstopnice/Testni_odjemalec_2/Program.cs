using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Transactions;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using SUA_vstopnice.Models; // Za dostop do modela Payment

namespace SUA_vstopnice.TestClient
{
    class Program
    {

        static async Task Main(string[] args)
        {
            var handler = new HttpClientHandler();


            handler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };





            
            var pay = new Payment
            {
                PaymentID = "stringXY",
                TicketID = "stringT",
                EventID = "stringE",
                UserID = "stringU",
                TransactionDate = DateTime.Now,
                Amount = 50,
                Currency = "EUR",
                PaymentMethod = "CreditCard",
                PaymentToken = "stringPT",
                CardLastFour = 1234,
                TransactionID = "stringTid",
                Status = "unpaid",
                RefundableUntil = DateTime.Now.AddDays(30)



            };
            var payx = new Payment
            {
                PaymentID = "stringXY",
                TicketID = "string",
                EventID = "stringE",
                UserID = "stringU",
                TransactionDate = DateTime.Now,
                Amount = 0,
                Currency = "string",
                PaymentMethod = "string",
                PaymentToken = "string",
                CardLastFour = 1234,
                TransactionID = "string",
                Status = "paid",
                RefundableUntil = DateTime.Now.AddDays(30)



            };
            using (var client = new HttpClient(handler))
            {

                client.Timeout = TimeSpan.FromSeconds(15);
                Console.WriteLine("Čakam, da se servis zažene...");
                await Task.Delay(5000);
                client.BaseAddress = new Uri("http://localhost:3000/");

                // Testiranje pridobivanja vseh vstopnic
                await GetAllPayments(client);

                // Testiranje ustvarjanja nove vstopnice
                await CreatePayment(pay, client);

                // Testiranje pridobivanja posamezne vstopnice
                await GetPaymentId("stringXY", client);

                
                // Testiranje posodabljanja vstopnice
                await UpdatePayment("stringXY", payx, client);

                //Testiranje pridobivanja vstopnic po ID dogodka
                await GetPaymentsEventId("stringE", client);

                // Testiranje pridobivanja vstopnic po ID uporabnika
                await GetPaymentsUserId("stringU", client);

                // Testiranje pridobivanja vstopnic po statusu
                await GetPaymentsDate("paid", client);

                // Testiranje brisanja vstopnice
                await DeletePayment("stringXY", client);
                
            }

        }

        private static async Task GetAllPayments(HttpClient client)
        {
            HttpResponseMessage response = await client.GetAsync("payments");
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

        private static async Task GetPaymentId(string py, HttpClient client)
        {
            HttpResponseMessage response = await client.GetAsync($"payments/{py}");
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

        private static async Task CreatePayment(Payment ticket, HttpClient client)
        {
            var json = JsonSerializer.Serialize(ticket);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PostAsync("payments", data);
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

        private static async Task UpdatePayment(string ticketId, Payment ticket, HttpClient client)
        {
            var json = JsonSerializer.Serialize(ticket);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PutAsync($"payments/{ticketId}", data);
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
            

        }


        private static async Task DeletePayment(string ticketId, HttpClient client)
        {
            HttpResponseMessage response = await client.DeleteAsync($"payments/{ticketId}");
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
            await Task.Delay(10000);
        }

        private static async Task GetPaymentsEventId(string eventId, HttpClient client)
        {
            HttpResponseMessage response = await client.GetAsync($"payments/event/{eventId}");
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

        private static async Task GetPaymentsUserId(string userId, HttpClient client)
        {
            HttpResponseMessage response = await client.GetAsync($"payments/user/{userId}");
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

        private static async Task GetPaymentsDate(string status, HttpClient client)
        {
            //string dateX = date.ToString();
            HttpResponseMessage response = await client.GetAsync($"payments/status/{status}");
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
    }
}