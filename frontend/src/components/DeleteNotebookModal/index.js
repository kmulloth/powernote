import { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteNotebook from './DeleteNotebook';

function DeleteNotebookModal({ notebook }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='delete-notebook' onClick={() => {
        setShowModal(true)
        }}><i className="fa-solid fa-trash fa-xs"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteNotebook setShowModal={setShowModal} notebookId={notebook?.id}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteNotebookModal;
