module.exports = ({ twiteModel, saveDB }) => {
  return (req, res, next) => {
    const { twiteId } = req.params;
    if (typeof twiteId === "undefined") {
      console.error("Argument null exception");
      return res.redirect("/500");
    }

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
      id: twiteId,
      title: title.trim(),
      twite: twite.trim(),
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
      return res.render("pages/edit", { values, errors });
    }

    const twiteInDb = twiteModel.findOne({ ID: twiteId });
    if (!twiteInDb) {
      console.error("Twite not found in db");
      return res.redirect("/500");
    }

    twiteInDb.title = title.trim();
    twiteInDb.twite = twite.trim();

    return saveDB((err) => {
      if (err) {
        console.error("Unable to save changes", err);
        return res.redirect("/500");
      }

      return res.redirect("/home");
    });
  };
};
