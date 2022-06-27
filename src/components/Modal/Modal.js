import PropTypes from 'prop-types';
import { useEffect } from 'react';
import s from './Modal.module.css';

export default function Modal({ closeModal, hits, modalId }) {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  });

  const handleCloseModal = event => {
    (event.key === 'Escape' || event.target === event.currentTarget) &&
      closeModal();
  };

  return (
    <div className={s.overlay} onClick={handleCloseModal}>
      <div className={s.modal}>
        {hits.map(hit =>
          modalId === `${hit.id}` ? (
            <img
              src={hit.largeImageURL}
              alt={hit.tags}
              key={hit.id}
              className={s.image}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  hits: PropTypes.array.isRequired,
  modalId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
