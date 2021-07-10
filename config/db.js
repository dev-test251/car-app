const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/car-database", 

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected")) 
  .catch((err) => console.log("ERROR", err));
