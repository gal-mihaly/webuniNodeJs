/** handle forgot password post */
module.exports = ({ userModel, emailService }) => {
  return async (req, res, next) => {
    if (!userModel) {
      console.error("User collection not found");
      return res.redirect("/500");
    }

    const { email } = req.body;

    const user = userModel.findOne({ email: email?.trim().toLowerCase() });
    if (user) {
      const { firstName, lastName, email, password } = user;
      const messageBody = `Dear ${firstName} ${lastName}, Please find attached your credentials bellowe: email: ${email}, password: ${password}`;
      const message = {
        to: user.email,
        subject: "forgotton password",
        body: messageBody,
      };

      try {
        await emailService.sendEmail(message);
      } catch (error) {
        console.log(error.message);
        return res.redirect("pages/500");
      }
    }
    return res.redirect("/login");
  };
};
