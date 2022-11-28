module.exports = ({ twiteModel, saveDB }) => {
  return (req, res, next) => {
    const { twiteId } = req.params;
    if (typeof twiteId === "undefined") {
      console.error("Argument null exception");
      return res.redirect("/500");
    }

    const twite = twiteModel.findOne({ ID: twiteId });
    if (!twiteId) {
      console.error("twite not founde");
      return res.redirect("/404");
    }

    const errors = {
      title: "",
      twite: "",
    };

    const values = {
      id: twite.ID,
      title: twite.title.trim(),
      twite: twite.twite.trim(),
    };

    return res.render("pages/edit", { values, errors });
  };
};
