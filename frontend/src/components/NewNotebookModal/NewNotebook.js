import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotebook, getNotebooks } from "../../store/notebook";

function NewNotebook({setShowModal}) {
    const dispatch = useDispatch();

    const author_id = useSelector(state => state.session.user.id);
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#ffffff");

    const handleSubmit = e => {
        e.preventDefault();
        const notebook = { author_id, title, color };

        dispatch(addNotebook(notebook))
            .then(() => {
                dispatch(getNotebooks());
            })
        setShowModal(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>New Notebook</h2>
            <label>Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>Color:
                <input type="color" value={color} onChange={e => setColor(e.target.value)} />
            </label>
            <input type="submit" value="Add Notebook" />
        </form>
    )
}

export default NewNotebook;
