module.exports = ({ twiteModel, saveDB }) => {
  return (req, res, next) => {
    const { twiteId } = req.params;

    if (typeof twiteId === "undefined") {
      return res.redirect("/home");
    }

    twiteModel.findAndRemove({ ID: twiteId });

    saveDB((err) => {
      if (err) {
        console.log("unable to remove twite", err);
        return res.redirect("/500");
      }

      console.log("twite has been deleted");
      res.redirect("/home");
    });
  };
};
