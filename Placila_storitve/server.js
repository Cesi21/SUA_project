const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  
const { MongoClient, ServerApiVersion } = require('mongodb');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const paymentRoutes = require('./routes/payments');

const app = express();
const port = 11127;

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Payments API',
            version: '1.0.0',
            description: 'API za obdelavo plačil'
        },
    },
    apis: ['./routes/payments.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const uri = "mongodb+srv://cesi:2314@ptscluster.gkdlocr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
});

async function run() {
  try {
    await client.connect();
    console.log("Povezan z MongoDB");
    const db = client.db("suacesar2");

    app.use('/payments', paymentRoutes(db));

    app.listen(port, () => {
        console.log(`Strežnik teče na portu ${port}`);
    });
  } catch (err) {
    console.error('Napaka pri povezovanju z MongoDB:', err);
    process.exit(1);
  }
}

run().catch(console.dir);
