import { useEffect, useState} from 'react';
import Card from './Card';
import FormField from './FormField';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';

function Main() {
  const [isPopupProfileOpen, setIsPopupProfileOpen] = useState(false);
  const [isPopupCardOpen, setIsPopupCardOpen] = useState(false);
  const [isPopupAvatarOpen, setIsPopupAvatarOpen] = useState(false);

  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();

  const [cards, setCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleButtonEditProfileClick = () => setIsPopupProfileOpen(true);
  const handleButtonAddCardClick = () => setIsPopupCardOpen(true);
  const handleButtonEditAvatarClick = () => setIsPopupAvatarOpen(true);

  const closeAllPopups = () => {
    setIsPopupProfileOpen(false);
    setIsPopupCardOpen(false);
    setIsPopupAvatarOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];
    Promise.all(promises)
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        setCard(
          initialCards.reverse().map(item =>
            <Card
              key={item._id}
              data={item}
              onCardClick={setSelectedCard}
            />
        ));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className='content'>
      <section className='profile'>
        <button className='profile__button-edit-avatar' type='button' aria-label='Обновить аватар' onClick={handleButtonEditAvatarClick}>
          <img className='profile__avatar' src={userAvatar} alt='Аватар' />
        </button>
        <div className='profile__info'>
          <div className='profile__container'>
            <h1 className='profile__name'>{userName}</h1>
            <button className='button profile__button-edit-profile' type='button' aria-label='Редактировать профиль' onClick={handleButtonEditProfileClick}></button>
          </div>
          <p className='profile__job'>{userDescription}</p>
        </div>
        <button className='button profile__button-add-card' type='button' aria-label='Добавить карточку' onClick={handleButtonAddCardClick}></button>
      </section>

      <section className='cards'>
        <ul className='cards__list'>
          {cards}
        </ul>
      </section>

      <PopupWithForm
        isOpen={isPopupProfileOpen}
        onClose={closeAllPopups}
        name='profile'
        title='Редактировать профиль'
        btnSubmitCaption='Сохранить'
      >
        <FormField type='text' name='profile-name' placeholder='Имя' minLength={2} maxLength={40} />
        <FormField type='text' name='profile-job' placeholder='О себе' minLength={2} maxLength={200} />
      </PopupWithForm>

      <PopupWithForm
        isOpen={isPopupCardOpen}
        onClose={closeAllPopups}
        name='card'
        title='Новое место'
        btnSubmitCaption='Создать'
      >
        <FormField type='text' name='card-name' placeholder='Название' minLength={2} maxLength={30} />
        <FormField type='url' name='card-link' placeholder='Ссылка на картинку' />
      </PopupWithForm>

      <PopupWithForm
        isOpen={isPopupAvatarOpen}
        onClose={closeAllPopups}
        name='avatar'
        title='Обновить аватар'
        btnSubmitCaption='Сохранить'
      >
        <FormField type='url' name='avatar-link' placeholder='Ссылка на аватар' />
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </main>
  );
}

export default Main;
