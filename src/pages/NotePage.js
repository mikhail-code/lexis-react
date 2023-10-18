import React, {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'; 

const NotePage = () => {
    let params = useParams();
    let noteId = params.id
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async ()=>{
        let response = await fetch(`/api/notes/${noteId}/`)
        console.log(response)
        let data = await response.json()
        setNote(data)
    }
  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/">
            <ArrowLeft />
            </Link>
          </h3>
      </div>
      <textarea defaultValue={note?.body}>{note?.body}</textarea> 
    </div>
    //if we have note?.body then pass it if not, then dont
  )
}

export default NotePage