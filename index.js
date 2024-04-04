const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./route/authroute');

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});