
const express = require('express')
const router = express.Router()

const data = require('./data')//.music
const results = require('./results')//.music

router.get('/', (req, res) => {
  //load main search page
  res.render('partials/form');
})

router.post('/', (req, res) => {

  let formInfo = req.body;// will include genre, mood, decade
  //formInfo.genre, formInfo.mood, formInfo.year
  //formInfo.year needs to be translated into a decade -- should be easy to do

  let result = data.find((element) => {
    return element.genre == formInfo.genre && element.year == formInfo.year
  });
  //overwrite to results.json
  //this is where the matching algorithm goes
  fs.writeFile('results.json', result, (err) => {
    if (err) throw err;
    //redirect to the page
    res.redirect('/results')
  })


})

router.get('/about', (req, res) => {
  //static about page
  res.render('partials/about')
})

router.get('/results', (req, res) => {
  //gets the results.json data and then forms the page off that
  res.render('partials/results', results)
})

module.exports = router