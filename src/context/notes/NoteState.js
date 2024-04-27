import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial);

  
  //Get all Notes
  const getNotes = async () => {
    //TODO : API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')},
    }); 
    const json = await response.json();
    setnotes(json);
  }


  //Add a note
  const addNote = async (title, description, tag) => {
        //TODO : API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')          },
          body: JSON.stringify({title, description, tag}),
        }); 
        const note = await response.json();
        console.log(note)
        setnotes(notes.concat(note));
        console.log("Adding a new Note");
  };        

  //Update a note
  const updateNote = async (note) => {
        const {id, etitle : title, edescription: description, etag: tag} = note;
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')          },
          body: JSON.stringify({title, description, tag}),
        });
        const json = await response.json();
        
        let newNotes = JSON.parse(JSON.stringify(notes));
        console.log(newNotes)
        // logic to edit in client side
        for (let i = 0; i < newNotes.length; i++) {
          if (newNotes[i]._id === id) {
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
            break;
          }
        }
        console.log(newNotes)
        setnotes(newNotes);
  };

  //Delete a note
  const deleteNote = async (note) => {
    console.log(note._id);
    const response = await fetch(`${host}/api/notes/deletenote/${note._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')      },
    });
    const json = await response.json();
    console.log(json);
    console.log("Deleting the note of id" + note._id);
    // getNotes();

    const newNotes = notes.filter((Note)=>{return Note._id !== note._id});
    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, updateNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState
