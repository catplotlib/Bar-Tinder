const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
