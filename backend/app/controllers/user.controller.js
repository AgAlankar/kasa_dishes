const User = require("../models/user.model");

function create(req,res){

    if (!req.body) 
    {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // create user
    let _user={};
    _user.uname=req.body.uname;
    _user.pass=req.body.pass;
    _user.email=req.body.email;
    
    const user= new User(_user);
    User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while adding new User."
          });
        else res.send(data);
      });


}

function mkfav(req,res){

  if (!req.body) 
  {
      res.status(400).send({
          message: "Content can not be empty!"
      });
  }
  // create user
  let _favuser={};
  _favuser.uname=req.body.uname;
  _favuser.fid=req.body.fid;

  User.mkfav(_favuser, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding User fav."
        });
      else res.send(data);
    });
}


function delfav(req,res){

  if (!req.body) 
  {
      res.status(400).send({
          message: "Content can not be empty!"
      });
  }
  // delete user
  let _favuser={};
  _favuser.uname=req.body.uname;
  _favuser.fid=req.body.fid;

  User.delfav(_favuser, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while Deleting User fav."
        });
      else res.send(data);
    });
}

function findallfav(req,res){

  if (!req.body) 
  {
      res.status(400).send({
          message: "Content can not be empty!"
      });
  }

  User.findallfav(req.body.uname, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while showing all User fav."
        });
      else res.send(data);
    });
}


function check(req,res){

  if (!req.body) 
  {
      res.status(400).send({
          message: "Content can not be empty!"
      });
  }
  // create user
  let _user={};
  _user.uname=req.body.uname;
  _user.pass=req.body.pass;
  _user.email=req.body.email;
  
  const user= new User(_user);
  User.check(user, (err, data) => {
      if (err){
        console.log(err.code)
        if(err.errno===1062){
          res.status(403).send({
            message:
              err.message || "Some error occurred while adding new User."
          });
        }else{
          res.status(500).send({
            message:
              err.message || "Some error occurred while adding new User."
          });
        }
      }else res.send(data);
    });


}




module.exports = {create,mkfav,delfav,findallfav,check};
