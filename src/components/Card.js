import PropTypes from 'prop-types';

function Card(props) {
  const {
    name,
    link,
    likes
  } = props.data;

  const handleCardClick = () => {
    props.onCardClick({ name, link });
  }

  return (
    <li className='cards__item'>
      <img className='cards__image' src={link} alt={name} onClick={handleCardClick} />
      <h2 className='cards__title'>{name}</h2>
        <div className='cards__like-container'>
          <button className='cards__button-like' type='button' aria-label='Оценить'></button>
          <span className='cards__like-counter'>{likes.length}</span>
        </div>
      <button className='button cards__button-delete' type='button' aria-label='Удалить'></button>
    </li>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default Card;
