const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./lib/db");
const bodyParser = require("body-parser");
var fs = require("fs");
const methodOverride = require("method-override");

const indexRouter = require("./routes");
const photo = require("./models/photo");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
