import React, {useContext, useState} from 'react';

import NoteContext from "../context/notes/NoteContext";

const AddNotes = (props) => {
    
    const  context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setnote] = useState({title: "", description: "", tag: "general"});

    const handleAddClick =(e)=>{
        //call the addNote
        addNote(note.title, note.description, note.tag);
        //stops the default browser behaviour such as realoading on submit
        e.preventDefault(); 
        setnote({title: "", description: "", tag: ""});
        props.showAlert("Added Successfully", "success");

    }
    const onChange=(e)=>{
        //State: {description: "", tag: "", title: ""}
        setnote({...note, [e.target.name]: e.target.value});
    }
  return (
    <div>
        <h4>Add a note</h4>    
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">title</label>
          <input type="text" className="form-control" id="title" name="title" value = {note.title} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value = {note.description} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value = {note.tag} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleAddClick}> Add Note</button>
      </form>
    </div>
  )
}

export default AddNotes