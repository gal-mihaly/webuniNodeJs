const emailService = {
  sendEmail: (message) => {
    console.log(`Sending email message:`, message);
    return Promise.resolve();
  },
};

module.exports = emailService;
