const db = require('../database/Query_Builder');
const form_validation = require('../system/Form_Validation');
const bcrypt = require('bcryptjs');

class User {
    constructor() {
        this.first_name = null;
        this.last_name = null;
        this.email_address = null;
        this.password = null;
        this.authorize = null;
        this.register_success = false;
        this.error_messages = form_validation.error_messages;
    }

    /**
     * It checks if the user exists in the database, if not, it inserts the user into the database.
     * @param req - The request object
     * @param user - is an object that contains the user's first name, last name, email address,
     * password, and confirm password.
     * @returns The object itself.
     */
    async insert_new_user(req, user) {
        form_validation.required(user.first_name);
        form_validation.matches('Password', user.password, user.confirm_password);

        const query = 'SELECT * FROM users WHERE email_address = ?';
        const user_exist = await db.fetch_record(query, [user.email_address]);
        
        if(user_exist == undefined && form_validation.valid_form) {
            this.register_success = true;
            const query = 'INSERT INTO users (first_name, last_name, email_address, password) VALUES (?, ?, ?, ?)';
            const values = [    
                user.first_name,
                user.last_name,
                user.email_address,
                bcrypt.hashSync(user.password, 10)
            ];

            db.run_mysql_query(query, values);
        
        } else {
            req.session.first_name = user.first_name;
            req.session.last_name = user.last_name;
            req.session.email_address = user.email_address;
            req.session.password = user.password;
        }

        return this;
    }

    /**
     * It takes a request object, queries the database for a user with the email address in the request
     * object, and if the user exists, it compares the password in the request object to the password
     * in the database. If the passwords match, it returns 1, otherwise it returns 0.
     * 
     * The function is called from a route in the following manner:
     * @param req - is the request object
     * @returns The return value is the number of rows affected by the query.
     */
    async validate_login(req) {
        const query = 'SELECT * FROM users WHERE email_address = ?';
        let result = await db.fetch_record(query, [req.email_address]);
       
        if(result !== undefined) {
            const user = JSON.parse(result);
            const hash_password = bcrypt.compareSync(req.password, user.password);
            if(hash_password) {
                this.first_name = user.first_name;
                this.last_name = user.last_name;
                this.email_address = user.email_address;
                this.password = null;
                this.authorize = true;
                return 1;
            } 
        }

        this.email_address = req.email_address;
        this.password = req.password;
        this.authorize = false;
        return 0;
    }
}

module.exports = User;