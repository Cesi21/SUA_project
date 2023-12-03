using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SUA_vstopnice.Models;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketsController : ControllerBase
    {




        
        private readonly IMongoCollection<Ticket> _ticketsCollection;
        private readonly PaymentService _paymentService;
        private Payment a = new Payment();


        public TicketsController(IMongoClient mongoClient, IConfiguration configuration, PaymentService paymentService)
        {
            var database = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _ticketsCollection = database.GetCollection<Ticket>("Tickets");
            _paymentService = paymentService; 
        }
       
        // GET: /tickets
        [HttpGet]
        public async Task<IActionResult> GetAllTickets()
        {
            var tickets = await _ticketsCollection.Find(_ => true).ToListAsync();
            return Ok(tickets);
        }

        // GET: /tickets/{ticketId}
        [HttpGet("{ticketId}")]
        public async Task<IActionResult> GetTicketById(string ticketId)
        {
            var ticket = await _ticketsCollection.Find(t => t.TicketID == ticketId).FirstOrDefaultAsync();
            if (ticket == null)
                return NotFound();

            return Ok(ticket);
        }

        // POST: /tickets
        [HttpPost]
        public async Task<IActionResult> CreateTicket([FromBody] Ticket ticket)
        {
            await _ticketsCollection.InsertOneAsync(ticket);
            Random r1 = new Random();
            Random r2 = new Random();
            r1.Next(1,100000);
            r2.Next(1, 100000);
            var pay = new Payment
            {
                PaymentID = r1.ToString(),
                UserID = ticket.UserID,
                EventID = ticket.EventID,
                TicketID = ticket.TicketID,
                Amount = ticket.Price.Amount, 
                Currency = ticket.Price.Currency, 
                PaymentMethod = "", 
                TransactionDate = DateTime.Now,
                Status = "processing",
                PaymentToken = "",
                CardLastFour = 0000,
                TransactionID = r2.ToString(),
                RefundableUntil = ticket.ValidUntil.AddDays(-15)
            };

            // Tukaj uporabite _paymentService za obdelavo plačila
            var paymentResult = await _paymentService.ProcessPayment(pay);

            // Handle the response from payment processing
            if (paymentResult == null)
            {
                return Ok("Storitev za plačila se ni odzvala");
            }

            return Ok(ticket);
        }

        // PUT: /tickets/{ticketId}
        [HttpPut("{ticketId}")]
        public async Task<IActionResult> UpdateTicket(string ticketId, [FromBody] Ticket ticketUpdate)
        {
            var existingTicket = await _ticketsCollection.Find(t => t.TicketID == ticketId).FirstOrDefaultAsync();
            if (existingTicket == null)
            {
                return NotFound();
            }

            
            
            if (ticketUpdate.SeatNumber != "string")
                existingTicket.SeatNumber = ticketUpdate.SeatNumber;
            if (ticketUpdate.Status != "string")
                existingTicket.Status = ticketUpdate.Status;
            if (ticketUpdate.ValidUntil < DateTime.Now)
                existingTicket.ValidUntil = ticketUpdate.ValidUntil;

            var result = await _ticketsCollection.ReplaceOneAsync(t => t.TicketID == ticketId, existingTicket);
            if (result.ModifiedCount == 0)
            {
                return NotFound();
            }
            
            return Ok(existingTicket);
        }


        // DELETE: /tickets/{ticketId}
        [HttpDelete("{ticketId}")]
        public async Task<IActionResult> DeleteTicket(string ticketId)
        {
            var result = await _ticketsCollection.DeleteOneAsync(t => t.TicketID == ticketId);
            if (result.DeletedCount == 0)
                return NotFound();

            return Ok();
        }

        // GET: /tickets/event/{eventId}
        [HttpGet("event/{eventId}")]
        public async Task<IActionResult> GetTicketsByEventId(string eventId)
        {
            var tickets = await _ticketsCollection.Find(t => t.EventID == eventId).ToListAsync();
            if (tickets.Count > 0)
            {
                return NotFound();
            }
            return Ok(tickets);
        }

        // GET: /tickets/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetTicketsByUserId(string userId)
        {
            var tickets = await _ticketsCollection.Find(t => t.UserID == userId).ToListAsync();
            return Ok(tickets);
        }

        // GET: /tickets/status/{status}
        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetTicketsByStatus(string status)
        {
            var tickets = await _ticketsCollection.Find(t => t.Status == status).ToListAsync();
            return Ok(tickets);
        }

    }
}