/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/', (req, res) => {
  const { firstName, lastName, email } = req.body;
  console.log(firstName, lastName, email);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
