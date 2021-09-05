const express = require("express");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../views");

const app = express();
const port = 3000;
app.set("view engine", "hbs");
app.set("views", viewsDir);
app.use(express.static(publicDir));
app.use(express.json());

require("./db/mongoose");

const CardModel = require("./models/cardModel");

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", async (req, res) => {
  try {
    const card = new CardModel(req.body);
    await card.save();
    console.log(card);
    res.status(201).send(card);
  } catch (err) {
    res.send({ err });
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
