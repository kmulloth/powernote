import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addNote} from '../../store/note';
import {useHistory} from 'react-router-dom';

function NewNote({setShowModal}) {
    const dispatch = useDispatch();

    const userId = useSelector(state => state?.session?.user?.id);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const note = { author_id: userId, notebook_id, title, body };

    return(
        <div>
            <h1>New Note</h1>
            {/* <form>
                <label>Title:</label>
                <input type="text" name="title" />
                <label>Body:</label>
                <textarea name="body"></textarea>
                <button type="submit">Submit</button>
            </form> */}
        </div>
    )
}

export default NewNote;
