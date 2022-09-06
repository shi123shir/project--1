const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


<<<<<<< HEAD
router.post("/authors",authorController.createAuthor)
router.post("/createblog",blogController.blogcreate)
router.get ("/getauthor",authorController.getAuthorsData)
router.get("/getBlog", blogController.getBlog) // get blog by filter


=======
router.post("/authors", authorController.createAuthor)
router.post("/createblog", blogController.blogcreate)
router.delete("/blog/:blogId",blogController.deleteblog)
>>>>>>> cf0624d28c16f508626e7e695dea5dccb0499e5b
router.put("/updateBlog", blogController.updateBlog);
module.exports = router;