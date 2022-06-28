import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getNotes, addNote, editNote, deleteNote} from '../../store/note';
import NewNoteModal from '../NewNoteModal';
import './Home.css';

function Home () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session?.user);
    const allNotes = useSelector(state => state?.note)
    const userNotes = Object.values(allNotes).filter(note => note.author_id === sessionUser.id)

    useEffect(() => {
        dispatch(getNotes({include: [{model: 'User'}]}));
    }, [dispatch]);

    return(
        <div className="home">
            <h1>Notes</h1>

        {
            userNotes.map(note => (
                <div key={note?.id}>
                    <h2>{note?.title}</h2>
                    <p>{note?.body}</p>
                </div>))
        }
        </div>
    )
}

export default Home;
