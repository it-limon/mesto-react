import { useState } from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import FormField from './FormField';

function AddPlacePopup(props) {
  const {
    isOpen,
    onClose,
    onAddCard
  } = props;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNameChange = (evt) => setName(evt.target.value);
  const handleLinkChange = (evt) => setLink(evt.target.value);

  const resetForm = () => {
    setName('');
    setLink('');
  }

  const handleClose = () => {
    resetForm();
    onClose();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddCard({ name,link })
      .then(() => resetForm());
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      name='card'
      title='Новое место'
      btnSubmitCaption='Создать'
    >
      <FormField type='text' name='card-name' value={name || ''} onChange={handleNameChange} placeholder='Название' minLength={2} maxLength={30} />
      <FormField type='url' name='card-link' value={link || ''} onChange={handleLinkChange} placeholder='Ссылка на картинку' />
    </PopupWithForm>
  );
}

AddPlacePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddCard: PropTypes.func.isRequired
};

export default AddPlacePopup;
