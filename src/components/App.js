import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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

  useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];

    Promise.all(promises)
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch(err => console.log(err));
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeCardLikeStatus(card._id, isLiked)
      .then(newCard => {
        setCards(cards => cards.map(currCard => currCard._id === card._id ? newCard : currCard));
      })
      .catch(err => console.log(err));
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(currCard => currCard._id !== card._id))
      })
      .catch(err => console.log(err));
  }

  const handleUpdateUser = ({name, about}) => {
    api.setUserInfo(name, about)
    .then(userInfo => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  const handleUpdateAvatar = (avatar) => {
    return api.setUserAvatar(avatar)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  const handleAddCard = ({name, link}) => {
    return api.addCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onEditProfile={handleButtonEditProfileClick}
        onAddCard={handleButtonAddCardClick}
        onEditAvatar={handleButtonEditAvatarClick}
        onCardClick={setSelectedCard}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isPopupProfileOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddCardPopup
        isOpen={isPopupCardOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddCard}
      />

      <EditAvatarPopup
        isOpen={isPopupAvatarOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
