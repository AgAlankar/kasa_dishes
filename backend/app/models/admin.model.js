const sql = require("./db.js");
// constructor
class Admin {

    constructor(Admin)
    {
        this.aname = Admin.aname;
        this.pass = Admin.pass;
    }

    static create(newAdmin, result)
    {
        newAdmin.aname=`"${newAdmin.aname}"`;
        newAdmin.pass=`"${newAdmin.pass}"`;

        let que = `INSERT INTO Admins Values(${newAdmin.aname},${newAdmin.pass}) `;
        console.log(que);
        sql.query(que,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created admin: ", { ...newAdmin });
                result(null, {...newAdmin});
            });

    }

    static check(newAdmin,result)
    {
        newAdmin.aname=`"${newAdmin.aname}"`;
        newAdmin.pass=`"${newAdmin.pass}"`;

        let que = `Select * from Admins where aname=${newAdmin.aname} and pass=${newAdmin.pass}`;
        console.log(que);
        sql.query(que,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                const obj = {exists: res.length>0};
                if(obj.exists){
                    obj.sessAdmin = {aname: res[0]["aname"]};
                
                }
                console.log("Admin checked: ", obj);
                result(null,obj);
            });
    }


}

module.exports = Admin;