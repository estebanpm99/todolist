const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcryptjs');
const config = require('config'); 
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken'); 


//@route POST api/auth
//@desc auth user
//@access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password){
    return res.status(400).json({ msg: 'Please enter all fields' })
  }
  db.query(`select * from users WHERE email=?`,email,(err, results) => {
    if (err) throw err;
    if (results == false) return res.status(400).json({ msg: 'Invalid Email' });
    console.log(results);
    const hash_password=results[0].contrasena;
    const id=results[0].id;
    //Get existing user
    bcrypt.compare(password, hash_password).then( isMatch => {
        if(!isMatch) return res.status(400).json({ msg: 'Invalid credential' });
        jwt.sign(
            { id: id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    id: id,
                    name: results[0].name,
                    email: email
                });
            }
            );
        })
    });
});

//@route GET api/auth/user
//@desc Get user data
//@access Private
router.get('/user', auth, (req, res) => {
    db.query(`select id, name, email from users WHERE id=${req.user.id}`,(err, results) => {
        if (err) throw err;
        res.json(results[0]);
    })
})

module.exports = router;