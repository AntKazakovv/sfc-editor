const fs = require('fs');

module.exports = (req, res) => {
  try {
    const data = req.body;
    fs.writeFileSync('src/template.xml', data, 'utf8');
    res.send('Template updated successfully');
  } catch (e) {
    console.log('====== ERROR =======');
    console.error(e);
    res.status(500).send('Failed to update the template');
  }
}
