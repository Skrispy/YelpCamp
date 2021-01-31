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
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground ({
            location : `${cities[random].city}, ${cities[random].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            image : 'https://source.unsplash.com/collection/483251',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed praesentium esse veniam obcaecati quidem tempore voluptatum nisi saepe laboriosam consequatur neque odit, et nesciunt possimus pariatur nostrum ipsa deleniti cupiditate?',
            price
        })
        await camp.save();
    }
    
}

seedDB().then(()=>{
    mongoose.connection.close();
})