const express = require("express");
const db = require("./DBConnect");
const app = express();
const port = 3000;
const https = require("https");
app.use(express.json());
const path = require("path");
const { listeners, listenerCount } = require("process");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

let webhookPay = [];
let fakedResponse = [];

app.post("/webhook", (req, res) => {
  webhookPay.push(req.body);
  res.sendStatus(200);
  console.log(webhookPay);
});

app.get("/webhook", (req, res) => {
  res.json(webhookPay);
});

app.get("/jsonData", (req, res) => {
  res.json(fakedResponse);
});

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});

const fetchDataFromAPI = () => {
  const options = {
    hostname: "jsonplaceholder.typicode.com", // Replace with the actual API hostname
    path: "/users", // Replace with the actual API path
    method: "GET", // HTTP method (GET, POST, etc.)
  };

  const req = https.request(options, (res) => {
    let data = "";

    // A chunk of data has been received.
    res.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    res.on("end", () => {
      try {
        fakedResponse = JSON.parse(data);

        fakedResponse = fakedResponse.map((transaction) => ({
          // ...transaction,
          id: transaction.id,
          name: transaction.name,
          username: transaction.username,
          date: "Dec 17th",
        }));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error); // Handle any errors
  });

  req.end(); // End the request
};

fetchDataFromAPI();
