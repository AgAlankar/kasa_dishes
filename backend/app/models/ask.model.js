const sql = require("./db.js");
// constructor
class Ask {

    constructor(Ask)
    {
        this.rid = Ask.rid;
        this.rname = Ask.rname;
        this.recipieurl = Ask.recipieurl;
    }

    static create(newAsk, result)
    {
        newAsk.rname=`"${newAsk.rname}"`;
        newAsk.recipieurl=`"${newAsk.recipieurl}"`;

        let que = `INSERT INTO Requests (rname,recipieurl) Values(${newAsk.rname},${newAsk.recipieurl}) `;
        console.log(que);
        sql.query(que,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created Request: ", { ...newAsk });
                result(null, {...newAsk});
            });

    }
    static remove(rid, result)
    {

        let que = `Delete from Requests where Rid=${rid} `;
        console.log(que);
        sql.query(que,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                if (res.affectedRows === 0) {
                    // not found Dish with the fid
                    result({ kind: "not_found" }, null);
                    return;
                }
                console.log("Request Deleted: ",rid);
                result(null,rid);
            });
    }
    static getAll(result) {
        sql.query("SELECT * FROM Requests", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("requests: ", res);
            result(null, res);
        });
    }


}

module.exports = Ask;