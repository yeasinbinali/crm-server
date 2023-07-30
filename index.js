const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require("dotenv").config();

const uri =
  "mongodb+srv://crm-admin:oWCCnDE4ATQPgCLP@cluster0.xzrro3e.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const customersCollection = client.db("crm-admin").collection("customers");

    app.get("/customers", async (req, res) => {
      const query = {};
      const cursor = customersCollection.find(query);
      const customer = await cursor.toArray();
      res.send(customer);
    });
    app.post("/customers", async (req, res) => {
      const customers = req.body;
      const result = await customersCollection.insertOne(customers);
      res.send(result);
    });

  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("admin server running");
});

app.listen(port, () => {
  console.log("admin server running on port", port);
});