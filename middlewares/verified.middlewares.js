exports.isVerified = (req, res, next) => {
  console.log(req.user);
  if (req.user?.status === "unlock") next();
  else {
    res.render('verify-request', { link: `${process.env.DOMAIN}/verify`, layout: 'emptyLayout' })
  }
}
