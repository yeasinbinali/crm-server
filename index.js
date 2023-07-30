const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require("dotenv").config();

const uri =
  `mongodb+srv://${process.env.CRM_ADMIN}:${process.env.CRM_PASSWORD}@cluster0.xzrro3e.mongodb.net/?retryWrites=true&w=majority`;

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
    const depositCollection = client.db("crm-admin").collection("deposit");
    const expenseCollection = client.db("crm-admin").collection("expense");
    const transferCollection = client.db("crm-admin").collection("transfer");
    const invoiceCollection = client.db("crm-admin").collection("invoice");
    const quoteCollection = client.db("crm-admin").collection("quote");
    const paymentCollection = client.db("crm-admin").collection("payment");
    const noticeCollection = client.db("crm-admin").collection("notice");
    const recruitmentCollection = client
      .db("crm-admin")
      .collection("recruitment");
    const financeCollection = client.db("crm-admin").collection("finance");
    const accountCollection = client.db("crm-admin").collection("account");
    const humanResourceCollection = client
      .db("crm-admin")
      .collection("humanResource");
    const InformationTechCollection = client
      .db("crm-admin")
      .collection("informationTech");

    // customers
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

    // deposit
    app.get("/deposit", async (req, res) => {
      const query = {};
      const cursor = depositCollection.find(query);
      const deposit = await cursor.toArray();
      res.send(deposit);
    });
    app.post("/deposit", async (req, res) => {
      const deposit = req.body;
      const result = await depositCollection.insertOne(deposit);
      res.send(result);
    });

    // expenses------------------------------
    app.get("/expense", async (req, res) => {
      const query = {};
      const cursor = expenseCollection.find(query);
      const expense = await cursor.toArray();
      res.send(expense);
    });
    app.post("/expense", async (req, res) => {
      const expense = req.body;
      const result = await expenseCollection.insertOne(expense);
      res.send(result);
    });

    // transfer-----------------------------
    app.get("/transfer", async (req, res) => {
      const query = {};
      const cursor = transferCollection.find(query);
      const transfer = await cursor.toArray();
      res.send(transfer);
    });
    app.post("/transfer", async (req, res) => {
      const transfer = req.body;
      const result = await transferCollection.insertOne(transfer);
      res.send(result);
    });

    // invoice
    app.get("/invoice", async (req, res) => {
      const query = {};
      const cursor = invoiceCollection.find(query);
      const invoice = await cursor.toArray();
      res.send(invoice);
    });
    app.post("/invoice", async (req, res) => {
      const invoice = req.body;
      const result = await invoiceCollection.insertOne(invoice);
      res.send(result);
    });

    // quote
    app.get("/quote", async (req, res) => {
      const query = {};
      const cursor = quoteCollection.find(query);
      const quote = await cursor.toArray();
      res.send(quote);
    });
    app.post("/quote", async (req, res) => {
      const quote = req.body;
      const result = await quoteCollection.insertOne(quote);
      res.send(result);
    });
    app.get("/quote/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await quoteCollection.findOne(query);
      res.send(result);
    });
    app.put("/quote/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const quote = req.body;
      const options = { upsert: true };
      const quoteUpdated = {
        $set: {
          name: quote.name,
          subject: quote.subject,
          amount: quote.amount,
          entry: quote.entry,
          expired: quote.expired,
        },
      };
      const result = await quoteCollection.updateOne(
        filter,
        quoteUpdated,
        options
      );
      res.send(result);
    });

    // payment
    app.get("/payment", async (req, res) => {
      const query = {};
      const cursor = paymentCollection.find(query);
      const payment = await cursor.toArray();
      res.send(payment);
    });
    app.post("/payment", async (req, res) => {
      const payment = req.body;
      const result = await paymentCollection.insertOne(payment);
      res.send(result);
    });
    app.get("/payment/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await paymentCollection.findOne(query);
      res.send(result);
    });
    app.put("/payment/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const payment = req.body;
      const options = { upsert: true };
      const paymentUpdated = {
        $set: {
          invoice: payment.invoice,
          date: payment.date,
          account: payment.account,
          amount: payment.amount,
        },
      };
      const result = await paymentCollection.updateOne(
        filter,
        paymentUpdated,
        options
      );
      res.send(result);
    });

    // notice board
    app.get("/notice", async (req, res) => {
      const query = {};
      const cursor = noticeCollection.find(query);
      const notice = await cursor.toArray();
      res.send(notice);
    });
    app.post("/notice", async (req, res) => {
      const notice = req.body;
      const result = await noticeCollection.insertOne(notice);
      res.send(result);
    });
    app.get("/notice/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await noticeCollection.findOne(query);
      res.send(result);
    });
    app.put("/notice/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const notice = req.body;
      const options = { upsert: true };
      const noticeUpdated = {
        $set: {
          title: notice.title,
          publishedDate: notice.publishedDate,
          description: notice.description,
          publishedBy: notice.publishedBy,
        },
      };
      const result = await noticeCollection.updateOne(
        filter,
        noticeUpdated,
        options
      );
      res.send(result);
    });

    // recruitment
    app.get("/recruitment", async (req, res) => {
      const query = {};
      const cursor = recruitmentCollection.find(query);
      const recruitment = await cursor.toArray();
      res.send(recruitment);
    });
    app.post("/recruitment", async (req, res) => {
      const recruitment = req.body;
      const result = await recruitmentCollection.insertOne(recruitment);
      res.send(result);
    });
    app.get("/recruitment/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await recruitmentCollection.findOne(query);
      res.send(result);
    });
    app.put("/recruitment/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const recruitment = req.body;
      const options = { upsert: true };
      const recruitmentUpdated = {
        $set: {
          title: recruitment.title,
          designation: recruitment.designation,
          vacancy: recruitment.vacancy,
          lastDate: recruitment.lastDate,
          status: recruitment.status,
        },
      };
      const result = await recruitmentCollection.updateOne(
        filter,
        recruitmentUpdated,
        options
      );
      res.send(result);
    });

    // finance
    app.get("/finance", async (req, res) => {
      const query = {};
      const cursor = financeCollection.find(query);
      const finance = await cursor.toArray();
      res.send(finance);
    });
    app.post("/finance", async (req, res) => {
      const finance = req.body;
      const result = await financeCollection.insertOne(finance);
      res.send(result);
    });
    app.get("/finance/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await financeCollection.findOne(query);
      res.send(result);
    });
    app.put("/finance/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const finance = req.body;
      const options = { upsert: true };
      const financeUpdated = {
        $set: {
          name: finance.name,
          designation: finance.designation,
        },
      };
      const result = await financeCollection.updateOne(
        filter,
        financeUpdated,
        options
      );
      res.send(result);
    });

    // account
    app.get("/account", async (req, res) => {
      const query = {};
      const cursor = accountCollection.find(query);
      const account = await cursor.toArray();
      res.send(account);
    });
    app.post("/account", async (req, res) => {
      const account = req.body;
      const result = await accountCollection.insertOne(account);
      res.send(result);
    });
    app.get("/account/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await accountCollection.findOne(query);
      res.send(result);
    });
    app.put("/account/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const account = req.body;
      const options = { upsert: true };
      const accountUpdated = {
        $set: {
          name: account.name,
          designation: account.designation,
        },
      };
      const result = await accountCollection.updateOne(
        filter,
        accountUpdated,
        options
      );
      res.send(result);
    });

    // human resource
    app.get("/humanResource", async (req, res) => {
      const query = {};
      const cursor = humanResourceCollection.find(query);
      const hr = await cursor.toArray();
      res.send(hr);
    });
    app.post("/humanResource", async (req, res) => {
      const hr = req.body;
      const result = await humanResourceCollection.insertOne(hr);
      res.send(result);
    });
    app.get("/humanResource/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await humanResourceCollection.findOne(query);
      res.send(result);
    });
    app.put("/humanResource/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const hr = req.body;
      const options = { upsert: true };
      const hrUpdated = {
        $set: {
          name: hr.name,
          designation: hr.designation,
        },
      };
      const result = await humanResourceCollection.updateOne(
        filter,
        hrUpdated,
        options
      );
      res.send(result);
    });

    // information technology
    app.get("/informationTechnology", async (req, res) => {
      const query = {};
      const cursor = InformationTechCollection.find(query);
      const it = await cursor.toArray();
      res.send(it);
    });
    app.post("/informationTechnology", async (req, res) => {
      const it = req.body;
      const result = await InformationTechCollection.insertOne(it);
      res.send(result);
    });
    app.get("/informationTechnology/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await InformationTechCollection.findOne(query);
      res.send(result);
    });
    app.put("/informationTechnology/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const it = req.body;
      const options = { upsert: true };
      const itUpdated = {
        $set: {
          name: it.name,
          designation: it.designation,
        },
      };
      const result = await InformationTechCollection.updateOne(
        filter,
        itUpdated,
        options
      );
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
