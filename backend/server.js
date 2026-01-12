require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({origin: "http://localhost:5173"})); // frontend runs on 5173 and can connect with backend
app.use(express.json()); 

app.use("/api/auth", require("./routes/auth")); //backed url for auth routes
app.use("/api/blogs", require("./routes/blog"));

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
