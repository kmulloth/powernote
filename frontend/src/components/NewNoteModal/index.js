import {useState} from 'react';
import { Modal } from '../../context/Modal';
import NewNote from './NewNote';

function NewNoteModal(){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='new-note' onClick={() => {
                setShowModal(true);
            }}>+</button>
            {showModal && (
                <Modal onClose={setShowModal(false)}>
                    <NewNote setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}

export default NewNoteModal;
