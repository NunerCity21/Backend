const express = require('express');
const jwt = require('jsonwebtoken');
const { expressJwt } = require('express-jwt');

const secret = "hi";

const users = [
    {
        username: "asdf",
        password: "asdf"
    }
]

app.use 