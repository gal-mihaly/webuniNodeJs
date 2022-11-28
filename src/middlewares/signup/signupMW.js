/** handle registering get */
module.exports = (req, res, next) => {
  const errors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmed: "",
  };

  const values = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmed: "",
  };

  return res.render("pages/signup", { values, errors });
};
