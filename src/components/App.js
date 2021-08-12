import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import FormField from './FormField';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isPopupProfileOpen, setIsPopupProfileOpen] = useState(false);
  const [isPopupCardOpen, setIsPopupCardOpen] = useState(false);
  const [isPopupAvatarOpen, setIsPopupAvatarOpen] = useState(false);
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

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleButtonEditProfileClick}
        onAddCard={handleButtonAddCardClick}
        onEditAvatar={handleButtonEditAvatarClick}
        onCardClick={setSelectedCard}
      />
      <Footer />

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
    </>
  );
}

export default App;
