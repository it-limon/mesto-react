import PropTypes from 'prop-types';

function FormField(props) {
  const name = props.name;

  return (
    <label className='form__field'>
      <input className='form__input' id={name} {...props} />
      <span className={`form__input-error ${name}-error`}></span>
    </label>
  );
}

FormField.defaultProps = {
  required: true
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool
};

export default FormField;
