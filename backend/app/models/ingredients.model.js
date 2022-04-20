const sql = require("./db.js");

class Ingredients{
    constructor(Ingredients){
        this.IID = Ingredients.IID;
        this.IName = Ingredients.IName;
        this.restrictions = Ingredients.restrictions;
    }
    static create(newIngredient, result){
        newIngredient.IName = `"${newIngredient.IName}"`;
        newIngredient.restrictions = `"${newIngredient.restrictions}"`;

        let Query = `INSERT INTO ingredients(IName, restrictions) VALUES
            (${newIngredient.IName}, ${newIngredient.restrictions})`;
        console.log(Query);
        sql.query(Query, (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Ingredient Created",res);
            result(null, res);
        });    
    }

    static madeOf(FID, IID){
        let Query2 = `INSERT INTO madeof VALUES(${FID}, ${IID})`;
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
            query = `SELECT * FROM ingredients 
                WHERE IName LIKE '%${name}%'`;
        } else {
            query = `SELECT * FROM ingredients 
                WHERE iid = ${name}`;
        }
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found ingredient: ", res[0]);
                result(null, res[0]);
                return;
            }
            // not found ingredient with the iid
            result({ kind: "not_found" }, null);
        });
    }

    static getAll(IName, result) {
        let query = "SELECT * FROM ingredients";
        if (IName) {
            query += ` WHERE IName LIKE '%${IName}%'`;
        }
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("ingredients: ", res);
            result(null, res);
        });
    }

    static remove(name, result) {
        let query = "";
        if(isNaN(parseInt(name))){
            query = `DELETE FROM ingredients WHERE IName = "${name}"`;
        } else {
            query = `DELETE FROM ingredients WHERE IID = ${name}`;
        }
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                // not found ingredients with the IID
                result({ kind: "not_found" }, null);
                return;
            }
            console.log(`deleted ingredients with name: ${name}`);
            result(null, res);
        });
    }

    static removeAll(result) {
        sql.query("DELETE FROM ingredients", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log(`deleted ${res.affectedRows} ingredients`);
            result(null, res);
        });
    }
}

module.exports = Ingredients;