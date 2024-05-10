const express = require('express');
const app = express();
const port = 3000;

const food = [];
const colors = [];

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/', (req, res) => {
    const food = req.body.foodInput; // Get the food input from the form
    const color = req.body.colorInput; // Get the color input from the form

    // Check if both food and color inputs are provided
    if () {
        // Push food and color pair to the array
        foodColors.push({ food, color });
        res.send(`Food: ${food}. Color: ${color}.`);
    } else {
        // If color input is missing, ask the user to provide it
        res.send(`Food: ${food}  |  Color: Unknown  |  Please Tell Me The Color.`);
    }
});

app.get('/', (req, res) => {
    // Serve the index.html file
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
