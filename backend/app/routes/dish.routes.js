function routes(app){
    const dishes = require("../controllers/dish.controller.js");
    let router = require("express").Router();
    // Create a new Dish
    router.post("/", dishes.create);
    // Retrieve all Dishes
    router.get("/", dishes.findAll);
    // Retrieve dishes based on filters
    router.post("/search", dishes.findFiltered);
    // Retrieve all veg Dishes
    router.get("/veg", dishes.findAllVeg);
    // Retrieve using ingredients
    router.get("/find", dishes.searchByIngredients);
    //Retrieve ingredients of a specific dish
    router.get("/ingredients/:id", dishes.getIngredients);
    //Retrieve equipments of a specific dish
    router.get("/equipments/:id", dishes.getEquipments);
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