import { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteNote from './DeleteNote';

function DeleteNoteModal({ note }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='delete-note' onClick={() => {
        setShowModal(true)
        }}><i className="fa-solid fa-trash fa-xs"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteNote setShowModal={setShowModal} note={note}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteNoteModal;
