const handleErrors = (err) => {
  if (!err.response) {
    return 'Something is wrong, please try again';
  } else if (err.response.status === 422) {
    return {
      status: 422,
      inputError: err.response.data.errors
    };
  } else if (err.response.status === 404) {
    return {
      status: 404,
      message: '404, not found'
    }
  } else {
    const {code, message, timestamp} = err.response.data;
    console.error(code, message, `time: ${timestamp}`);
    return {
      status: err.response.status,
      message

    }
  }
}

export default handleErrors;