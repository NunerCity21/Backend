const express = require('express');

const app = express();

app.use((req, res,  next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.use((req, res,  next) => {
    res.cookie("mycookie", "myvalue", { httpOnly: true, maxAge: 10000});
    next();
});

app.get("/", (req, res) => {
    res.cookie("mycookie", "myvalue", { httpOnly: true});
    res.cookie("cookie2", "myvalue2");
    res.send("Hello World");
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

