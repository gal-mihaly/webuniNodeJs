const emailValidator = require("email-validator");

const authService = require("../../services/authService");

// ToDo: refactoring into service
const isValidSinginData = ({ values, errors }) => {
  let hasError = false;
  if (typeof values.email == "undefined" || values.email === "") {
    errors.email = "Email is required!";
    hasError = true;
  } else if (!emailValidator.validate(values.email.trim().toLowerCase())) {
    errors.email = "Invalid email!";
    hasError = true;
  }

  if (typeof values.password == "undefined" || values.password === "") {
    errors.password = "Password is required!";
    hasError = true;
  }
  return !hasError;
};

/** handle login post */
module.exports = ({ userModel, uuidv4 }) => {
  return async (req, res, next) => {
    const errors = {
      email: "",
      password: "",
      loginFailed: "",
    };
    const { email, password } = req.body;
    const values = {
      email,
      password,
    };

    if (!isValidSinginData({ values, errors })) {
      return res.render("pages/signin", { values, errors });
    }

    const { isValid, user } = await authService.validateUserCredential({
      email,
      password,
      userModel,
    });

    if (!isValid) {
      console.log("Login failed");
      errors.loginFailed = "Login failed!";
      values.password = "";
      return res.render("pages/signin", { values, errors });
    }

    req.session.sessionID = uuidv4();
    req.session.user = user;

    return req.session.save((err) => {
      if (err) {
        console.log(`Unable to sav session data. ${err.message}`);
        return res.redirect("/500");
      }

      console.log("Login success");
      return res.redirect("/home");
    });
  };
};
