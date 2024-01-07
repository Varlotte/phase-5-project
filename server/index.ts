import express from "express";
import { join } from "path";

//instantiating a new app
const app = express();
//sets 3000 as default port but you can also pass in a specific one in an env variable
const port = process.env.PORT || 3000;

app.use(express.static(join(__dirname, "..", "client", "build")));

// api routes TBD

// for all other routes, return to the index so the SPA routing can handle it
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
