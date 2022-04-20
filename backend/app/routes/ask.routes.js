function routes(app){
    const ask = require("../controllers/ask.controller.js");
    let router = require("express").Router();
    // Create a new Request
    router.post("/",ask.create);
    router.delete("/:rid",ask.remove);
    router.get("/all",ask.getAll);
    app.use('/api/ask',router);
}

module.exports = routes;