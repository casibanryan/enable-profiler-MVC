const mysql = require('mysql');
const config = require('../config');

class Query_Builder {
    constructor() {
        this.config = config.database;
        this.con = this.create_connection();
        this.queries = [];
    }

    // creating connection
    create_connection() {
        return mysql.createConnection(this.config);
    }

     //used to run INSERT/DELETE/UPDATE, queries that don't return a value
    //returns a value, the id of the most recently inserted record in your database
    run_mysql_query(query, values) {
        const cmd = this.con.query(query, values, (err, result) => {
            if(err) {
                console.log(err);
            } 
            //return this.queries.includes(cmd.sql) ? null : this.queries.push(cmd.sql);
            this.queries.length == 0 ? this.queries.push([cmd.sql, JSON.stringify(result)]) : null;
                // check if query already exist
            for(let i = 0; i < this.queries.length; i++) {
                this.queries[i][0].includes(cmd.sql) ? null : this.queries.push([cmd.sql, JSON.stringify(result)]);
            }
            
            return this;
        });
       
    }

    //SELECT - used when expecting a single result
    //returns an associative array
    fetch_record(query, values) {
        return new Promise((resolve, reject) => {
            const cmd = this.con.query(query, values, (err, [result]) => {
                this.queries.length == 0 ? this.queries.push([cmd.sql, JSON.stringify(result)]) : null;
                // check if query already exist
                for(let i = 0; i < this.queries.length; i++) {
                    this.queries[i][0].includes(cmd.sql) ? null : this.queries.push([cmd.sql, JSON.stringify(result)]);
                }
                
                if(err) {
                    console.log(`error in getting user by email : ${err}`);
                    return reject(err);
                } else {
                    return resolve(JSON.stringify(result));
                }
            });
        });
    }
   
}

module.exports = new Query_Builder();