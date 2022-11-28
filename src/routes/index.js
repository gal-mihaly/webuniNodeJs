const express = require("express");

// services
const emailService = require("../services/emailService");

// moddlewares
const authMW = require("../middlewares/authMW");
const loginMW = require("../middlewares/signin/loginMW");
const loginpostMW = require("../middlewares/signin/loginpostMW");
const signuppostMW = require("../middlewares/signup/signuppostMW");
const signupMW = require("../middlewares/signup/signupMW");
const forgotMW = require("../middlewares/signin/forgotMW");
const forgotpostMW = require("../middlewares/signin/forgotpostMW");
const internalServerErrorMW = require("../middlewares/internalServErerrorMW");
const homeMW = require("../middlewares/home/homeMW");
const logoutMW = require("../middlewares/signout/logoutMW");
const pageNotFoundMW = require("../middlewares/pageNotFoundMW");
const twitepostMW = require("../middlewares/twite/twitepostMW");
const delTwiteMW = require("../middlewares/twite/delTwiteMW");
const editTwiteMW = require("../middlewares/twite/editTwiteMW");
const editTwitePostMW = require("../middlewares/twite/editTwitePostMW");
const twittersMW = require("../middlewares/twitter/twittersMW");
const twitterMW = require("../middlewares/twitter/twitterMW");

module.exports = router = ({ userModel, twiteModel, saveDB, uuidv4 }) => {
  let objectRepo = {
    userModel,
    twiteModel,
    saveDB,
    uuidv4,
    emailService,
  };

  const router = express.Router();

  router.get("/home", authMW(objectRepo), homeMW(objectRepo));

  router.get("/login", loginMW);
  router.post("/login", loginpostMW(objectRepo));

  router.get("/signup", signupMW);
  router.post("/signup", signuppostMW(objectRepo));

  router.get("/forgot", forgotMW);
  router.post("/forgot", forgotpostMW(objectRepo));

  router.get("/logout", authMW(objectRepo), logoutMW);

  router.post("/twite", authMW(objectRepo), twitepostMW(objectRepo));

  router.get(
    "/twites/edit/:twiteId",
    authMW(objectRepo),
    editTwiteMW(objectRepo)
  );
  router.post(
    "/twites/edit/:twiteId",
    authMW(objectRepo),
    editTwitePostMW(objectRepo)
  );

  router.get(
    "/twites/delete/:twiteId",
    authMW(objectRepo),
    delTwiteMW(objectRepo)
  );

  router.get("/twitters", authMW(objectRepo), twittersMW(objectRepo));
  router.get("/twitter/:twitterId", authMW(objectRepo), twitterMW(objectRepo));

  router.get("/500", internalServerErrorMW);
  router.get("/404", pageNotFoundMW);

  router.get("/", (req, res, next) => {
    return res.redirect("/home");
  });

  router.use(pageNotFoundMW);

  return router;
};
