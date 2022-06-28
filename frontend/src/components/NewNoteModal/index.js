import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addNote, getNotes} from '../../store/note';
import {useHistory} from 'react-router-dom';

function NewNote({setShowNewNote}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const {notebookId} = useParams();

    const userId = useSelector(state => state?.session?.user?.id);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const note = { author_id: userId, notebook_id: notebookId, title, body };
        console.log(note);
        dispatch(addNote(note))
        .then(history.push(`/notebooks/${notebookId}`))
        .then(setShowNewNote(false))
        .then(dispatch(getNotes({include: [{model: 'User'}]})));
    }

    return(
        <div className="new-note">
            <form className='content' onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
                <label>Body:</label>
                <textarea name="body" value={body} onChange={e => setBody(e.target.value)}></textarea>
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default NewNote;
