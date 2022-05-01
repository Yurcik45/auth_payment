require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();

app.use(express.json({ extended: true }));
app.use(cors());
app.use('/api/v0', require('./routes/index'));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("it is auth_payment backend"));

app.listen(PORT, () => console.log(`-- server started on port ${PORT} --`));
