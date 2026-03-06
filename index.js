const express = require("express");
const { connectDB } = require("./connect");
const urlRoutes = require("./routes/url");

const URL = require("./models/url");

const app = express();
const PORT = 3000;

connectDB("mongodb://localhost:27017/urlShortener")
  .then(() => {
    console.log("Database connected successfully 🚀");
  })
  .catch((err) => {
    console.error("Database connection error 🤨:", err);
  });

app.use(express.json());
app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
