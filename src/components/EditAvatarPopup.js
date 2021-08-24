import { useRef } from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import FormField from './FormField';

function EditAvatarPopup(props) {
  const {
    isOpen,
    onClose,
    onUpdateAvatar
  } = props;

  const avatarRef = useRef();

  const handleClose = () => {
    avatarRef.current.value = '';
    onClose();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      name='avatar'
      title='Обновить аватар'
      btnSubmitCaption='Сохранить'
    >
      <FormField type='url' name='avatar-link' placeholder='Ссылка на аватар' ref={avatarRef} />
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateAvatar: PropTypes.func.isRequired
};

export default EditAvatarPopup;
