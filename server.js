const express = require("express");
const app = express();
app.use(express.static("./dist/two-football-app"));
app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/two-football-app/" })
);
app.listen(process.env.PORT || 8080);
