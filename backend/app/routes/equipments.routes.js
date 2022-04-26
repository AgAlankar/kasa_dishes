function routes(app){
    const equipments = require("../controllers/equipments.controller");
    
    let router = require("express").Router();
    // Create a new Dish
    router.post("/", equipments.create);
    // Retrieve all equipments
    router.get("/", equipments.findAll);
    // Retrieve a single Dish with id/name
    router.get("/:name", equipments.findOne);
    // Delete a Dish with id
    router.delete("/:name", equipments.delOne);
    // Delete all equipments
    router.delete("/", equipments.delAll);
    app.use('/api/equipments', router);
}
module.exports = routes;