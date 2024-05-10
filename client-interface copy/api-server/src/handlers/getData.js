const fs = require('fs');

const dataPath = './src/component_data.json';

module.exports = (_req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  res.json(data);
}
