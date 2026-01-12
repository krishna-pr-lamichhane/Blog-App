const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lamichhane2060_db_user:9y2vZ0XfmKRjxXy8@blogapp.8ynujdh.mongodb.net/?appName=blogapp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
