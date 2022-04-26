const sql = require("./db.js");
// constructor
class Dish {
    static fillableFields = [
        'dname', 'cuisine', 'veg', 'category', 'expertise',
        'preptime', 'imageurl', 'recipeurl', 'calories',
        'fats', 'proteins', 'carbs'
    ];
    static allFields = Dish.fillableFields.concat([
        'fid','views'
    ]);

    constructor(dish) {
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
                console.log("created dish: ", { fid: res.insertId, ...newDish });
                result(null, { fid: res.insertId, ...newDish });
            });
    }

    static findById(fid, result) {
        sql.query(`SELECT * FROM dish WHERE fid = ${fid}`, (err, res) => {
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
            // not found Dish with the fid
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

    static getFiltered(filters,result){
        let query = "SELECT * FROM dish";
        if(Object.keys(filters).length > 0){
            query+=" WHERE ";
            let conds = [];
            if(filters.dname != undefined){
                conds.push(`dname LIKE '%${filters.dname}%'`);
            }
            if(filters.cuisine != undefined){
                conds.push(`cuisine LIKE '%${filters.cuisine}%'`);
            }
            if(filters.veg != undefined){
                conds.push(`veg=${filters.veg}`);
            }
            if(filters.category != undefined){
                conds.push(`category LIKE '%${filters.category}%'`);
            }
            if(filters.maxexp != undefined){
                conds.push(`expertise <= ${filters.maxexp}`);
            }
            if(filters.maxprep != undefined){
                conds.push(`preptime <= ${filters.maxprep}`);
            }
            if(filters.maxcal != undefined){
                conds.push(`calories <= ${filters.maxcal}`);
            }
            if(filters.maxfat != undefined){
                conds.push(`fats <= ${filters.maxfat}`);
            }
            if(filters.minprot != undefined){
                conds.push(`proteins >= ${filters.minprot}`);
            }
            if(filters.maxcarb != undefined){
                conds.push(`carbs <= ${filters.maxcarb}`);
            }
            query += conds.join(" AND ");
        }
        console.log(query);
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

    static updateById(fid, field, newVal, result) {
        sql.query(
            `UPDATE dish SET ${field} = ${newVal} WHERE fid = ${fid}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                if (res.affectedRows === 0) {
                    // not found Dish with the fid
                    result({ kind: "not_found" }, null);
                    return;
                }
                console.log("updated dish: ", { fid: fid, field: field, newVal: newVal });
                result(null, { fid: fid, field: field, newVal: newVal });
            }
        );
    }

    static remove(fid, result) {
        sql.query("DELETE FROM dish WHERE fid = ?", fid, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                // not found Dish with the fid
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("deleted dish with fid: ", fid);
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
    static searchByIngredients(ingr, result){
        let query = `SELECT dname from dish d, madeof m, ingredients i WHERE d.fid = m.fid AND m.iid = i.iid AND i.iname IN (`;
        console.log(ingr);
        let size = ingr.length;
        ingr.forEach(ing => {
            ing = `'${ing}'`;
            query = query + `${ing}`;
            if(size > 1){
                query = query + ",";
            }
            size--;
        });
        query = query + `) GROUP BY dname HAVING count(dname) = ${ingr.length};`;
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            } 
            if (res.length) {
                console.log("found dishes: \n", res);
                result(null, res);
                return;
            }
            console.log("No dish found with these ingredients");
            result({kind : "not_found" }, null); 
        });
    }
}

module.exports = Dish;