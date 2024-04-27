import React, {useContext, useEffect, useRef, useState} from 'react';
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';
import GetUser from './GetUser';

const Notes = (props) => {
    const  context = useContext(NoteContext);
    const { notes, getNotes, updateNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setnote] = useState({id: "",etitle: "", edescription: "", etag: "general"});
    const navigate = useNavigate();
    useEffect(()=>{ //fetch all the notes, doing it only one time
      if(localStorage.getItem('token')){
      getNotes();
      }else{
        navigate('/login');
      }
    }, []);
    
    const editNote = (currentNote)=>{
      ref.current.click();
      setnote({id : currentNote._id,
         etitle : currentNote.title,
          edescription : currentNote.description,
           etag : currentNote.tag});
    }

    const handleClick =(e)=>{
      console.log("Updating the note", note);
            //stops the default browser behaviour such as realoading on submit
      updateNote(note);
      refClose.current.click();
      props.showAlert("Updated Successfully", "success");

  }

   
    const onChange=(e)=>{
      //State: {description: "", tag: "", title: ""}
      setnote({...note, [e.target.name]: e.target.value});
    }

    return (
    <>
      <AddNotes showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
<button type="button" ref = {ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
      <div className="modal-body">

            <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={1} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
              </div>
            </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref = {refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button"  className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
      
    </div>
  </div>
</div>
  
        <div className="row my-3">
          {notes.length === 0 && <h3>No Notes Yet</h3>}
        {notes.map((note)=>{ //note is iterator over notes[] 
          return <NoteItem key={note._id} editNote={editNote} showAlertlert={props.showAlert} note = {note} />;
        })}
      </div>
      <GetUser/>
    </>
  )
}

export default Notes;