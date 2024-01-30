const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://cesi:2314@ptscluster.gkdlocr.mongodb.net/?retryWrites=true&w=majority'; // Nastavite vašo MongoDB povezavo
const dbName = 'suacesar2'; // Ime vaše MongoDB baze
const collectionName = 'Payments'; // Ime vaše MongoDB kolekcije
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Funkcija za spremembo ključev v dokumentu
function capitalizeKeys(obj) {
    let newObj = {};
    for (let key in obj) {
        let capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        newObj[capitalizedKey] = obj[key];
    }
    return newObj;
}

// Povežemo se z MongoDB bazo
async function neki() {
    await client.connect();
const db = client.db(dbName);
const collection = db.collection(collectionName);
}
neki();
// JWT Verification Middleware
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];

        jwt.verify(bearerToken, 'neki', (err, authData) => {
            if (err) {
                res.sendStatus(403); // Forbidden
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

module.exports = function(db) {
    const collection = db.collection('Payments');

    /**
    * @swagger
    * /payments:
    *   get:
    *     summary: Vrne seznam vseh plačil
    *     responses:
    *       200:
    *         description: Uspešen odziv s seznamom plačil
    *       500:
    *         description: Napaka na strežniku
    */
    router.get('/', verifyToken, async (req, res) => {
        try {
            const payments = await collection.find().toArray();
            res.status(200).json(payments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    /**
    * @swagger
    * /payments/{paymentId}:
    *   get:
    *     summary: Vrne plačilo po ID-ju
    *     parameters:
    *       - in: path
    *         name: PaymentId
    *         schema:
    *           type: string
    *         required: true
    *         description: MongoDB ID plačila
    *     responses:
    *       200:
    *         description: Uspešen odziv s plačilom
    *       404:
    *         description: Plačilo ni bilo najdeno
    *       500:
    *         description: Napaka na strežniku
    */
    router.get('/:PaymentID', verifyToken, async (req, res) => {
        try {
            const payment = await collection.findOne({ PaymentID: req.params.PaymentID });
            if (!payment) {
                return res.status(404).json({ error: 'Placilo ni bilo najdeno' });
            }
            res.status(200).json(payment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    /**
    * @swagger
    * /payments:
    *   post:
    *     summary: Dodajanje novega plačila
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - userID
    *               - eventID
    *               - amount
    *             properties:
    *               userID:
    *                 type: string
    *               eventID:
    *                 type: string
    *               amount:
    *                 type: number
    *     responses:
    *       201:
    *         description: Plačilo uspešno dodano
    *       500:
    *         description: Napaka na strežniku
    */
    router.post('/', async (req, res) => {
        console.log("Uspešno dodan dokument");
        try {
            const newPayment = req.body;
            // Najprej vstavimo dokument
            await collection.insertOne(newPayment);
    
            // Spremenimo ključe in posodobimo dokument
            let updatedPayment = capitalizeKeys(newPayment);
            await collection.updateOne({ _id: newPayment._id }, { $set: updatedPayment });
    
            res.status(201).json(updatedPayment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    /**
    * @swagger
    * /payments/{paymentId}:
    *   put:
    *     summary: Posodobitev obstoječega plačila
    *     parameters:
    *       - in: path
    *         name: paymentId
    *         schema:
    *           type: string
    *         required: true
    *         description: MongoDB ID plačila
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               status:
    *                 type: string
    *                 description: Nov status plačila
    *     responses:
    *       200:
    *         description: Plačilo uspešno posodobljeno
    *       404:
    *         description: Plačilo ni bilo najdeno
    *       500:
    *         description: Napaka na strežniku
    */
    router.put('/:PaymentID', verifyToken, async (req, res) => {
        try {
            const updatedPayment = req.body;
            const result = await collection.replaceOne({ PaymentID: req.params.PaymentID }, updatedPayment);
            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: 'Plačilo ni bilo najdeno' });
            }
            res.status(200).json(updatedPayment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    

    /**
    * @swagger
    * /payments/{paymentId}:
    *   delete:
    *     summary: Brisanje plačila
    *     parameters:
    *       - in: path
    *         name: paymentId
    *         schema:
    *           type: string
    *         required: true
    *         description: MongoDB ID plačila
    *     responses:
    *       200:
    *         description: Plačilo uspešno izbrisano
    *       404:
    *         description: Plačilo ni bilo najdeno
    *       500:
    *         description: Napaka na strežniku
    */
    router.delete('/:PaymentID', verifyToken, async (req, res) => {
        try {
            const result = await collection.deleteOne({ PaymentID: req.params.PaymentID });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Plačilo ni bilo najdeno' });
            }
            res.status(200).json({ message: 'Plačilo je bilo uspešno izbrisano' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    /**
    * @swagger
    * /payments/user/{userId}:
    *   get:
    *     summary: Vrne plačila po ID-ju uporabnika
    *     parameters:
    *       - in: path
    *         name: userId
    *         schema:
    *           type: string
    *         required: true
    *         description: ID uporabnika
    *     responses:
    *       200:
    *         description: Uspešen odziv s seznamom plačil uporabnika
    *       500:
    *         description: Napaka na strežniku
    */
    router.get('/user/:UserID', verifyToken, async (req, res) => {
    try {
        const payments = await db.collection('Payments').find({ UserID: req.params.UserID }).toArray();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });

    /**
    * @swagger
    * /payments/ticket/{TicketID}:
    *   get:
    *     summary: Vrne plačila po ID-ju vstopnice
    *     parameters:
    *       - in: path
    *         name: TicketID
    *         schema:
    *           type: string
    *         required: true
    *         description: ID vstopnice
    *     responses:
    *       200:
    *         description: Uspešen odziv s seznamom plačil uporabnika
    *       500:
    *         description: Napaka na strežniku
    */
    router.get('/ticket/:TicketID', async (req, res) => {
        try {
            const payments = await db.collection('Payments').find({ TicketID: req.params.TicketID }).toArray();
            res.status(200).json(payments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    /**
    * @swagger
    * /payments/event/{eventId}:
    *   get:
    *     summary: Vrne plačila po ID-ju dogodka
    *     parameters:
    *       - in: path
    *         name: eventId
    *         schema:
    *           type: string
    *         required: true
    *         description: ID dogodka
    *     responses:
    *       200:
    *         description: Uspešen odziv s seznamom plačil dogodka
    *       500:
    *         description: Napaka na strežniku
    */
    router.get('/event/:EventID', verifyToken, async (req, res) => {
        try {
            const payments = await db.collection('Payments').find({ EventID: req.params.EventID }).toArray();
            res.status(200).json(payments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    /**
    * @swagger
    * /payments/status/{Status}:
    *   get:
    *     summary: Vrne plačila po datumu transakcije
    *     parameters:
    *       - in: path
    *         name: Status
    *         schema:
    *           type: string
    *         required: true
    *         description: Status transakcije
    *     responses:
    *       200:
    *         description: Uspešen odziv s seznamom plačil po statusu
    *       500:
    *         description: Napaka na strežniku
    */
    router.get('/status/:Status', verifyToken, async (req, res) => {
        try {
            const payments = await db.collection('Payments').find({ Status: req.params.Status }).toArray();
            res.status(200).json(payments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};

   