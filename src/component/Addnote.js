import React, { useState } from 'react'
import { useContext } from 'react';
import NoteContext from './context/NoteContext';
const Addnote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note,setnote] = useState({title:"",tag:"",description:""});
    const handleSubmit = (e)=>{
        
        e.preventDefault();
        addNote(note.title,note.tag,note.description);
    }
    const OnChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value});
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name='title'
              onChange={OnChange}
            />
            <div id="emailHelp" className="form-text">
            
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
             Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name='tag'
              onChange={OnChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="" className="form-label">
             Description
            </label>
            <textarea
              rows='3'
              className="form-control"
              id="description"
              name='description'
              onChange={OnChange}
            />
          </div>

          <div className="mb-3 form-check">
            
          </div>
          <button type="submit" className="btn btn-primary mb-3" >
            Submit
          </button>
        </form>
    </>
  )
}

export default Addnote;
