const AuthorModel = require("../models/authorModel");


const createAuthor = async function(req, res){
    
    let author = req.body
    if(Object.keys(author).length == 0){
        res.status(400).send({msg:"error", error:"body must be pragent"})
    }
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({data: authorCreated})

};

const getAuthorsData = async function (req, res){

    let authors = await AuthorModel.find()
    

    res.send({data: authors})
};

module.exports.createAuthor = createAuthor;
module.exports.getAuthorsData = getAuthorsData;
