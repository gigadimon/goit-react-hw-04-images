import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [requestValue, setRequestValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (requestValue.trim() === '') {
      return Notify.info('Запрос не может быть пустым');
    }
    onSubmit(requestValue);

    setRequestValue('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          value={requestValue}
          onChange={event => setRequestValue(event.target.value)}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
