const express = require('express');
const fs = require('fs');
const { createHash } = require("crypto");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const tokenExpiryTime = 10; //seconds
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.text());
app.use(cookieParser());

const updateKey = process.env.UPDATE_KEY;
const getKey = process.env.GET_KEY;

function makeHash(key) {
    let salt = parseInt((Date.now()/1000)/tokenExpiryTime).toString();
    // let salt = "10";
    return createHash('sha256').update(key + salt).digest('hex').toString('base64');
}

function checkHash(given_key, stored_key) {
    if(stored_key === "null") {
        return true;
    }

    // console.log(`${given_key}\n${makeHash(stored_key)}`)

    return given_key === makeHash(stored_key);
}

app.post("/update", async(req, res) => {
    // console.log(req.cookies);
    if(!checkHash(req.cookies.updateAuth, updateKey)) {
        res.status(400);
        res.send("Invalid Key");
        return;
    }

    fs.writeFileSync("src/data.txt", req.body.toString());
    res.status(200);
    res.send("File Updated");
})


app.get("/", async(req, res) => {
    if(!checkHash(req.cookies.getAuth, getKey)) {
        res.status(400);
        res.send("Invalid Key");
        return;
    }        
    res.status(200);
    res.send(`"${fs.readFileSync("src/data.txt", {encoding: 'utf-8'})}"`);
});

app.listen(3000, () => console.log('SFS is listening on port 3000.'));