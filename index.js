const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./route/authroute');
const userroute =require("./route/userroute");
const jobroute =require("./route/jobroute")
const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/bifob')
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/', (req, res, next) => {
  res.send('Hello Biftu');
});

app.use(express.json());
app.use('/', authRoute);
app.use('/',userroute);
app.use('/job',jobroute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});