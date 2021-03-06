const { Router } = require('express');
const router = Router();

const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller')

const {isAuthenticated} = require('../helpers/auth');

// CREATE NEW NOTE // 
router.get('/notes/add',isAuthenticated, renderNoteForm);
router.post('/notes/new-note',isAuthenticated, createNewNote);

// GET ALL NOTES // 
router.get('/notes',isAuthenticated, renderNotes);

// EDIT NOTE // 
router.get('/notes/edit/:id',isAuthenticated, renderEditForm);
router.put('/notes/edit/:id',isAuthenticated, updateNote);

// DELETE NOTE //
router.delete('/notes/delete/:id',isAuthenticated, deleteNote);


module.exports = router;