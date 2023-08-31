import mongoose from "mongoose";

mongoose.connect(String(process.env?.MONGO_URI), {
    dbName: 'blogsite'
}).then((e) => {
    console.log('Successfully connected to Mongo');
});