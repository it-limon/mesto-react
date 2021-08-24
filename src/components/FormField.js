import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const FormField = forwardRef((props, ref) => {
  const name = props.name;

  return (
    <label className='form__field'>
      <input className='form__input' id={name} ref={ref} {...props} />
      <span className={`form__input-error ${name}-error`}></span>
    </label>
  );
});

FormField.defaultProps = {
  required: true
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool
};

export default FormField;
