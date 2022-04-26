const Ingredients = require("../models/ingredients.model");

function create(req, res) {
    // Validate request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }
    const FID = req.body.FID;
    // Create a ingredients
    let _ingredients = {};
    _ingredients.IID = req.body.IID;
    _ingredients.IName = req.body.IName;
    _ingredients.restrictions = req.body.restrictions;
    const ingredients = new Ingredients(_ingredients);
    // console.log(ingredients);
    // Save ingredients in the database
    Ingredients.create(ingredients, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the ingredients."
            });
        else {
            console.log(data);
            Ingredients.madeOf(FID, data.insertId);
            res.send(data.insertId);
        }
    });
}

function findOne(req, res) {
    Ingredients.findOne(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Ingredient not found`});
                } else {
                    res.status(500).send({
                    message: "Error retrieving ingredients"});
                }
        } else res.send(data.IName);
    });
}
        
function findAll(req, res) {
    const title = req.query.title;
    Ingredients.getAll(title, (err, data) => {
    if (err)
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving ingredients."
        });
    else res.send(data);
    });
}

function delOne(req, res) {
    Ingredients.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Ingredient not found`});
                } else {
                    res.status(500).send({
                    message: "Could not delete ingredient"});
                }
        } else res.send({ message: `ingredient was deleted successfully!` });
    });
}

function delAll(req, res) {
    Ingredients.removeAll((err, data) => {
    if (err)
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all ingredients."
        });
    else res.send({ message: `All ingredients were deleted successfully!` });
    });
}

module.exports = { create, findAll, findOne, delOne, delAll};