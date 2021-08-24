import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import FormField from './FormField';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const {
    isOpen,
    onClose,
    onUpdateUser
  } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleNameChange = (evt) => setName(evt.target.value);
  const handleDescriptionChange = (evt) => setDescription(evt.target.value);

  const handleClose = () => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    onClose();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      name='profile'
      title='Редактировать профиль'
      btnSubmitCaption='Сохранить'
    >
      <FormField type='text' name='profile-name' value={name || ''} onChange={handleNameChange} placeholder='Имя' minLength={2} maxLength={40} />
      <FormField type='text' name='profile-job' value={description || ''} onChange={handleDescriptionChange} placeholder='О себе' minLength={2} maxLength={200} />
    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired
};

export default EditProfilePopup;
