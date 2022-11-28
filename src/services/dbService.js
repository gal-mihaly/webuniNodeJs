const loki = require("lokijs");

module.exports = initDB = (cb) => {
  let db = new loki("mytwitter.db", {
    autosave: true,
    autosaveInterval: 4000,
  });

  return db.loadDatabase({}, (err) => {
    if (err) {
      console.log("unable to load database", err);
      return cb(err);
    }

    let userModel = db.getCollection("users");
    if (userModel === null) {
      userModel = db.addCollection("users", {
        indices: ["ID", "email"],
        unique: ["email"],
      });
    }

    let twiteModel = db.getCollection("twites");
    if (twiteModel === null) {
      twiteModel = db.addCollection("twites", {
        indecis: ["ID, user"],
        unique: ["ID"],
      });
    }

    db.saveDatabase((err) => {
      if (err) {
        console.error("unable to save db", err);
        return cb(err);
      }

      return cb(undefined, {
        userModel,
        twiteModel,
        saveDB: (cb) => {
          console.log("persisting data...");
          return db.saveDatabase(cb);
        },
      });
    });
  });
};
