const express = require("express");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../views");

const app = express();
const port = 3000;
app.set("view engine", "hbs");
app.set("views", viewsDir);
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
