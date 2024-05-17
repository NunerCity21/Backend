const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use = express.static('public');

app.get('/students?/:id', (req, res) => {
    res.send(`arrived ${process.env.STATUS} ${req.params.id}/n`);
});

app.get('/ab*cd', (req, res) => {
    res.send('Arrived!');
});

app.get('/.*fly$/', (req, res) => {
    res.send('Arrived!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});