const validationValue = (data) => {
  if (typeof data.note !== 'number' || data.note === '') {
    console.error('Validation note failed');
    return 'The note value must be a number and cannot be empty';
  }

  if (typeof data.brand !== 'number' || data.brand === '') {
    console.error('Validation brand failed');
    return 'The brand value must be a number and cannot be empty';
  }
  
  if (typeof data.feedback !== 'string' || data.feedback === '') {
    console.error('Validation feedback failed');
    return 'The feedback value must be a string and cannot be empty';
  }

  if (typeof data.application !== 'string' || data.application === '') {
    console.error('Validation application failed');
    return 'The application value must be a string and cannot be empty';    
  }
};

module.exports = { validationValue };