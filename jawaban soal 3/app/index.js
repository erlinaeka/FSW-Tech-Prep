require('dotenv').config(); 

const express = require('express');
const routes = require('./routes/index.js');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const cors = require('cors');
// Connect database
mongoose.connect(mongoString);
const database = mongoose.connection;
// cek koneksi ke database sudah bisa atau error
database.on('error', (error) => console.log(error));
database.once('connected', () => console.log("Database Connected"));

const app = express();
app.use(express.json());
app.use(cors());
app.use('', routes);

app.listen(3000, ()=> {
    console.log("Sudah berjalan di port 3000");
});