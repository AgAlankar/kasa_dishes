function routes(app){
    const admin = require("../controllers/admin.controller.js");
    let router = require("express").Router();
    // Create a new User
    router.post("/",admin.create);
    router.post("/check",admin.check);
    app.use('/api/admin',router);
}

module.exports = routes;