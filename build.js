const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, '.', dir);
};

module.exports = {
  build(config, merge, webpack) {
    const localConfig = {};

    return merge(config, localConfig);
  }
};