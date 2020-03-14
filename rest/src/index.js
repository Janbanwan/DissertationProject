const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();
app.use(cors());

const version = "v1";

app.use(express.json());
app.use(`/api/${version}`, routes);

const port = 8000;

app.listen(port, () => console.log(`Listening on port ${port}!`));
