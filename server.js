const express = require("express");
const app = express();

app.use(express.static("./dist/twofootball-app"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/twofootball-app/" })
);

app.listen(process.env.PORT || 8080);
