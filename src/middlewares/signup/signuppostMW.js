const emailValidator = require("email-validator");

// ToDo: refactoring into service
const isValideSignupData = ({ values, errors }) => {
  let hasError = false;

  if (typeof values.firstName == "undefined" || values.firstName === "") {
    errors.firstName = "First name is required!";
    hasError = true;
  }

  if (typeof values.lastName == "undefined" || values.lastName === "") {
    errors.lastName = "Last name is required!";
    hasError = true;
  }

  if (typeof values.email == "undefined" || values?.email === "") {
    errors.email = "Email is required!";
    hasError = true;
  } else if (!emailValidator.validate(values?.email)) {
    errors.email = "Invalid email address!";
    hasError = true;
  }

  if (typeof values.password == "undefined" || values.password === "") {
    errors.password = "Password is required!";
    hasError = true;
  }

  if (
    typeof values.passwordConfirmed == "undefined" ||
    values.passwordConfirmed === "" ||
    values.passwordConfirmed !== values.password
  ) {
    errors.passwordConfirmed = "The password confirmation does not match!";
    hasError = true;
  }

  return !hasError;
};

/**handle registering post */
module.exports = ({ userModel, saveDB, uuidv4, emailService }) => {
  return (req, res, next) => {
    const { firstname, lastname, email, password, password_confirmed } =
      req.body;
    const values = {
      firstName: firstname ?? "",
      lastName: lastname ?? "",
      email: email?.trim().toLowerCase() ?? "",
      password: password ?? "",
      passwordConfirmed: password_confirmed ?? "",
    };

    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmed: "",
    };

    if (!isValideSignupData({ values, errors })) {
      return res.render("pages/signup", { values, errors });
    }

    if (!userModel) {
      console.error("User collection not found");
      return res.redirect("/500");
    }

    const user = userModel.findOne({ email: email?.trim().toLowerCase() });

    if (user) {
      errors.email = "Email address is allready registered!";
      return res.render("pages/signup", { values, errors });
    }

    userModel.insert({
      ID: uuidv4(),
      firstName: firstname,
      lastName: lastname,
      email,
      password,
    });

    return saveDB((err) => {
      if (err) {
        console.error("unable to save data", err);
        return res.redirect("/500");
      }

      emailService
        .sendEmail({
          to: email,
          subject: "you are signd up!",
          content: `Dear yuser, you are signed up successfull with password: ${password}`,
        })
        .then(() => {
          return res.redirect("login");
        })
        .catch((err) => {
          console.error("unable to register user");
          return res.redirect("/500");
        });
    });
  };
};
