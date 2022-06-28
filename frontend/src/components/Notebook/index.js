import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getNotes, addNote, editNote, deleteNote} from '../../store/note';
import NewNote from '../NewNoteModal';
import Note from '../Note';
import './Notebook.css';

function Notebook () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session?.user);
    const allNotes = useSelector(state => state?.note)
    const userNotes = Object.values(allNotes).filter(note => note?.author_id === sessionUser.id)
    const {notebookId} = useParams();
    const notebook = useSelector(state => state.notebook[notebookId]);
    const notebookNotes = userNotes.filter(note => note?.notebook_id == notebookId)


    const [showNewNote, setShowNewNote] = useState(false);
    const [note, setNote] = useState({});

    useEffect(() => {
        dispatch(getNotes({include: [{model: 'User'}]}));
    }, [dispatch]);

    return(
        <div className="notebook">
            <div className="Notebook-sidebar">
                <div className="Notebook-sidebar-header">
                    <h1>{notebook?.title}</h1>
                    <button onClick={() => setShowNewNote(!showNewNote)}>+</button>
                </div>

            {
                notebookNotes.map(note => (
                    <div key={note?.id}>
                        <button onClick={e => setNote(note)}>{note?.title}</button>
                    </div>))
            }
            </div>
            <div className="Notebook-main">
                {showNewNote && <NewNote notebookId={notebookId} setShowNewNote={setShowNewNote}/>}
                {Object.keys(note).length > 0 && <Note note={note} setNote={setNote}/>}
            </div>
        </div>
    )
}

export default Notebook;
