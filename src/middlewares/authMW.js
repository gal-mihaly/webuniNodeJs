module.exports = ({ userModel }) => {
  return (req, res, next) => {
    if (typeof req.session.sessionID == "undefined") {
      // return res.redirect('/login');
      return next();
    }

    const user = userModel.findOne({ ID: req.session.user.ID });
    if (user) {
      res.locals.user = user;
    }

    return next();
  };
};
