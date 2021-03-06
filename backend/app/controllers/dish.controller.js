const Dish = require("../models/dish.model");
const Ingredients = require("../models/ingredients.model");

function create(req, res) {
  // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!",
        });
    }
    // Create a Dish
    let _dish = {};
    for (let field of Dish.fillableFields) {
        _dish[field] = req.body.dish[field];
    }
    const dish = new Dish(_dish);
    // console.log(dish);
    // Save Dish in the database
    Dish.create(dish, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Dish.",
        });
        else res.send(data);
    });
}

function findAll(req, res) {
    const title = req.query.title;
    Dish.getAll(title, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving dishes.",
        });
        else res.send(data);
    });
}

function findFiltered(req, res) {
    const filters = req.body.filters;
    Dish.getFiltered(filters, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving dishes.",
        });
        else res.send(data);
    });
}

function findOne(req, res) {
    Dish.findById(req.params.id, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Dish with id ${req.params.id}.`,
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Dish with id " + req.params.id,
            });
        }
        } else res.send(data);
    });
}
function findAllVeg(req, res) {
    Dish.getAllVeg((err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving dishes.",
        });
        else res.send(data);
    });
}

function update(req, res) {
  // Validate Request
    if (!req.body.field || !req.body.newVal) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    console.log(req.body);
    Dish.updateById(
        req.params.id,
        req.body.field,
        req.body.newVal,
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Dish with id ${req.params.id}.`,
            });
            } else {
            res.status(500).send({
                message: "Error updating Dish with id " + req.params.id,
            });
            }
        } else res.send(data);
        }
    );
}

function del(req, res) {
    Dish.remove(req.params.id, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Dish with id ${req.params.id}.`,
            });
        } else {
            res.status(500).send({
            message: "Could not delete Dish with id " + req.params.id,
            });
        }
        } else res.send({ message: `Dish was deleted successfully!` });
    });
}

function delAll(req, res) {
    Dish.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all dishes.",
        });
        else res.send({ message: `All Dishs were deleted successfully!` });
    });
}

function searchByIngredients(req, res) {
    const ingr = req.body.Ingredients;
    // console.log(ingr);
    Dish.searchByIngredients(ingr, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found any dish with these ingredients`,
                });
            } else {
                res.status(500).send({
                message: "Error retrieving dishes with these ingredients" + req.params.id,
                });
            }
        } else res.send(data);
    });
}

function getIngredients(req, res){
    const FID = req.params.id;
    Dish.getIngredients(FID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send([]);
            } else {
                res.status(500).send({
                message: "Error retrieving ingredients with dish ID " + req.params.id,
                });
            }
        } else res.send(data);
    })
}

function getEquipments(req, res){
    const FID = req.params.id;
    Dish.getEquipments(FID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send([]);
            } else {
                res.status(500).send({
                message: "Error retrieving equipments with dish ID " + req.params.id,
                });
            }
        } else res.send(data);
    })
}

module.exports = {
    create,
    findAll,
    findFiltered,
    findOne,
    findAllVeg,
    update,
    del,
    delAll,
    searchByIngredients,
    getIngredients,
    getEquipments
};
