class Config {
    constructor() {
        // database configuration
        this.database = {
            server: "localhost",
            database: "login_and_registration",
            user: "root",
            password: "",
            port : 3306
        };

        //session configuration
        this.session= {
            secret : 'keyboard',
            resave : false,
            saveUninitialized : true,
            cookie : {maxAge : 60000}
        };
    }
}

module.exports = new Config();