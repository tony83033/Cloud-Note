import React from "react";
import { useState } from "react";
import { json } from "react-router-dom";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const host = 'http://localhost:5000';
    let noteInitial = [];
    const  [note, setnote] = useState(noteInitial);
    const getAllNotes = async()=>{
      console.log("I am in get all notes");
      const responce = await fetch(`${host}/api/v1/notes/getallnotes`, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
      }  
      });
      const json =  await responce.json();
      setnote(json);
      console.log(json);
      
    }

    
    const editNote =  async(id,title,tag,description)=>{
     // http://localhost:3000/api/v1/notes/update/63544df0ec1b0fe4d45d1476
     

      const responce = await fetch(`${host}/api/v1/notes/update/${id}`, {
       // http://localhost:5000/api/v1/notes/update/637a2433597610f351b3bf5a
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
          
      },
      body: JSON.stringify({title,description,tag})

      });
      const json = await responce.json()
      console.log(json);

      let newNote = JSON.parse(JSON.stringify(note));
     for(let index = 0; index<newNote.length;index++){
       const element = newNote[index];
       if(element._id===id){
         console.log("find",element);
         newNote[index].title = title;
         newNote[index].tag = tag;
         newNote[index].description = description;
         
         break;
       }
     }
     setnote(newNote);

     
        
    }
    const deleteNote = async (id)=>{

      
      const responce = await fetch(`${host}/api/v1/notes/delete/${id}`, {
        method: 'delete',
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
      }  
      });
      
      const newNote = note.filter((note)=>{
        return note._id!==id;
      });
      setnote(newNote);
    }
    // Add new note 
    const addNote = async (title,description,tag)=>{
      console.log("Add note is working fine");

      const responce = await fetch(`${host}/api/v1/notes/addnote`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag})
      });

      console.log(responce);

      // const newNote ={
      //         "_id": "636c785e06dc3ac076fdcf24",
      //         "user": "6353060586ecb1ecc1742219",
      //         "title": title,
      //         "description": description,
      //         "tag": tag,
      //         "time": "2022-11-10T04:04:46.550Z",
      //         "__v": 0
      // } 
      // setnote(note.concat(newNote));
      getAllNotes();
      
    }
   
    return(
        <NoteContext.Provider value={{note,addNote,deleteNote,getAllNotes,editNote}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;