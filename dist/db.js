//Include mongoose library
mongoose = require("mongoose");

const connect = DB_URL => {
  mongoose.connect(DB_URL); //Log an error if we fail to connect

  mongoose.connection.on("error", err => {
    console.error(err);
    console.log("MongoDB connection failed: " + DB_URL);
    process.exit();
  });
};

const close = () => {
  mongoose.connection.close();
};

module.exports = {
  connect,
  close
};