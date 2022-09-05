const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/authors",authorController.createAuthor)
 router.post("/createblog",blogController.blogcreate)
 router.get ("/getauthor",authorController.getAuthorsData)


module.exports = router;