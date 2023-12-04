
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors'); 

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const fetch = require('node-fetch');
let uporabniki = [];
async function  pridobiUporabnike () {
    return fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Napaka pri pridobivanju uporabnikov');
        }
        return response.json();
    })
    .then(data => {
        uporabniki = data; 
        //console.log("To je data");
        //console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}




app.post('/login', async (req, res) => {
    await pridobiUporabnike();
    const { email, geslo } = req.body;

    // Najdite uporabnika z ustreznim e-poštnim naslovom
    const uporabnik = uporabniki.find(user => user.email === email);
    //console.log(uporabnik);
    // Preverite, ali uporabnik obstaja in ali se geslo ujema
    if (!uporabnik || uporabnik.geslo !== geslo) {
        return res.status(401).send('Neveljavno uporabniško ime ali geslo');
    }

    // Ustvarite JWT token
    const token = jwt.sign(
        { 
            sub: "jwt token", 
            name: email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // Veljavnost 1 uro
        },
        'fak_you' // Uporabite varen način shranjevanja skrivnih ključev
    );

    res.json({ token });
});
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Strežnik teče na portu ${PORT}`);});