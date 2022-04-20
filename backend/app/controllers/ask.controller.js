const Ask = require("../models/ask.model");

function create(req,res){

    if (!req.body) 
    {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // create request
    let _ask={};
    _ask.rname=req.body.rname;
    _ask.recipieurl=req.body.recipieurl;
    
    const ask= new Ask(_ask);
    Ask.create(ask, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while adding new Request."
          });
        else res.send(data);
      });
}

function remove(req,res){

  if (!req.body) 
  {
      res.status(400).send({
          message: "Content can not be empty!"
      });
  }
  
  Ask.remove(req.params.rid, (err, data) => {
    
    if(err)
    {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not Request with id ${req.params.rid}.`
        });
        }
        else 
            res.status(500).send({
            message:
                err.message || "Some error occurred while deleting Request."
            });
    }
      else res.send(data);
    });
}

function getAll(req, res) {
    Ask.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all Requests."
        });
      else res.send(data);
    });
  }



module.exports = {create,remove,getAll};
