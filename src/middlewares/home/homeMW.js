module.exports = ({ twiteModel }) => {
  return (req, res, next) => {
    const errors = {
      title: "",
      twite: "",
    };

    const { title, twite } = req.body;
    const values = {
      title,
      twite,
      isLogedInUser: false,
      twites: [],
    };

    if (res.locals.user) {
      values.isLogedInUser = res.locals.user.email;
    }

    const twites = twiteModel.find();

    values.twites = twites
      .map((t) => ({
        ID: t.ID,
        title: t.title,
        email: t.email,
        author: t.email !== values.isLogedInUser ? t.author : "me",
        twite: t.twite,
        time: new Date(t.time).toLocaleString(),
      }))
      .reverse((x) => x.time);

    console.table(values.twites);

    return res.render("pages/home", { values, errors });
  };
};
