const express = require("express")
const app = express();
const port = 3000;
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello CodeSandbox!");
});

const webhookPay = []

app.get("/webhooks", (req, res) => {
  webhookPay.push(req.query)
  res.sendStatus(200)
  
});

app.get("/webhook", (req, res) => {
  res.json(webhookPay);
});

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
