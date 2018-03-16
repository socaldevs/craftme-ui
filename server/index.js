const express = require('express');
const path = require('path');

const app = express();

//app.get('/', (req, res) => res.send('hello from ui server index!!!'));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(8080, () => console.log('listening on 8080'));