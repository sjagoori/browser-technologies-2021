const express = require('express');
const router = express.Router();
const templateData = require('../templateData.json')
const fs = require('fs');
const formData = require('../formData.json');

router.get('/', async (req, res) => {
  console.log(req.fingerprint.hash)
  let renderData = formData.find(key=> key.hash == req.fingerprint.hash )
  
  return renderData 
  ? res.render('recurring', {templateData: templateData, hash: req.fingerprint.hash, recurring: renderData, vakken: templateData.vak.map(key => ({title: key.title, short: key.short}))}) 
  : res.render('index', { templateData: templateData, hash: req.fingerprint.hash, vakken: templateData.vak.map(key => ({title: key.title, short: key.short})) })
})

router.post('/saveProgress', (req, res) => {
  writeFile('formData.json', JSON.stringify([{ hash: req.fingerprint.hash, userData: req.body }]))
  res.redirect('/')
})


router.post('/handleEnquette', async (req, res) => {
  writeFile('formData.json', JSON.stringify([{ hash: req.fingerprint.hash, userData: req.body }]))
  
  // kijk of het compleet & valid is, anders error terug sturen

  res.redirect('/')
})


function writeFile(filename, content) {
  fs.writeFileSync(filename, content);
  console.log('✅ saved as:' + '\x1b[32m', filename);
}

module.exports = router;