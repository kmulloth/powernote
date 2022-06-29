import {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getNotes, addNote, editNote, deleteNote} from '../../store/note';
import NewNote from '../NewNoteModal';
import EditNote from '../EditNote';
import Note from '../Note';
import './Notebook.css';

function Notebook () {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state?.session?.user);
    const allNotes = useSelector(state => state?.note)
    const userNotes = Object.values(allNotes).filter(note => note?.author_id === sessionUser.id)
    const {notebookId} = useParams();
    const notebook = useSelector(state => state.notebook[notebookId]);
    const notebookNotes = userNotes.filter(note => note?.notebook_id == notebookId);


    const userId = useSelector(state => state?.session?.user?.id);
    const [showNewNote, setShowNewNote] = useState(false);
    const [showEditNote, setShowEditNote] = useState(false);
    const [note, setNote] = useState(notebookNotes[0]);


    useEffect(() => {

        console.log(note)
        dispatch(getNotes({include: [{model: 'User'}]}));

    }, [dispatch, setShowNewNote]);

    useEffect(() => {
        console.log(note)
        if (showNewNote || note?.notebook_id != notebookId) {
            setNote({});
        } else {
            setNote(notebookNotes[0]);
        }
    }, [showNewNote, notebookId]);

    return(
        <div className="notebook">
            <div className="Notebook-sidebar">
                <div className="Notebook-sidebar-header">
                    <h1>{notebook?.title}</h1>
                    <button onClick={() => setShowNewNote(!showNewNote)}  >+</button>
                </div>

            {
                notebookNotes.map(note => (
                    <div key={note?.id}>
                        <button onClick={e => {
                            setNote(note)
                            setShowNewNote(false)
                            }}>{note?.title}</button>
                    </div>))
            }
            </div>
            <div className="Notebook-main">
                {showNewNote && <NewNote notebookId={notebookId} setShowNewNote={setShowNewNote} />}
                {showEditNote&& <EditNote notebookId={notebookId} setShowEditNote={setShowEditNote} note={note} />}
                {note && <div className="Note">
                                <div className='content'>
                                    <div>
                                        <h1>{note?.title}</h1>
                                        <div className='note-buttons'>
                                            <button onClick={e => setShowEditNote(!showEditNote) } >Edit</button>
                                            <button>Delete</button>
                                        </div>
                                    </div>
                                    <p>{note?.body}</p>
                                </div>
                            </div>}
            </div>
        </div>
    )
}

export default Notebook;
