module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    console.log(err.isJoi);
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const { code, message } = err;

  return res.status(code).json({ message });
};
