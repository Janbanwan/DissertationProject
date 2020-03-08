const express = require("express");
const routes = require("./routes");

const app = express();

const version = "v1";

app.use(express.json());
app.use(`/api/${version}`, routes);

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}!`));
