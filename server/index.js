const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(8080, () => console.log('listening on 8080'));
