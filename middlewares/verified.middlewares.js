exports.isVerified = async (req, res, next) => {

  if (!req.user) {
    res.redirect('/login');
  }
  console.log(req.user);
  if (req.user.status === "unlock") next();
  else {
    res.render('verify-request', { link: `${process.env.DOMAIN}/verify`, layout: 'emptyLayout' })
  }

}
