require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 6000;
const connectDB = require('./config/db');
const registerUser = require('./routes/api/registerUser');
const loginUser = require('./routes/api/loginUser');

const app = express();

//MongoDB Connection
connectDB().then(() => console.log('MongoDB Connected...'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', registerUser);
app.use('/api/user', loginUser);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));