const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('Database Connection Failed', error);
    process.exit(1);
  }
};
console.log("Loaded URI:", process.env.MONGO_URI);

module.exports = connectDB;
