
const express = require('express')
const router = express.Router()
const fs = require('fs')

const data = require('./data')
let results = require('./results')

router.get('/', (req, res) => {
  res.render('partials/form');
})

router.post('/', (req, res) => {
  let formInfo = req.body;
    let result = data.Music.find((element) => {
      return element.Genre == formInfo.Genre && element.Decade == formInfo.Decade// && element.Mood == formInfo.Mood
  });
  if (result) {
    results = [];
    results.push(result);
    fs.writeFile('results.json', JSON.stringify(results, null, 2), (err) => {
      if (err) throw err;
      res.redirect('/results')
    })
  } else {
    if(result === undefined) {
      result = [];
    }
    fs.writeFile('results.json', JSON.stringify(result, null, 2), (err) => {
      if (err) throw err;
      res.redirect('/results')
    })
  }
})

router.get('/about', (req, res) => {
  res.render('partials/about')
})

router.get('/results', (req, res) => {
  fs.readFile('./results.json', (err, data_) => {
    console.log("over 9000", data_)
    if(err) throw err;
    res.render('partials/results', {results: data_})
  })
})

module.exports = router