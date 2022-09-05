const AuthorModel = require("../models/authorModel");


const createAuthor = async function (req, res) {
    try {
        let author = req.body

        if (Object.keys(author).length == 0) {
            res.status(400).send({ msg: "Please Provide Data", error: "Body can't be Empty" })
        }

        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({ data: authorCreated })

    }

    catch (err) {
        res.status(500).send({msg : "Server Error", error : err.message})

    }
};

const getAuthorsData = async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({ data: authors })
};

module.exports.createAuthor = createAuthor;
module.exports.getAuthorsData = getAuthorsData;
