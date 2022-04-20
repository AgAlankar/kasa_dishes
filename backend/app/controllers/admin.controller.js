const Admin = require("../models/admin.model");

function create(req,res){

    if (!req.body) 
    {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // create Admin
    let _admin={};
    _admin.aname=req.body.aname;
    _admin.pass=req.body.pass;
    // console.log(req.body.aname);
    const admin= new Admin(_admin);
    Admin.create(admin, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while adding new Admin."
          });
        else res.send(data);
      });

}

module.exports = {create};
