import { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewNotebook from './NewNotebook';

function NewNotebookModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='new-notebook' onClick={() => {
        setShowModal(true)
        }}>Add Notebook</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewNotebook setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default NewNotebookModal;
