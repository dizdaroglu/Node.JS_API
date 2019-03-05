const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect('mongodb://movie_user:abc123@ds129926.mlab.com:29926/movie-api');
    mongoose.connection.on('open', () => {
        console.log("MongoDb: Connected");
    });
    mongoose.connection.on('error', (err) => {
        console.log("MongoDb: Connected ", err);
    });

    mongoose.Promise = global.Promise;
};
