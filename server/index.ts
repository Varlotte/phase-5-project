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
//GET, PATCH (to update email and password), and DELETE /users/id
//POST and DELETE user faves, protected to only add and delete faves to your own account

//no auth needed:
//GET medications by id
app.get("/api/medications/:id", async (req, res) => {
  try {
    const medication = await db.medication.findUniqueOrThrow({
      where: { id: parseInt(req.params.id) },
    });
    res.json(medication);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
});

//GET medication by brand and generic name for search
app.get("/api/medications", async (req, res) => {
  try {
    //holds user input
    const query = req.query.q as string;
    const result = await db.medication.findMany({
      //query matches nameBrand or nameGeneric
      where: {
        OR: [
          {
            nameBrand: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            nameGeneric: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            prescribedFor: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            class: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            sideEffects: {
              search: query,
            },
          },
        ],
      },
    });
    res.json(result);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
});

//GET for all conditions (fully implemented!)
app.get("/api/conditions", async (req, res) => {
  const conditions = await db.condition.findMany({
    orderBy: [{ id: "asc" }],
  });

  res.json(conditions);
});
//GET condition by ID for the tinder UI
app.get("/api/conditions/:id", async (req, res) => {
  try {
    const condition = await db.condition.findUniqueOrThrow({
      where: { id: parseInt(req.params.id) },
    });
    res.json(condition);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
});

// for all other routes, return to the index so the SPA routing can handle it
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
