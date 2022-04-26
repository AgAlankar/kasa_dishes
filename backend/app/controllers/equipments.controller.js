const Equipments = require("../models/equipments.model");

function create(req, res) {
    // Validate request
    if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    }
    const FID = req.body.FID;
    // Create a equipments
    let _equipments = {};
    _equipments.EID = req.body.EID;
    _equipments.EName = req.body.EName;
    const equipments = new Equipments(_equipments);
    // console.log(equipments);
    // Save equipments in the database
    Equipments.create(equipments, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the equipments."
            });
        else {
            // console.log(data);
            Equipments.madeUsing(FID, data.insertId);
            res.send({"ID" : data.insertId});
        }
    });
}

function findOne(req, res) {
    Equipments.findOne(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Equipment not found`});
                } else {
                    res.status(500).send({
                    message: "Error retrieving equipments"});
                }
        } else res.send(`Found ${data.EName}`);
    });
}
        
function findAll(req, res) {
    const title = req.query.title;
    Equipments.getAll(title, (err, data) => {
    if (err)
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving equipments."
        });
    else res.send(data);
    });
}

function delOne(req, res) {
    Equipments.remove(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Equipment not found`});
                } else {
                    res.status(500).send({
                    message: "Could not delete ingredient"});
                }
        } else res.send({ message: `ingredient was deleted successfully!` });
    });
}

function delAll(req, res) {
    Equipments.removeAll((err, data) => {
    if (err)
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all equipments."
        });
    else res.send({ message: `All equipments were deleted successfully!` });
    });
}

module.exports = { create, findAll, findOne, delOne, delAll};