module.exports = ({ twiteModel, saveDB, uuidv4 }) => {
  return (req, res, next) => {
    if (!res.locals.user) {
      return res.redirect("/");
    }

    let hasError = false;
    const errors = {
      title: "",
      twite: "",
    };

    const { title, twite } = req.body;
    const values = {
      title: title.trim(),
      twite: twite.trim(),
      isLogedInUser: res.locals.user.email,
      twites: [],
    };

    if (typeof title === "undefined" || title.trim() === "") {
      errors.title = "Title is required!";
      hasError = true;
    }

    if (typeof twite === "undefined" || twite.trim() === "") {
      errors.twite = "Twite is required!";
      hasError = true;
    }

    if (hasError) {
      return res.render("pages/home", { values, errors });
    }

    const { firstName, lastName, email } = req.session.user;

    twiteModel.insert({
      ID: uuidv4(),
      author: `${firstName} ${lastName} - @${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      title: title.trim(),
      twite: twite.trim(),
      email: email.trim(),
      time: Date.now(),
    });

    return saveDB((err) => {
      if (err) {
        console.error("unable to save the new twite into db", err);
        return res.redirect("/500");
      }

      return res.redirect("/home");
    });
  };
};
