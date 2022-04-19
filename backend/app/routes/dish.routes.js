function routes(app){
    const dishes = require("../controllers/dish.controller.js");
    let router = require("express").Router();
    // Create a new Dish
    router.post("/", dishes.create);
    // Retrieve all Dishes
    router.get("/", dishes.findAll);
    // Retrieve all veg Dishes
    router.get("/published", dishes.findAllVeg);
    // Retrieve a single Dish with id
    router.get("/:id", dishes.findOne);
    // Update a Dish with id
    router.put("/:id", dishes.update);
    // Delete a Dish with id
    router.delete("/:id", dishes.del);
    // Delete all Dishes
    router.delete("/", dishes.delAll);
    app.use('/api/dishes', router);
}
module.exports = routes;