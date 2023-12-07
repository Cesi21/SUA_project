using MongoDB.Driver;
using System;
using ObvestilaAPI.Models;
using ObvestilaAPI.Controllers;
using Microsoft.Extensions.Configuration;


var builder = WebApplication.CreateBuilder(args);

// Dodajte to vrstico, da določite URL-je, na katerih naj aplikacija posluša
// To bo omogočilo Dockerju, da posreduje zahteve iz gostitelja v kontejner

builder.WebHost.UseUrls("http://*:11124");
//Dodaj MongoDb Konfiguracijo
var mongoDBSettings = builder.Configuration.GetSection("MongoDB").Get<MongoDBSettings>();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrirajte MongoClient in ga injicirajte v kontrolerje
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
    new MongoClient(mongoDBSettings.ConnectionString));

//// Registrirajte HttpClient in PaymentService
//builder.Services.AddHttpClient<PaymentService>(client =>
//{
//    client.BaseAddress = new Uri(builder.Configuration["PaymentApiUrl"]);
//});


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsEnvironment("Staging"))
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
