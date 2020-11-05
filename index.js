const express = require('express');
const app = express();
const cors = require('cors');

const { saveRandom, guess } = require('./utilities.js')

app.use(express.json()); // to parse  request.body
app.use(cors());


app.get('/',(req,res)=>saveRandom(req,res));
app.get('/restart',(req,res)=>saveRandom(req,res));
app.post('/guess',(req,res)=>guess(req,res));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));