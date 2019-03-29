
const express = require('express')
const router = express.Router()
const fs = require('fs')

const data = require('./data')//.music
let results = require('./results')//.music

router.get('/', (req, res) => {
  //load main search page
  res.render('partials/form');
})

router.post('/', (req, res) => {
  let formInfo = req.body;// will include genre, mood, decade
  //console.log(data.Music)
console.log(formInfo)
  
  //let result = 3;
  let result = data.Music.find((element) => {

    return element.Genre == formInfo.Genre && element.Decade == formInfo.Decade
  });
  console.log(result)
  // if theres no match then not pst stuff handle it
  if (result) {
    results = [];
    results.push(result);
    //overwrite to results.json
    fs.writeFile('results.json', JSON.stringify(results, null, 2), (err) => {
      if (err) throw err;
      //redirect to the page
      res.redirect('/results')
    })

  } else {
    fs.writeFile('results.json', JSON.stringify([], null, 2), (err) => {
      if (err) throw err;
      //redirect to the page
      res.redirect('/results')
    })
  }
  //  else {
  //   fs.writeFile('results.json', JSON.stringify([], null, 2), (err) => {
  //     if (err) throw err;
  //     //redirect to the page
  //     res.redirect('/results')
  //   })

  // }
//   fs.writeFile('results.json', "4", (err) => {
//     console.log(err);
//   })


})

router.get('/about', (req, res) => {
  //static about page
  res.render('partials/about')
})

router.get('/results', (req, res) => {
  //gets the results.json data and then forms the page off that
  res.render('partials/results', {results: results})
})

module.exports = router