exports.verifyToken = (req, res) => {
  const { token } = req.params;
  console.log(token);
}
