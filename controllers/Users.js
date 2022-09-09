const User_Model = require('../models/User');

class Users extends User_Model {
    constructor() {
        super();
        this.session = null;
        this.enable_profiler = null;
    }

    index() {
        return (req, res) => {
            this.session = req.session;
            this.enable_profiler = req.output;
            res.render('users/index', {data : this});
        }
    }

    students_profile() {
        return (req, res) => {
            if(this.authorize) {
                const user_data = {
                    first_name : this.first_name, 
                    last_name : this.last_name, 
                    email_address : this.email_address
                };
                return res.render('users/profile', user_data);
            } else {
                return res.redirect('/');
            }
        }
    }

    logout_process() {
        return (req, res) => {
            this.authorize = false;
            return res.redirect('/');
        }
    }

    register_process() {
        return async (req, res) => {
            await this.insert_new_user(req, req.body);
            return res.redirect('/');
        }
    }

    login_process() {
        return async (req, res) => {
            const result = await this.validate_login(req.body);
            if(result == 1) {
                return res.redirect('/students/profile');
            } else {
                return res.redirect('/');
            }  
        }
    }
}

module.exports = new Users();