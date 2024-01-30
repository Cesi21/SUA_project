const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;


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
    const collection = db.collection('Seje');
    /**
    * @swagger
    * /seje:
    *   get:
    *     summary: Vrne seznam vseh sej
    *     responses:
    *       200:
    *         description: Uspešen odziv s seznamom sej
    *       500:
    *         description: Napaka na strežniku
    */
    router.get('/', verifyToken, async (req, res) => {
        try {
            const seje = await db.collection('Seje').find().toArray();
            res.status(200).json(seje);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    /**
    * @swagger
    * /seje/prijave:
    *   get:
    *     summary: Vrne seznam vseh Prijav na seje
    *     responses:
    *       200:
    *         description: Uspešen odziv s seznamom prijav sej
    *       500:
    *         description: Napaka na strežniku
    */
    router.get('/prijave', verifyToken, async (req, res) => {
        try {
            const seje = await db.collection('PrijavaSeje').find().toArray();
            res.status(200).json(seje);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    
    /**
    * @swagger
    * /seje/prijave/{id_user}:
    *   get:
    *     summary: Vrne seznam vseh Prijav na seje
    *     responses:
    *       200:
    *         description: Uspešen odziv s seznamom prijav sej
    *       500:
    *         description: Napaka na strežniku
    */
    router.get('/prijave/:id_user', verifyToken, async (req, res) => {
        try {
            const seje = await db.collection('PrijavaSeje').find({ id_user: req.params.id_user}).toArray();
            res.status(200).json(seje);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


    /**
    * @swagger
    * /seje/title/{title}:
    *   get:
    *     summary: Vrne sejo po Naslovu
    *     parameters:
    *       - in: path
    *         name: title
    *         schema:
    *           type: string
    *         required: true
    *         description: MongoDB Naslov seje
    *     responses:
    *       200:
    *         description: Uspešen odziv s sejo
    *       404:
    *         description: Seja ni bila najdena
    *       500:
    *         description: Napaka na strežniku
    */

    router.get('/title/:title', verifyToken, async (req, res) => {
        try {
            const seja = await db.collection('Seje').findOne({ title: req.params.title});
            if (!seja) {
                return res.status(404).json({ error: 'Seja ni bila najdena' });
            }
            res.status(200).json(seja);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    
    /**
    * @swagger
    * /seje/location/{location}:
    *   get:
    *     summary: Vrne sejo po lokaciji
    *     parameters:
    *       - in: path
    *         name: location
    *         schema:
    *           type: string
    *         required: true
    *         description: MongoDB lokaciji seje
    *     responses:
    *       200:
    *         description: Uspešen odziv s sejo
    *       404:
    *         description: Seja ni bila najdena
    *       500:
    *         description: Napaka na strežniku
    */

    router.get('/location/:location', verifyToken, async (req, res) => {
        try {
            const seja = await db.collection('Seje').findOne({ location: req.params.location});
            if (!seja) {
                return res.status(404).json({ error: 'Seja ni bila najdena' });
            }
            res.status(200).json(seja);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


    /**
    * @swagger
    * /seje/organizer/{organizer}:
    *   get:
    *     summary: Vrne sejo po lokaciji
    *     parameters:
    *       - in: path
    *         name: organizer
    *         schema:
    *           type: string
    *         required: true
    *         description: MongoDB lokaciji seje
    *     responses:
    *       200:
    *         description: Uspešen odziv s sejo
    *       404:
    *         description: Seja ni bila najdena
    *       500:
    *         description: Napaka na strežniku
    */

    router.get('/organizer/:organizer', verifyToken, async (req, res) => {
        try {
            const seja = await db.collection('Seje').findOne({ organizer: req.params.organizer});
            if (!seja) {
                return res.status(404).json({ error: 'Seja ni bila najdena' });
            }
            res.status(200).json(seja);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });



    /**
    * @swagger
    * /seje:
    *   post:
    *     summary: Dodajanje nove seje
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - title
    *               - description
    *               - location
    *               - start
    *               - end
    *               - organizer
    *               - contact
    *             properties:
    *               title:
    *                 type: string
    *               description:
    *                 type: string
    *               location:
    *                 type: string
    *               start:
    *                 type: string
    *               end:
    *                 type: string
    *               organizer:
    *                 type: string
    *               contact:
    *                 type: string
    *     responses:
    *       201:
    *         description: Seja uspešno dodana
    *       500:
    *         description: Napaka na strežniku
    */
    router.post('/', verifyToken, async (req, res) => {
        console.log("Uspešno dodan dokument");
        try {
            const newSeja = req.body;
            await db.collection('Seje').insertOne(newSeja);
            res.status(201).json(newSeja);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    /**
    * @swagger
    * /seje/prijave:
    *   post:
    *     summary: Dodajanje nove seje
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - title
    *               - description 
    *             properties:
    *               id_seje:
    *                 type: string
    *               id_user:
    *                 type: string
    *     responses:
    *       201:
    *         description: Seja uspešno dodana
    *       500:
    *         description: Napaka na strežniku
    */
    router.post('/prijave', verifyToken, async (req, res) => {
        console.log("Uspešno dodan dokument");
        try {
            const newSeja = req.body;
            await db.collection('PrijavaSeje').insertOne(newSeja);
            res.status(201).json(newSeja);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

     /**
    * @swagger
    * /seje/{title}:
    *   put:
    *     summary: Posodobitev obstoječe seje
    *     parameters:
    *       - in: path
    *         name: title
    *         schema:
    *           type: string
    *         required: true
    *         description: MongoDB ID seje
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               title:
    *                 type: string
    *               description:
    *                 type: string
    *               location:
    *                 type: string
    *               start:
    *                 type: string
    *               end:
    *                 type: string
    *               organizer:
    *                 type: string
    *               contact:
    *                 type: string
    *                 description: Nov desc seje
    *     responses:
    *       200:
    *         description: Seja uspešno posodobljena
    *       404:
    *         description: Seja ni bilo najdena
    *       500:
    *         description: Napaka na strežniku
    */

    router.put('/:title', verifyToken, async (req, res) => {
        try {
            const updatedSeja = req.body;
            const result = await db.collection('Seje').replaceOne({ title: req.params.title }, updatedSeja);
            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: 'Seja ni bila najdena' });
            }
            res.status(200).json(updatedSeja);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


    /**
    * @swagger
    * /seje/{title}:
    *   delete:
    *     summary: Brisanje seje
    *     parameters:
    *       - in: path
    *         name: title
    *         schema:
    *           type: string
    *         required: true
    *         description: MongoDB Title plačila
    *     responses:
    *       200:
    *         description: Seja uspešno izbrisana
    *       404:
    *         description: Seja ni bila najdena
    *       500:
    *         description: Napaka na strežniku
    */

    router.delete('/:title', verifyToken, async (req, res) => {
        try {
            const result = await db.collection('Seje').deleteOne({ title: req.params.title });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Seja ni bila najdena' });
            }
            res.status(200).json({ message: 'Seja je bila uspešno izbrisana' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};

   