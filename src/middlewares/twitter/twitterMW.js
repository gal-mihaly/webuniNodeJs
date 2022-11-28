module.exports = ({ userModel, twiteModel }) => {
  return (req, res, next) => {
    const { twitterId } = req.params;
    if (typeof twitterId === "undefined") {
      console.error("unable to finde twitter");
      return res.redirect("/500");
    }

    const user = userModel.findOne({ ID: twitterId });
    if (user === null) {
      console.error("unable to finde user");
      return res.redirect("/500");
    }

    const twites = twiteModel.find({ email: user.email }) || [];

    const values = {
      owner: {
        ID: user.ID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      twites:
        twites.map((t) => ({
          ID: t.ID,
          title: t.title,
          twite: t.twite,
          author: t.author,
          email: t.email,
        })) || [],

      isLogedInUser: res.locals.user?.email || false,
    };

    console.log(values);

    return res.render("pages/twitter", { values });
  };
};
