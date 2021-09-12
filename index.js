const express = require("express");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const bodyParser = require("body-parser");
const cors = require("cors");
var multer = require("multer");

var upload = multer();
const app = express();

let defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started at 5000");
});

app.use(
  cors({
    origin: "*",
    optionSuccesStatus: 200,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hii");
});

app.post("/sendMail", (req, res) => {
  const { name, email, subject, message } = req.body;

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent =
    "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
  sendSmtpEmail.textContent = message;
  sendSmtpEmail.sender = { name: "Tridot", email: "anasalam027@gmail.com" };
  sendSmtpEmail.to = [{ email: email, name: name }];

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      res.send("success");
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    (error) => {
      console.error(error);
    }
  );
});

app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  sendSmtpEmail.subject = `${name} Wants to Contact You!!`;
  sendSmtpEmail.htmlContent = `<html>
  <body>
  <h4 style={{marginBottom: 20, textAlign: 'center'}}>User Details</h4>
  <p style={{fontSize: 40, fontWeight: 500, marginBottom: 10}}>Full Name: ${name}</p>
  <p style={{fontSize: 40, fontWeight: 500, marginBottom: 10}}>Phone Number: ${phone}</p>
  <p style={{fontSize: 40, fontWeight: 500, marginBottom: 10}}>Email: ${email}</p>
  <p style={{fontSize: 40, fontWeight: 500, marginBottom: 10}}>Message: ${message}</p>
  </body>
  </html>`;
  sendSmtpEmail.textContent = `Name: ${name}
  Email: ${email},
  Phone: ${phone},
  Message: ${message}`;
  sendSmtpEmail.sender = {
    name: "Contact",
    email: "tridot.official@gmail.com",
  };
  sendSmtpEmail.to = [{ email: "anasalam027@gmail.com", name: "Anas" }];

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      res.send("success");
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    (error) => {
      console.error(error);
      console.log("er");
      res.status(error.status);
      res.send(error);
    }
  );
});

app.post("/support", (req, res) => {
  const { name, email, phone, comments } = req.body;

  sendSmtpEmail.subject = `${name} Have Some Clarification!!`;
  sendSmtpEmail.htmlContent = "";
  sendSmtpEmail.textContent = `Name: ${name}
  Email: ${email},
  Phone: ${phone},
  Comments: ${comments}`;
  sendSmtpEmail.sender = { name: "Contact", email: "contact@clicktridot.com" };
  sendSmtpEmail.to = [{ email: "anasalam027@gmail.com", name: "Anas" }];

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      res.send("success");
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    (error) => {
      console.error(error.message);
    }
  );
});

app.post("/orderSuccessfull", (req, res) => {
  const { orderId, email, name } = req.body;

  sendSmtpEmail.subject = "Tridot Order Summary";
  // sendSmtpEmail.htmlContent = `<html><body><h3>Your order was successfull, Total Amount: ${total}, Items: ${items}</h3></body></html>`;
  sendSmtpEmail.htmlContent = `<html><body
>
  <h2>Your Order was successful</h2>
  <h4>${orderId} - this is your Order ID and you can view your order at this link</h4>
  <a href="https://clicktridot.com/orders/${orderId}">https://clicktridot.com/orders/${orderId}</a>
</body></html>`;
  sendSmtpEmail.textContent = "Sucesss";
  sendSmtpEmail.sender = { name: "Contact", email: "contact@clicktridot.com" };
  sendSmtpEmail.to = [{ email: email, name: name }];

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      res.send("success");
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    (error) => {
      console.error(error);
      res.send(error);
    }
  );
});
