const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'console error:'))
db.once('open', () => {
    console.log("Database Connected");
});

const app = express();
const port = 3000;


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))



app.get("/",(req,res)=>{
    res.render('home')
})

app.get("/makecampground", async (req,res)=>{
    const camp = new Campground({title:"Sister Bay Bluffs", price:400,description:"OHHHYEEEAAAHHHH"})
    await camp.save();
    res.send(camp);
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})