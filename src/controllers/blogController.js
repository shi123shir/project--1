const blogModel= require("../models/blogModel");
const authorModel = require("../models/authorModel")

const blogcreate = async function(req,res){
    try{
    let blog = req.body
    let authorid = blog.authorId
    if(Object.keys(blog).length==0){
        res.status(400).send({msg:"error", error:"bad request" })
    }
    if(!authorid){
        res.status(400).send({msg:"authorid mandatory",error:"please provide authroid"})
    }
    let checkid = await authorModel.findById(authorid)
    if(!checkid){
        res.status(404).send({status:false,msg:"author not found"})
    }
    let createblog = await blogModel.create(blog)
    res.status(201).send({data:createblog})
}
catch(err){
    res.status(500).send({msg:"server error",error:err})
}
}

 module.exports.blogcreate = blogcreate