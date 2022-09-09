const express = require('express');
const session = require('express-session');
const body_parser = require('body-parser');
const config = require('./config');

const app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(session(config.session));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const router = require('./routes/user_routes');
app.use(router);

const port = 8080;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

