exports.isVerified = (req, res, next) => {
  if (req.user?.status === "unlock") next();
  else {
    res.render('verify-request', { link: `${process.env.DOMAIN}/verify`, layout: 'emptyLayout' })
  }
}
