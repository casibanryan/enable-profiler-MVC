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
    run_mysql_query(query, values) {
        const cmd = this.con.query(query, values, (err, result) => {
            if(err) {
                console.log(err);
            } 
          
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
                    console.log(err);
                    return reject(err);
                } else {
                    return resolve(JSON.stringify(result));
                }
            });
        });
    }

     //SELECT - used when expecting a single result
    //returns an associative array
    fetch_all(query, values) {
        return new Promise((resolve, reject) => {
            const cmd = this.con.query(query, values, (err, result) => {
                this.queries.length == 0 ? this.queries.push([cmd.sql, JSON.stringify(result)]) : null;
                // check if query already exist
                for(let i = 0; i < this.queries.length; i++) {
                    this.queries[i][0].includes(cmd.sql) ? null : this.queries.push([cmd.sql, JSON.stringify(result)]);
                }
               
                if(err) {
                    console.log(err);
                    return reject(err);
                } else {
                    return resolve(JSON.stringify(result));
                }
            });
        });
    }
   
   
}

module.exports = new Query_Builder();