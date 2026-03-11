const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./connect");
// const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 3000;

connectDB("mongodb://localhost:27017/urlShortener")
  .then(() => {
    console.log("Database connected successfully 🚀");
  })
  .catch((err) => {
    console.error("Database connection error 🤨:", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url",restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.use(checkForAuthentication);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

// const express = require("express");
// const { connectDB } = require("./connect");

// const urlRoutes = require("./routes/url");
// const userRoutes = require("./routes/user");

// const { restrictToLoggedInUsersOnly, checkAuthentication } = require("./middlewares/auth");

// const URL = require("./models/url");
// const cookieParser = require("cookie-parser");

// const app = express();
// const PORT = 3000;

// connectDB("mongodb://localhost:27017/urlShortener")
//   .then(() => {
//     console.log("Database connected successfully 🚀");
//   })
//   .catch((err) => {
//     console.error("Database connection error 🤨:", err);
//   });

// app.set("view engine", "ejs");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use("/url", restrictToLoggedInUsersOnly, urlRoutes);
// app.use("/user", userRoutes);
// app.use("/",checkAuthentication, staticRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
