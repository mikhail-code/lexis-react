import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'; 

const NotePage = () => {
    let params = useParams();
    let noteId = params.id
    let [note, setNote] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        let response = await fetch(`/api/notes/${noteId}/`)
        console.log(response)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async () => {
      fetch(`/api/notes/${noteId}/update/`,{
        method: "PUT",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(note)
      })
    }

    let handleSubmit = () => {
      updateNote() //handle click
      navigate('/') //get user back to home page
    }
  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit}/>
            </Link>
          </h3>
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} defaultValue={note?.body}>{note?.body}</textarea> 
    </div>
    //note?.body - if we have note?.body then pass it if not, then dont
    //on each key pressed when updating our area we call for setNote method to update note object, it's body specifically
  )
}

export default NotePage