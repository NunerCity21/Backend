const fs = require('fs').promises;

const readFile = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

const writeFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = { readFile, writeFile };
