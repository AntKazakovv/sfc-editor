const fs = require('fs');
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

const templatePath = './src/template.xml';

module.exports = (_req, res) => {
  try {
    const template = fs.readFileSync(templatePath, 'utf8');
    res.send(template);
  } catch (e) {
    console.log('====== ERROR =======');
    console.error(e);
    res.status(500).send('Failed to load the template');
  }
}
