import { deleteNote } from '../../store/note';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DeleteNote ({note, setShowModal, setNote}) {
    const history = useHistory();
    const dispatch = useDispatch();
    // const note = useSelector(state => state.note[noteId]);

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(deleteNote(note?.id))
        setShowModal(false)
        setNote({})
        history.push(`/notebooks/${note?.notebook_id}`);
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <h2>Delete Note?</h2>
            <button type="submit">Yes</button>
        </form>
    )

}

export default DeleteNote;
