const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcryptjs');
const config = require('config'); 
const jwt = require('jsonwebtoken'); 

//@route POST api/users
//@desc Regisetr new user
//@access Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password){
    return res.status(400).json({ msg: 'Please enter all fields' })
  }


  let sql1= `select * from users WHERE email=?`;
  db.query(sql1, email, (err, results) => {
    if (err) throw err;
    if(results != false){
      return res.status(400).json({ msg: 'Ya existe este Email we no seas piñas' });
    }else{

      let sql2= `INSERT INTO users (name, email, contrasena) VALUES (?, ?, ?)`;
      //Salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          let password2=hash;
          db.query(sql2, [name, email, password2], (err, results) => {
            if (err) throw err;
            const id = results.insertId;
            console.log('Registrado con el id #'+id);
            jwt.sign(
              { id: id },
              config.get('jwtSecret'),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  id: id,
                  name: name,
                  email: email
                });
              }
            );
          });
        });
      });
    }
  });



});

module.exports = router;