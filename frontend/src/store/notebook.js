import { csrfFetch } from './csrf';

const GET_ALL_NOTEBOOKS = 'notes/GET_ALL_NOTEBOOKS';
const ADD_NOTEBOOK = 'notes/ADD_NOTEBOOK';
const UPDATE_NOTEBOOK = 'notes/UPDATE_NOTEBOOK';
const DELETE_NOTEBOOK = 'notes/DELETE_NOTEBOOK';

const getAllNotebooks = notebooks => {
    return {
        type: GET_ALL_NOTEBOOKS,
        payload: notebooks
    };
}

const addOneNotebook = notebook => {
    return {
        type: ADD_NOTEBOOK,
        payload: notebook
    }
}

const editOneNotebook = notebook => {
    return {
        type: UPDATE_NOTEBOOK,
        payload: notebook
    }
}

const deleteOneNotebook = id => {
    return {
        type: DELETE_NOTEBOOK,
        payload: id
    }
}

export const getNotebooks = () => async dispatch => {
    const response = await csrfFetch('/api/notebooks/all');

    if (response.ok) {
        const notebooks = await response.json();
        dispatch(getAllNotebooks(notebooks));
        return notebooks;
    }
}

export const addNotebook = notebook => async dispatch => {
    const response = await csrfFetch('/api/notebooks/new', {
        method: 'POST',
        body: JSON.stringify(notebook),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const newNotebook = await response.json();
        dispatch(addOneNotebook(newNotebook));
        return newNotebook;
    }
}

export const editNotebook = notebook => async dispatch => {
    const response = await csrfFetch(`/api/notebooks/${notebook.id}`, {
        method: 'PUT',
        body: JSON.stringify(notebook),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedNotebook = await response.json();
    dispatch(editOneNotebook(updatedNotebook));
}

export const deleteNotebook = id => async dispatch => {
    await csrfFetch(`/api/notebooks/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    dispatch(deleteOneNotebook(id));
}

const initialState = {}

const notebookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NOTEBOOKS:
          const allNotebooks = {}
            action.payload.forEach((event) => {
                if (event.id) allNotebooks[event.id] = event
            })
            return { ...allNotebooks }
        case UPDATE_NOTEBOOK:
            const newEditState = {
              ...state,
              [action.payload.notebook.id]: action.payload.notebook
            }
            // const eventList = newState.map(id => newState[id]);
            // eventList.push(action.payload)
            return newEditState

        case ADD_NOTEBOOK:

            const newAddState = {
              ...state,
              [action.payload.notebook?.id]: action.payload.notebook
            }
            // newState[action.payload.event.id]= action.payload
            // const eventList = newState.map(id => newState[id]);
            // eventList.push(action.payload)
            return newAddState
        case DELETE_NOTEBOOK:
          const newDeleteState = {...state}
          delete newDeleteState[action.payload]
          return newDeleteState

        default:
            return state;
    }
};

export default notebookReducer;
