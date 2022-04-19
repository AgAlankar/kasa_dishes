const sql = require("./db.js");
// constructor
class Dish {
    static fillableFields = [
        'dname', 'veg', 'category', 'expertise',
        'preptime', 'imageurl', 'recipeurl', 'calories',
        'fats', 'proteins', 'carbs'
    ];
    static allFields = Dish.fillableFields.concat([
        'fid','views'
    ]);
    constructor(dish) {
        // this.dname = dish.dname;
        // this.veg = dish.veg;
        // this.category = dish.category;
        // this.expertise = dish.expertise;
        // this.preptime = dish.preptime;
        // this.imageurl = dish.imageurl;
        // this.recipeurl = dish.recipeurl;
        // this.calories = dish.calories;
        // this.fats = dish.fats;
        // this.proteins = dish.proteins;
        // this.carbs = dish.carbs;
        for (let field of Dish.fillableFields) {
            this[field] = dish[field];
        }
    }
    static create(newDish, result) {
        for(let k of Object.keys(newDish)){
            if(isNaN(parseInt(newDish[k])) && isNaN(parseFloat(newDish[k]))){
                newDish[k] = `"${newDish[k]}"`;
            }
        }
        let que = `INSERT INTO dish(${Dish.fillableFields.join()}) `
        + `VALUES (${Dish.fillableFields.map(field => newDish[field]).join()})`;
        console.log(que);
        sql.query(que,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created dish: ", { id: res.insertId, ...newDish });
                result(null, { id: res.insertId, ...newDish });
            });
    }
    static findById(id, result) {
        sql.query(`SELECT * FROM dish WHERE id = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found dish: ", res[0]);
                result(null, res[0]);
                return;
            }
            // not found Dish with the id
            result({ kind: "not_found" }, null);
        });
    }
    static getAll(dname, result) {
        let query = "SELECT * FROM dish";
        if (dname) {
            query += ` WHERE dname LIKE '%${dname}%'`;
        }
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("dish: ", res);
            result(null, res);
        });
    }
    static getAllVeg(result) {
        sql.query("SELECT * FROM dish WHERE veg=true", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("dish: ", res);
            result(null, res);
        });
    }
    static updateById(id, field, newVal, result) {
        sql.query(
            `UPDATE dish SET ${field} = ${newVal} WHERE id = ${id}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                if (res.affectedRows === 0) {
                    // not found Dish with the id
                    result({ kind: "not_found" }, null);
                    return;
                }
                console.log("updated dish: ", { id: id, field: field, newVal: newVal });
                result(null, { id: id, field: field, newVal: newVal });
            }
        );
    }
    static remove(id, result) {
        sql.query("DELETE FROM dish WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                // not found Dish with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("deleted dish with id: ", id);
            result(null, res);
        });
    }
    static removeAll(result) {
        sql.query("DELETE FROM dish", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log(`deleted ${res.affectedRows} dish`);
            result(null, res);
        });
    }
}

module.exports = Dish;