if (process.env.NODE_ENV === "NEVERproduction") {
  module.exports = require("./configureStore.prod");
} else {
  module.exports = require("./configureStore.dev");
}
