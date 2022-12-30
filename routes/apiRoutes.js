const express = require("express");
const router = express.Router();
// To create the unique id
const uuid = require("uuid");
// db class
const db = require("../db/dbNotes.js")


// GET /api/notes from JSON and return all saved notes
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
    // Query parameter containing the id of a note to delete
    const noteToDelete = req.params.id;
    // Read all notes from the db.json
    const readAllNotes = await db.readNotes();
    // Remove the note with the given id property
    const noteWithId = readAllNotes.filter((note) => note.id !== noteToDelete);

    await db.deleteNotes(noteWithId);
    // rewrite the notes to the db.json
    return res.send(noteWithId);

});


module.exports = router;
