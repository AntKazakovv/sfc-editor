const express = require('express');
const apiRouter = require('./src/routes/api');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors())
app.use(bodyParser.text({type:"*/*"}));
app.use('/api', apiRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
