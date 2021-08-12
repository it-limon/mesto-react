import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import api from '../utils/api';

function Main(props) {
  const {
    onEditProfile,
    onAddCard,
    onEditAvatar,
    onCardClick
  } = props;

  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];
    Promise.all(promises)
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        setCards(
          initialCards.reverse().map(item => (
            <Card
              key={item._id}
              data={item}
              onCardClick={onCardClick}
            />
          ))
        );
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className='content'>
      <section className='profile'>
        <button className='profile__button-edit-avatar' type='button' aria-label='Обновить аватар' onClick={onEditAvatar}>
          <img className='profile__avatar' src={userAvatar} alt='Аватар' />
        </button>
        <div className='profile__info'>
          <div className='profile__container'>
            <h1 className='profile__name'>{userName}</h1>
            <button className='button profile__button-edit-profile' type='button' aria-label='Редактировать профиль' onClick={onEditProfile}></button>
          </div>
          <p className='profile__job'>{userDescription}</p>
        </div>
        <button className='button profile__button-add-card' type='button' aria-label='Добавить карточку' onClick={onAddCard}></button>
      </section>

      <section className='cards'>
        <ul className='cards__list'>
          {cards}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  onEditProfile: PropTypes.func.isRequired,
  onAddCard: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default Main;
