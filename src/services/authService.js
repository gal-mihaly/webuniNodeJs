const { builtinModules } = require("module");

const validateUserCredential = async ({ email, password, userModel }) => {
  const user = userModel.findOne({ email: email, password: password });

  if (user == null) {
    return Promise.resolve({
      isValid: false,
      user: {},
    });
  }

  return Promise.resolve({
    isValid: true,
    user: {
      ID: user.ID,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
};

const authService = {
  validateUserCredential,
};

module.exports = authService;
