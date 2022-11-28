/** handle logout */
module.exports = (req, res, next) => {
  return req.session.destroy((err) => {
    if (err) {
      console.log("Failed to logout user!", error.message);
      return res.redirect("/500");
    }

    console.log("logout success");
    return res.redirect("/"); // will always fire after session is destroyed
  });
};
