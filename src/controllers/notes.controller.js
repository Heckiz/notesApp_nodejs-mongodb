const notesCtl = {};

const Note = require('../models/Note')

notesCtl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
}

notesCtl.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    newNote.user= req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes');
}

notesCtl.renderNotes = async (req, res) => {
    const notes = await Note.find({user:req.user.id}).sort({createdAt: 'desc'});
    res.render('notes/all-notes', { notes });
}

notesCtl.renderEditForm = async (req, res) => {
   const note = await Note.findById(req.params.id)
   if(note.user != req.user.id){
       req.flash('error_msg', 'Not Authorized');
       res.redirect('/users/signin');
   }
    res.render('notes/edit-note', { note })
}

notesCtl.updateNote = async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_msg', 'Note Update Successfully');
    res.redirect('/notes')
}

notesCtl.deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Delete Successfully');
    res.redirect('/notes')
}
module.exports = notesCtl;