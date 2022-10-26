const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { findById, findByIdAndDelete } = require('../models/Notes');
// route 1 for fetching all the notes Login required
router.get('/getallnotes',fetchuser, async(req,res)=>{
    try {
       
        let notes = await Note.find({user: req.user.id});
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({error:"Internal server Error"});
    }
});

router.get('/addnote', fetchuser,
[
    body('title','Title must be atleast 5 char').isLength({min: 5}),
    body('description','Description must be atleast 7 char').isLength({min: 7})
]  
,async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {title,description,tag} = req.body;
    const notes = new Note({
        title,description,tag,user:req.user.id
    });
    const savenote = await notes.save();
    return res.status(200).json(savenote);
        
    } catch (error) {
        return res.status(500).json("Internal Server error");
    }
});

router.put('/update/:id', fetchuser, async (req,res)=>{
    try {
    const {title,description,tag} = req.body;
    let newNote = {};
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).json({error: "Not Found"});
    }

    if(note.user.toString() == req.user.id){
        
         note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote});
         
         return res.status(200).json(note);
    }else{
        return res.status(200).json({error:"Not allow"});
    }
}

    catch (error) {
        return res.status(500).json({error:"Internal Server Error"});
    }
});

router.delete('/delete/:id', fetchuser, async (req,res)=>{
    try {
        console.log("I am here")
        let note = await Note.findById(req.params.id);

       console.log(note);
        if(!note){
            return res.status(404).json({error: "Not Found"});
          
        }
        if(note.user.toString()==req.user.id){
            note = await Note.findByIdAndDelete(req.params.id);
            return res.status(200).json({message:"Note has been deleted"});
            
        }else{
            return res.status(401).json({error:"Not Allowed"});
        }
        
        

    } catch (error) {
        return res.status(500).json({error:"Internal Server Error of delete"});
    }
});

module.exports = router;