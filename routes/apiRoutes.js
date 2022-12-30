const express = require("express");
const router = express.Router();
// To create the unique id
const uuid = require("uuid");
// GET /api/notes from db.json and return all saved notes
const db = require("../db/db.json");

// GET all notes
router.post("api/notes", async function (req, res) {
    const notes = await db.readNotes();
    return res.json(notes);
  });

// POST /api/notes | CREATE and save in req.body, db, and front end
router.post("/api/notes", async function (req, res) {
    const currentNotes = await db.readNotes();
    let newNote = {
       // add a unique id to note
      id: uuid(),
      title: req.body.title,
      text: req.body.text,
    };
    
    await db.addNote([...currentNotes, newNote]);
    //  return all saved notes as JSON
    return res.send(newNote);

});

// Bonus - DELETE /api/notes/:id via req.params.id
router.delete("/api/notes/:id", async function (req, res) {
    // GET | READ all notes from db.json
    const allNotes = req.params.id;
    // DELETE note with the id
    const noteWithId = await db.readNotes();
    // UPDATE | PUT notes in the db.json
    const updateNotes = noteWithId.filter((note) => note.id !== allNotes);

    await db.deleteNotes(updateNotes);
    // return the new note to the client
    return res.send(updateNotes);

});


module.exports = router;
