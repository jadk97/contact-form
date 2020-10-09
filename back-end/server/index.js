require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database.js");
const nodemailer = require('nodemailer');
const { check, body, validationResult } = require('express-validator');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());


app.post("/contact", [
  body("firstName").notEmpty().withMessage("You need to fill out the first name field."),
  check("firstName").isLength({ max: 25 }).withMessage("First name cannot exceed 25 characters."),
  body("lastName").notEmpty().withMessage("You need to fill out the last name field."),
  check("lastName").isLength({ max: 25 }).withMessage("Last name cannot exceed 25 characters."),
  body("email").notEmpty().withMessage("Please enter a valid email").isEmail().withMessage("Please enter a valid email."),
  check("email").isLength({ max: 50 }).withMessage("Email cannot exceed 50 characters."),
  body("message").notEmpty().withMessage("You need to fill out the message field."),
  check("message").isLength({ max: 500 }).withMessage("Your message cannot exceed 500 characters."),
],
  async (req, res) => {
    const errors = validationResult(req);
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "You need to fill out the contact form." });
    }
    else if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    try {
      const { firstName, lastName, email, message } = req.body;

      let transporter = nodemailer.createTransport({
        host: process.env.MAILHOST,
        port: process.env.MAILPORT,
        auth: {
          user: process.env.MAILUSER,
          pass: process.env.MAILPASSWORD
        }
      });


      let formattedMessage = message.replace(/(<([^>]+)>)/gi, "").replace(/\n/g, "<br />");

      let mailInfo = await transporter.sendMail({
        from: `${firstName} ${lastName} <${email}>`,
        to: process.env.MAILRECEIVER,
        subject: `Contact request from ${firstName} ${lastName}`,
        html: `<body>` +
          `<p>First name: ${firstName}</p>` +
          `<p>Last name: ${lastName}</p>` +
          `<p>Email: ${email}</p>` +
          `<p>Message: </p>` +
          `<p>${formattedMessage}</p>` +
          `</body>`
      });


      let contactForm = await db.query(`
    INSERT INTO messages(first_name, last_name, email, message) 
    VALUES ($1, $2, $3, $4)`, [firstName, lastName, email, message]);

      res.status(200).json({ message: "Contact form successfully submitted." });
    }
    catch (error) {
      res.status(500).send({ error: "Something went wrong. Please try resubmitting the contact form again later." })
    }
  });



app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`));