const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection;

db.on('connected', function () {
    console.log(`Mongoose connected to:${db.host}:${db.port}`);
});

module.exports = {
    db
}