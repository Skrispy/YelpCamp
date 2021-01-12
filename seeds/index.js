const mongoose = require('mongoose');
const cities = require('./cities')
const {places,descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", () => {
    console.log("Database Connected");
});
const sample = (array) => {
    return array[Math.floor(Math.random()*array.length)];
}
const seedDB = async () => {
    await Campground.deleteMany({});
    for (i =0; i <50;i++){
        const random = Math.floor(Math.random()*1000);
        const camp = new Campground ({
            location : `${cities[random].city}, ${cities[random].state}`,
            title : `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
    
}

seedDB().then(()=>{
    mongoose.connection.close();
})