const yaml = require('js-yaml');
const fs   = require('fs');

function getConfig(configPath) {
  try {
    const doc = yaml.load(fs.readFileSync(configPath, 'utf8'));

    return doc;
  } catch (e) {
    throw new Error(`Failed to load config: ${e}`);
  }
}

module.exports = getConfig;
