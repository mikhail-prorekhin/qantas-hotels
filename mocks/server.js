const express = require('express');
const hotels = require('./mock_hotel_data_with_picsum.json')
const app = express();
const port =  5000;
app.get('/api/hotels', (req, res) => {
  res.send(hotels);
});


app.listen(port, () => console.log(`Listening on port ${port}`));