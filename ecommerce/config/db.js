const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.get('mongoDbURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database Connected!');
    } catch (error) {
        console.log(`DataBase connection fail`);
        process.exit(1);
    }
};

module.exports = connectDB;