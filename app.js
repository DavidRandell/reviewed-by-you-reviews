const express = require("express"),
  _handlebars = require("handlebars"),
  expressHandlebars = require("express-handlebars"),
  {
    allowInsecurePrototypeAccess,
  } = require("@handlebars/allow-prototype-access"),
  methodOverride = require("method-override");

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/public"));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride("_method"));

// INITIALIZE BODY-PARSER AND ADD IT TO APP

app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// MONGO DATABASE

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/reviewed-by-you", {
  useNewUrlParser: true,
});

const Review = mongoose.model("Review", {
  title: String,
  movieTitle: String,
});

// Export app for use in our Tests files
module.exports = app;

const reviews = require("./controllers/reviews")(app);

app.listen(port, () => {
  console.log("App listening on port " + port);
});
