import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getNotes, addNote, editNote, deleteNote} from '../../store/note';
import {getNotebooks} from '../../store/notebook';
import NewNoteModal from '../NewNoteModal';
import './Home.css';

function Home () {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state?.session?.user);
    const allNotes = useSelector(state => state?.note)
    const userNotes = Object.values(allNotes).filter(note => note?.author_id === sessionUser?.id)
    const allNotebooks = useSelector(state => state?.notebook)
    const userNotebooks = Object.values(allNotebooks).filter(notebook => notebook?.author_id === sessionUser?.id)

    useEffect(() => {
        dispatch(getNotes({include: [{model: 'User'}]}));
    }, [dispatch]);

    return(
        <div className="home">
            <div className='img-container'>
                <img src='https://wallpaperaccess.com/full/1282257.jpg' alt="notebook"/>
            </div>
            <div className='select-notebooks'>
                {sessionUser ? userNotebooks.slice(0,5).map(notebook => (
                    <div key={notebook?.id}>
                        <button onClick={e => {
                            history.push(`/notebooks/${notebook?.id}`)
                        }
                        }>{notebook?.title}</button>
                    </div>
                )) : <div className='logine-signup-prompt'>
                    <p>Welcome to PwrNote, please login or create an account to continue</p>
                </div>}
            </div>
        </div>
    )
}

export default Home;
