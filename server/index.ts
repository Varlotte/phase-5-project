import express from "express";
import { join } from "path";
import db from "./db";

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
app.get("/api/medications/:id", (req, res) => {
  res.send(`medicationID: ${req.params.id}`);
});
//GET medication by brand and generic name for search
app.get("/api/medications", (req, res) => {
  const query = req.query.q;
  res.send(`nameBrand or nameGeneric: ${query}`);
});

//GET for all conditions
app.get("/api/conditions", async (req, res) => {
  const conditions = await db.condition.findMany({
    orderBy: [{ id: "asc" }],
  });

  res.json(conditions);
});
//GET condition by ID for the tinder UI
app.get("/api/conditions/:id", (req, res) => {
  res.send(`conditionID: ${req.params.id}`);
});

// for all other routes, return to the index so the SPA routing can handle it
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
