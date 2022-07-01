import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addNote, getNotes} from '../../store/note';
import {useHistory} from 'react-router-dom';
import './NewNote.css'

function NewNote({setShowNewNote, dispatch}) {
    // const dispatch = useDispatch();
    const history = useHistory();
    const {notebookId} = useParams();

    const userId = useSelector(state => state?.session?.user?.id);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');


    const handleErrs = () => {

    }

    useEffect(() => {
        dispatch(getNotes({include: [{model: 'User'}]}));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const note = { author_id: userId, notebook_id: notebookId, title, body };
        console.log(note);
        dispatch(addNote(note))
        .then(setShowNewNote(false))
        .then(dispatch(getNotes({include: [{model: 'User'}]})))
        .then(history.push(`/notebooks/${notebookId}`))
    }

    return(
        <div className="new-note">
            <form className='content' onSubmit={handleSubmit}>
                <div className="new-note-title">
                    <label>Title:</label>
                    <input  type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
                    {!title && <p className="error">Title is required</p>}
                </div>
                <div className="new-note-body">
                    <div className='new-note-body-header'>
                        <label>Body:</label>
                        <button type="submit" disabled={title === ''}>Submit</button>
                    </div>
                    <textarea className='body' name="body" value={body} onChange={e => setBody(e.target.value)}></textarea>
                </div>
            </form>
        </div>
    )
}

export default NewNote;
