const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });
