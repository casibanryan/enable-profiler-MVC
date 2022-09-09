const express = require('express');
const router = express.Router();

const Enable_Profiler = require('../system/Enable_Profiler');
const Users = require('../controllers/Users');

router.get('/', Enable_Profiler.run(true), Users.index());
router.get('/students/profile', Enable_Profiler.run(false), Users.students_profile());
router.post('/register_process', Enable_Profiler.run(true), Users.register_process());
router.post('/login_process', Enable_Profiler.run(false), Users.login_process());
router.get('/logout', Users.logout_process());

module.exports = router;