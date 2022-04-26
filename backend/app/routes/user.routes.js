function routes(app){
    const user = require("../controllers/user.controller.js");
    let router = require("express").Router();
    // Create a new User
    router.post("/",user.create);
    //add fav
    router.post("/fav",user.mkfav);
    //del fav
    router.delete("/del",user.delfav);
    //findallfav
    router.post("/allfav",user.findallfav);
    //check
    router.post("/check",user.check);
    
    app.use('/api/users',router);

}

module.exports = routes;