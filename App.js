const express = require('express')
const app = express()
const fetch = require('node-fetch')

app.listen('8001', (req, res)=>{
    console.log("running");
    res.send("hello");
})
