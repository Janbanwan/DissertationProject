const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const version = "v1";
const port = 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(`/api/${version}`, routes);

app.listen(port, () => console.log(`Listening on port ${port}!`));
