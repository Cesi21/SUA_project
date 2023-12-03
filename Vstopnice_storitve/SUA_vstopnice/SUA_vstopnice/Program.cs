using YourNamespace.Controllers;
using MongoDB.Driver;
using System;
using SUA_vstopnice.Models;

var builder = WebApplication.CreateBuilder(args);

// Dodajte MongoDB konfiguracijo
var mongoDBSettings = builder.Configuration.GetSection("MongoDB").Get<MongoDbSettings>();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrirajte MongoClient in ga injicirajte v kontrolerje
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
    new MongoClient(mongoDBSettings.ConnectionString));

// Registrirajte HttpClient in PaymentService
builder.Services.AddHttpClient<PaymentService>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["PaymentApiUrl"]);
});

// Dodajanje CORS podpore

/*builder.Services.AddCors(options =>
{
    options.AddPolicy("OpenCorsPolicy", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod());
});
*/
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", "https://localhost:7069", "http://localhost:5256")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Uporabite CORS pred UseRouting in UseAuthorization
app.UseCors();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
