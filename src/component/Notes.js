import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import contextValue from './context/NoteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
  const history = useNavigate();

  useEffect(()=>{
    console.log("I am is useeffect of redirect tum hamsj jaao");
    if(!localStorage.getItem("token")){
      console.log("aab trye huaa");
      history("/login");
  }
  },[])
  
  const context = useContext(contextValue);
  const { note, getAllNotes ,editNote} = context;
  const buttonref = useRef(null);
  const closeref = useRef(null);
  const [CurrentNote , setCurrentNote] = useState({id:"",etitle:"",etag:"",edescription:""});
  
const OnChange = (e)=>{
    setCurrentNote({...CurrentNote,[e.target.name]:e.target.value});
}

  useEffect(() => {
    getAllNotes();
  }, []);

  
  const UpdateNote = (currentNote) => {
    
    buttonref.current.click();
    setCurrentNote({id:currentNote._id,etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description});
    
   
  }

  const handleSubmit = (e)=>{
        
    e.preventDefault();
    closeref.current.click();
    editNote(CurrentNote.id,CurrentNote.etitle,CurrentNote.etag,CurrentNote.edescription);

   
}

  return (
    <>
      <Addnote></Addnote>

      <>
        {/* Button trigger modal */}
        <button
          type="button"
          ref={buttonref}
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit your Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {/* ================================================================= */}
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name='etitle'
                      value={CurrentNote.etitle}
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
                      id="etag"
                      name='etag'
                      value={CurrentNote.etag}
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
                      id="edescription"
                      name='edescription'
                      value={CurrentNote.edescription}
                      onChange={OnChange}
                    />
                  </div>

                  <div className="mb-3 form-check">

                  </div>
                 
                </form>

                {/* ===================================================================== */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={closeref}
                >
                  Close
                </button>
                
                <button type="submit" className="btn btn-primary" onClick={handleSubmit} >
                Save changes
                  </button>
              </div>
            </div>
          </div>
        </div>
      </>


      <div className='container'>
        <h2>
          Your note
        </h2>
        {note.map((note) => {
          return <Noteitem key={note._id} note={note} UpdateNote={UpdateNote} />;
        })}
      </div>
    </>
  )
}

export default Notes
