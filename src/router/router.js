const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")
const middleware = require ("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// author api
router.post("/authors",authorController.createAuthor);
router.post("/Login", authorController.Login)

// blog api
router.post("/createblog",middleware.authentication,blogController.blogcreate);
router.get("/getBlog",middleware.authorisation ,blogController.getBlog) // get blog by filter
// delete api
router.delete("/blog/:blogId",middleware.authentication,middleware.authorisation,blogController.deleteblog);
router.put("/updateBlog/:blogId",middleware.authentication,middleware.authorisation, blogController.updateBlog);
router.delete("/deletebyquery",middleware.authentication,middleware.authorisation,blogController.deleteByQuery)


module.exports = router;
