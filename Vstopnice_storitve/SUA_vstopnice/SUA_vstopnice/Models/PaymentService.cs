namespace SUA_vstopnice.Models
{
    public class PaymentService
    {
        private readonly HttpClient _httpClient;
        private readonly string _paymentApiUrl;

        public PaymentService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _paymentApiUrl = configuration["PaymentApiUrl"]; // "http://localhost:3000"
        }

        public async Task<Payment> ProcessPayment(Payment paymentInfo)
        {
            var response = await _httpClient.PostAsJsonAsync($"{_paymentApiUrl}/payments", paymentInfo); // Uporabite samo _paymentApiUrl brez dodajanja "/payments"
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<Payment>();
            }
            else
            {
                // Handle the error or return null
                return null;
            }
        }
    }

}
