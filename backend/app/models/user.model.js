const sql = require("./db.js");
// constructor
class User {

    constructor(User)
    {
        this.uname = User.uname;
        this.pass = User.pass;
        this.email = User.email;
    }

    static create(newUser, result)
    {
        newUser.uname=`"${newUser.uname}"`;
        newUser.pass=`"${newUser.pass}"`;
        newUser.email=`"${newUser.email}"`;

        let que = `INSERT INTO Users Values(${newUser.uname},${newUser.pass},${newUser.email}) `;
        console.log(que);
        sql.query(que,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created User: ", { ...newUser });
                result(null, {...newUser});
            });

    }

    static mkfav(favuser, result)
    {
        favuser.uname=`"${favuser.uname}"`;
        let que = `INSERT INTO FavLookup Values(${favuser.uname},${favuser.fid})`;
        console.log(que);
        sql.query(que,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("Added to fav: ", { ...favuser });
                result(null, {...favuser});
            });
    }

    static delfav(favuser, result)
    {
        favuser.uname=`"${favuser.uname}"`;
        let que = `Delete from FavLookup where uname=${favuser.uname} and fid=${favuser.fid}`;
        console.log(que);
        sql.query(que,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("Deleted from fav: ",{...favuser});
                result(null, null);
            });
    }

    static findallfav(uname, result)
    {
        uname=`"${uname}"`;
        let que = `select d.fid,d.dname from dish d,users u,favlookup f where u.uname=f.uname and f.fid=d.fid and u.uname=${uname}`;
        console.log(que);
        sql.query(que,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("All fav: ", res);
                result(null,res);
            });
    }
    


}

module.exports = User;