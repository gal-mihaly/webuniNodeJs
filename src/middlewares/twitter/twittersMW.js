module.exports = ({ userModel }) => {
  return (req, res, next) => {
    const values = {
      twitters: [],
      isLogedInUser: false,
    };

    if (res.locals.user) {
      values.isLogedInUser = res.locals.user.email;
    }

    values.twitters = userModel.find().map(
      (u) =>
        ({
          ID: u.ID,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
        } || [])
    );

    console.table(values.twitters);
    return res.render("pages/twitters", { values });
  };
};
