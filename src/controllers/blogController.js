const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel")

const blogcreate = async function (req, res) {
    try {
        let blog = req.body
        let authorid = blog.authorId
        // --------------------------------------body must be present validation---------------------------------------------------------------------
        if (Object.keys(blog).length == 0) {
            res.status(400).send({ msg: "Error", error: "Provide Proper Data" })
        }
        // --------------------------------------------authorid validation-----------------------------------------------------------------------------
        if (!authorid) {
            res.status(400).send({ msg: "Error", error: "Please Provide authroid" })
        }
        if(!blog.title){
            return res.status(400).send({status:false,msg:"title must be pragent"})
        }
        if(!blog.tags){
            return res.status(400).send({status:false,msg:"tags must be pragent"})
        }
        if(!blog.category) {
            return res.status(400).send({status : false, msg:"category is required"})
        }
        
        let checkid = await authorModel.findById(authorid)
        if (!checkid) {
            res.status(404).send({ status: false, msg: "Author not found" })
        }

        let createblog = await blogModel.create(blog)
        res.status(201).send({ data: createblog })
    }

    catch (err) {
        res.status(500).send({ msg: "Server Error", error: err.message })
    }
};


//-------------------------------------------------PUT Api-------------------------------------//


const updateBlog = async function (req, res) {
    try{
        const updateBlog = await blogModel.findOneAndUpdate({blogId: req.params.id},{ 
            $set:{
                title: req.body.title,
                body: req.body.body,
                tags: req.body.tags,
                subcategory: req.body.subcategory
            }
        })
    return res.status(201).send({updateBlog})
    
}catch(err){

    res.status(404).send({ msg:"blog doesn't exist"})
}}

module.exports.blogcreate = blogcreate;
module.exports.updateBlog = updateBlog;
