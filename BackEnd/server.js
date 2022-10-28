const express = require("express");
var mongoose = require("mongoose");
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081/"
};

mongoose.connect('mongodb+srv://weisman:1234@cluster0.0czqaho.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});


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
require('./routes/stocks.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});