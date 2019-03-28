const express = require('express');
const router = express.Router();
const fs = require('fs');
const 


router.get("/", (req, res) => {
  res.send("working")
})



module.exports = router;