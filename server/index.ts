import express from "express";
import { join } from "path";

//instantiating a new app
const app = express();
//sets 3000 as default port but you can also pass in a specific one in an env variable
const port = process.env.PORT || 3000;

app.use(express.static(join(__dirname, "..", "client", "build")));

// api routes TBD

//these will all need auth:
//POST /login
//POST /logout
//POST /users (create new user)
//GET, PATCH, and DELETE /users/id
//POST and DELETE user faves, protected to only add faves to your own account
// DELETE fave but not if its not your account

//no auth needed:
//GET medications by id
//GET medication by brand and generic name for search

//GET for all conditions
//GET condition by ID for the tinder UI

// for all other routes, return to the index so the SPA routing can handle it
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
