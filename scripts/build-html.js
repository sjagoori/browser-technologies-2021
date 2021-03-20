const ejs = require('ejs');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path')
const templateData = require('../templateData.json')

generateHomepage()

async function generateHomepage() {
  const html = renderTemplate('./views/index.ejs', templateData)
  writeFile('./dist', 'index.html', html)
}

function renderTemplate(templatePath, data) {
  const template = fs.readFileSync(templatePath, 'utf8').toString();
  return ejs.render(template, data, { views: [path.join(__dirname, '../', 'views')] })
}

async function writeFile(fileDirectory, filename, fileContents) {
  await fsPromises.mkdir(fileDirectory, { recursive: true });
  return await fsPromises.writeFile(path.join(fileDirectory, filename), fileContents);
}