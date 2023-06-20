const axios = require('axios');
const crypto = require("crypto");
require("dotenv").config();

let updateKey = process.env.UPDATE_KEY;
let getKey = process.env.GET_KEY;


let updateHash = crypto.createHash("sha256").update(updateKey + parseInt((Date.now()/1000)/10)).digest("hex").toString("base64")
let getHash =    crypto.createHash("sha256").update(getKey    + parseInt((Date.now()/1000)/10)).digest("hex").toString("base64")

let config = {
    withCredentials: true,
    headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Cookie: `getAuth=${getHash};updateAuth=${updateHash}`
    }
}

async function test() {
    let oldData = await axios.get("http://localhost:3000", config);
    oldData = oldData.data;

    console.log(`Old data: ${oldData}`);

    let newData = (Date.now()/1000).toString();

    await axios.post("http://localhost:3000/update", newData, config);

    let rawRetrievedData = await axios.get("http://localhost:3000", config);
    let retrievedData = rawRetrievedData.data;

    console.log(`New Data: ${newData} (${typeof newData})\nRetrieved Data: ${retrievedData} (${typeof retrievedData})`);

    if(retrievedData === newData) {
        console.log("New Data Written");
    } else {
        console.log("New data not written");
        console.log(`Found ${retrievedData} (${typeof retrievedData}) instead`);
    }

    if(newData === oldData) {
        print("Old data still remains present");
    }


    console.log("Rewriting old data...");

    await axios.post("http://localhost:3000/update", oldData, config);

    let newOldData = await axios.get("http://localhost:3000", config);
    newOldData = newOldData.data

    if(oldData === newOldData) {
        console.log("Old data rewritten");
    } else {
        console.log("Failed to rewrite old data.")
    }
}

test();

