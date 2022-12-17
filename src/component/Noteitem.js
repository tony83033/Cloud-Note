import React from 'react';
import { useContext ,useEffect} from 'react';
import NoteContext from './context/NoteContext';
import { useNavigate } from 'react-router-dom';
const Noteitem = (props) => {

    const context = useContext(NoteContext);
    const {deleteNote,update} = context;
    
    const { note ,UpdateNote} = props;
    
    
    return (
        <>

<div className="card my-3">
  <div className="card-header">
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{UpdateNote(note)}}/>
    <i className="fa-regular fa-trash-can " onClick={()=>{deleteNote(note._id)}} />
  </div>
  <div className="card-body">
    <h5 className="card-title">
      {note.title}
    </h5>
    <p className="card-text">
      {note.description}
    </p>
    <a href="#" className="btn btn-primary">
      Go somewhere
    </a>
  </div>
</div>

        </>
    )
}

export default Noteitem;
