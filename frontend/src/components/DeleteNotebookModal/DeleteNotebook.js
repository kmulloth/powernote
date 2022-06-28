import { deleteNotebook } from '../../store/notebook';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DeleteNotebook ({notebookId}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const notebook = useSelector(state => state.notebook[notebookId]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(deleteNotebook(notebookId))
        history.push('/');
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <h2>Delete Notebook?</h2>
            <button type="submit">Yes</button>
        </form>
    )

}

export default DeleteNotebook;
