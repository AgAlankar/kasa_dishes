function routes(app){
    const ingredients = require("../controllers/ingredients.controllers");
    
    let router = require("express").Router();
    // Create a new Dish
    router.post("/", ingredients.create);
    // Retrieve all ingredients
    router.get("/", ingredients.findAll);
    // Retrieve a single Dish with id/name
    router.get("/:name", ingredients.findOne);
    // Delete a Dish with id/name
    router.delete("/:name", ingredients.delOne);
    // Delete all ingredients
    router.delete("/", ingredients.delAll);
    app.use('/api/ingredients', router);
}
module.exports = routes;