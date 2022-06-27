import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import fetchImages from 'queries/fetchImages';
import Button from '../Button';
import { ThreeDots } from 'react-loader-spinner';
import Modal from '../Modal';

import s from './App.module.css';

function App() {
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [requestValue, setRequestValue] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalId, setModalId] = useState('');
  const SECRET_KEY = '27409916-238dc54d0ca856be32d436daf';

  useEffect(() => {
    const ifResponceOk = data => {
      data.totalHits === 0 && Notify.failure('Ничего не найдено');
      if (page === 1) {
        setHits([...data.hits]);
        setTotalHits(data.totalHits);
        return;
      }
      setHits(prevState => [...prevState, ...data.hits]);
      return;
    };

    if (requestValue.trim()) {
      setLoading(true);
      fetchImages({
        requestValue: requestValue,
        secretKey: SECRET_KEY,
        page: page,
      })
        .then(ifResponceOk)
        .catch(Notify.failure)
        .finally(() => setLoading(false));
    }
  }, [requestValue, page]);

  useEffect(() => {
    totalHits !== 0 && Notify.success(`Найдено ${totalHits} картинок`);
  }, [totalHits]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, [hits]);

  useEffect(() => {
    if (hits.length !== 0 && hits.length === totalHits) {
      Notify.info('Загружены все картинки');
    }
  }, [hits, totalHits]);

  const toggleModal = (modalId = '') => {
    setModalId(modalId);
  };

  const handleSubmit = requestValue => {
    setRequestValue(requestValue);
    setPage(1);
  };

  return (
    <div className={s.container}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery hits={hits} openModal={toggleModal} />
      {Boolean(hits.length) && !loading && hits.length !== totalHits && (
        <Button changePage={() => setPage(prevState => prevState + 1)} />
      )}
      {loading && <ThreeDots color="#00BFFF" height={80} width={80} />}
      {modalId && (
        <Modal hits={hits} modalId={modalId} closeModal={toggleModal} />
      )}
    </div>
  );
}

export { App };
