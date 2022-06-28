import { csrfFetch } from './csrf';

const GET_ALL_NOTES = 'notes/GET_ALL_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';

const getAllNotes = notes => {
    return {
        type: GET_ALL_NOTES,
        payload: notes
    };
}

const addOneNote = note => {
    return {
        type: ADD_NOTE,
        payload: note
    }
}

const editOneNote = note => {
    return {
        type: UPDATE_NOTE,
        payload: note
    }
}

const deleteOneNote = id => {
    return {
        type: DELETE_NOTE,
        payload: id
    }
}

export const getNotes = () => async dispatch => {
    const response = await csrfFetch('/api/notes/all');

    if (response.ok) {
        const notes = await response.json();
        dispatch(getAllNotes(notes));
        return notes;
    }
}

export const addNote = note => async dispatch => {
    const response = await csrfFetch('/api/notes/new', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const newNote = await response.json();
        dispatch(addOneNote(newNote));
        return newNote;
    }
}

export const editNote = note => async dispatch => {
    const response = await csrfFetch(`/notes/${note.id}`, {
        method: 'PUT',
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedNote = await response.json();
    dispatch(editOneNote(updatedNote));
}

export const deleteNote = id => async dispatch => {
    await csrfFetch(`/notes/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    dispatch(deleteOneNote(id));
}

const initialState = {}

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NOTES:
          const allNotes = {}
            action.payload.forEach((event) => {
                if (event.id) allNotes[event.id] = event
            })
            return { ...allNotes }
        case UPDATE_NOTE:
            const newEditState = {
              ...state,
              [action.payload.note.id]: action.payload.note
            }
            // const eventList = newState.map(id => newState[id]);
            // eventList.push(action.payload)
            return newEditState

        case ADD_NOTE:

            const newAddState = {
              ...state,
              [action.payload.note?.id]: action.payload.note
            }
            // newState[action.payload.event.id]= action.payload
            // const eventList = newState.map(id => newState[id]);
            // eventList.push(action.payload)
            return newAddState
        case DELETE_NOTE:
          const newDeleteState = {...state}
          delete newDeleteState[action.payload]
          return newDeleteState

        default:
            return state;
    }
};

export default noteReducer;
