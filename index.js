const express = require('express');

const {PORT} = require('./config');
const routes = require('./src/routes');

const app = express();

app.use(express.json());
app.use('', routes);


app.listen(PORT, () => {
  console.log(`open server on http://localhost:${PORT}`);
});
