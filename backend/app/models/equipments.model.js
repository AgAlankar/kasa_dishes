const sql = require("./db.js");

class Equipments{
    constructor(Equipments){
        this.EID = Equipments.EID;
        this.EName = Equipments.EName;
    }
    static create(newEquipment, result){
        newEquipment.EName = `"${newEquipment.EName}"`;

        let Query = `INSERT INTO equipment (EName) VALUES(${newEquipment.EName})`;
        console.log(Query);
        sql.query(Query, (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            // console.log("Equipment Created",res);
            result(null, res);
        });    
    }

    static madeUsing(FID, EID){
        let Query2 = `INSERT INTO madeusing VALUES(${FID}, ${EID})`;
        console.log(Query2);
        sql.query(Query2, (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log(`...and added to your Dish ID ${FID}`);
        });  
    }

    static findOne(name, result) {
        let query = "";
        if(isNaN(parseInt(name))){
            query = `SELECT * FROM equipment 
                WHERE EName LIKE '%${name}%'`;
        } else {
            query = `SELECT * FROM equipment 
                WHERE EID = ${name}`;
        }
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found Equipment: ", res[0]);
                result(null, res[0]);
                return;
            }
            // not found Equipment with the EID
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(EName, result) {
        let query = "SELECT * FROM equipment";
        if (EName) {
            query += ` WHERE EName LIKE '%${EName}%'`;
        }
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("Equipments: ", res);
            result(null, res);
        });
    }

    static remove(name, result) {
        let query1 = `DELETE FROM madeusing WHERE EID = ${name}`;
        let query2 = `DELETE FROM equipment WHERE EID = ${name}`;
        sql.query(query1, (err, res) => {
            if (err) {
                console.log("error1: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                // not found Equipments with the EID
                result({ kind: "not_found" }, null);
                return;
            } else {
                sql.query(query2, (err, res) => {
                    if (err) {
                        console.log("error2: ", err);
                        result(null, err);
                        return;
                    }
                    if (res.affectedRows === 0) {
                        // not found Equipments with the EID
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    console.log(`deleted Equipments with ID: ${name}`);
                    result(null, res);
                });
            }
        });
    }

    static removeAll(result) {
        sql.query("DELETE FROM madeusing", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            } else {
                sql.query("DELETE FROM equipment", (error, result) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }
                });
                console.log(`deleted ${res.affectedRows} equipment`);
                result(null, res);
            }
        });
    }
}

module.exports = Equipments;