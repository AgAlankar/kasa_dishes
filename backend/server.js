const express = require("express");
const cors = require("cors");
const dishroutes = require("./app/routes/dish.routes");
const ingredientsroutes = require("./app/routes/ingredients.routes");
const app = express();
const whitelist = ["http://localhost:3000"];
const corsOptions = {
    origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

dishroutes(app);
ingredientsroutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});
