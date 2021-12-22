/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/', (req, res) => {
  const { firstName, lastName, email } = req.body;
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://us20.api.mailchimp.com/3.0/lists/e740a474f0';

  const options = {
    method: 'POST',
    auth: 'kiricle1:2bf5b4818978d20f2f68ad2d12f3f378-us20',
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(`${__dirname}/success.html`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }

    response.on('data', (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post('/failure', (req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});

// API
// 2bf5b4818978d20f2f68ad2d12f3f378-us20
// e740a474f0
