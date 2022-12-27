const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route 1:  Get All the note  using : Get "/api/notes/fetchallnotes"  .   login required 

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

// Route 2:  Add new  note  using : Post "/api/notes/addnote"  .   login required 

router.post('/addnote', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Enter Description atleast 5 charchter').isLength({ min: 5 }),], async (req, res) => {

        // if threr are error it return bad request
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const notes = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await notes.save()
            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }
    })

// Route 3: Update an existin  note  using : put "/api/notes/updatenote".login required 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // creat a newNote Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        // Find the note to be updated and Update It
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

// Route 4: Delete an existin  note  using : Post "/api/notes/deletenote".login required 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delted and delted It
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        // Allow deletion only if user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Sucess": "Note has been deleted", note: note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }

})
module.exports = router