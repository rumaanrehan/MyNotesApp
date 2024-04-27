import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const {note, editNote} = props;

    return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
              <div className="d-flex align-item-center">
                    <h5 className="card-title">{note.title}</h5>
                    <div className="align-item-left">
                    <i className="fa-solid fa-trash mx-3" 
                        onClick={()=>{deleteNote(note); 
                                      props.showAlert("Deleted Successfully", "success");}}
                    ></i>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>{editNote(note)}}></i>
                    </div>  
              </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    </div>
  )
}

export default NoteItem


