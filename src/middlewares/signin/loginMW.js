/** handle login get */
module.exports = (req, res, next) => {
  if (typeof req.session?.sessionID == "undefined") {
    const errors = {
      email: "",
      password: "",
      loginFailed: "",
    };

    const values = {
      email: "",
      password: "",
    };

    return res.render("pages/signin", { values, errors });
  }
  return res.redirect("/home");
};
