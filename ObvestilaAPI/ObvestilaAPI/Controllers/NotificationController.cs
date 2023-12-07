using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ObvestilaAPI.Models;
using ObvestilaAPI.Services;
using System.Net.Sockets;
using System.Transactions;

namespace ObvestilaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotificationController : Controller
    {
        private readonly IMongoCollection<Notification> _notifications;
        private readonly MongoDBSettings _mongoDBSettings;

        public NotificationController(IMongoClient mongoClient, IConfiguration configuration)
        {
            var database = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _notifications = database.GetCollection<Notification>("Obvestila");
            
        }

        // CRUD operacije (Create, Read, Update, Delete)
        // Na primer, za pridobivanje vseh obvestil:
        [HttpGet]
        public async Task<List<Notification>> Get() =>
            await _notifications.Find(_ => true).ToListAsync();

        // Ustvarjanje obvestila:
        [HttpPost]
        public async Task<IActionResult> CreateNotificationAsync([FromBody] Notification ustavarjena)
        {
            var eventService = new EventService(new HttpClient());
            string eventTitle = await eventService.GetEventTitleAsync();
            string eventDate = await eventService.GetEventDateAsync();
            string eventLokacija = await eventService.GetEventLocationAsync();
            var userService = new UsersService(new HttpClient());
            string userEmail = await userService.GetUserEmailAsync();
            Random rand = new Random();
            //limit random between 1 and 1000
            int naključna = rand.Next(1, 1000);
            Notification notification = new Notification
            {
                NotificationID = "Notifi_" + naključna,
                EventID = eventTitle,
                UserID = userEmail,
                Description = "Dogodek se bo začel na datum: " + eventDate + " in potekal na lokaciji: " + eventLokacija + "\n"+ ustavarjena.Description
            };
            await _notifications.InsertOneAsync(notification);
            if (notification == null)
            {
                return BadRequest();
            }   
            else
            {
                return Ok();
            }
        }

        // Pridobivanje obvestila z ID-jem:
        [HttpGet("{NotificationID}", Name = "GetNotification")]
        public async Task<IActionResult> Get(string NotificationID)
        {
            var notification = await _notifications.Find(notification => notification.NotificationID == NotificationID).FirstOrDefaultAsync();
            if (notification == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(notification);
            }
            
        }

        //Pridobitev obvestila z določenim opisom
        [HttpGet("Description/{Description}", Name = "GetNotificationByDescription")]
        public async Task<IActionResult> GetByDescription(string Description)
        {
            var notification = await _notifications.Find(notification => notification.Description.Contains(Description)).FirstOrDefaultAsync();
            if (notification == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(notification);
            }
            
        }

        // Posodabljanje obvestila z ID-jem:
        [HttpPut("{NotificationID}")]
        public async Task<IActionResult> Update(string NotificationID, [FromBody] Notification notification)
        {
            var notificationInDb = await _notifications.Find(n => n.NotificationID == NotificationID).FirstOrDefaultAsync();

            notification._id = notificationInDb._id;

            if (notificationInDb == null)
            {
                return NotFound();
            }
            else
            {
                await _notifications.ReplaceOneAsync(n => n.NotificationID == NotificationID, notification);
                return Ok();
            }
            
        }

        // Brisanje obvestila z ID-jem:
        [HttpDelete("{NotificationID}")]
        public async Task<IActionResult> Delete(string NotificationID)
        {
            var notification = await _notifications.Find(notification => notification.NotificationID == NotificationID).FirstOrDefaultAsync();
            if (notification == null)
            {
                return NotFound();
            }
            else
            {
                await _notifications.DeleteOneAsync(notification => notification.NotificationID == NotificationID);
                return Ok();
            }
            
        }
    }
}
