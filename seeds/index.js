const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
  await Campground.deleteMany({});
  for(let i = 0; i < 300; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '5fb24243afa37908f04a0182',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/gdulik/image/upload/v1605517736/YelpCamp/ca6mxzpxxyobclysfiyr.jpg',
          filename: 'YelpCamp/gltnn5uoidomofxbxiwz'
        },
        {
          url: 'https://res.cloudinary.com/gdulik/image/upload/v1605517737/YelpCamp/a7olfkzmthfv3zybr0ev.jpg',
          filename: 'YelpCamp/mkmywhsm0azz2kviyrc7'
        }
      ],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptatem neque similique esse aut eaque, sunt necessitatibus, quia commodi illum et! Quidem enim amet maxime ut tenetur distinctio debitis quis.',
      price
    })
    await camp.save();
  }
};

seedDB()
  .then(() => {
    mongoose.connection.close();
  })