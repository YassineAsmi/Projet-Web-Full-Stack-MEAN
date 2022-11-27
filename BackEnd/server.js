const express = require("express");
var mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const pdf = require("html-pdf");
const nodemailer = require('nodemailer');
const pdfTemplate = require('./documents/index.js')
    // const invoiceTemplate = require('./documents/invoice.js')
const emailTemplate = require('./documents/email.js')
mongoose.connect('mongodb+srv://weisman:1234@cluster0.0czqaho.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,

}
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/client.routes')(app);
require('./routes/distributor.routes')(app);
require('./routes/expenses.routes')(app);
require('./routes/invoice.routes')(app);


// NODEMAILER TRANSPORT FOR SENDING INVOICE VIA EMAIL
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})


var options = { format: 'A4' };
//SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', (req, res) => {
    const { email, company } = req.body
    console.log(email, company)

    // pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
    pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {

        // send mail with defined transport object
        transporter.sendMail({
            from: ` Accountill <yassine.asmi@gmail.com>`, // sender address
            to: `${email}`, // list of receivers
            replyTo: `${company.email}`,
            subject: `Invoice from ${company.businessName ? company.businessName : company.name}`, // Subject line
            text: `Invoice from ${company.businessName ? company.businessName : company.name}`, // plain text body
            html: emailTemplate(req.body), // html body
            attachments: [{
                filename: 'invoice.pdf',
                path: `${__dirname}/invoice.pdf`
            }]
        });

        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//CREATE AND SEND PDF INVOICE
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//SEND PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/invoice.pdf`)
})

// set port, listen for requests
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});