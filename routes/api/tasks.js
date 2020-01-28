const express = require('express');
const router = express.Router();
const db = require('../../db');
const auth = require('../../middleware/auth');

//@route GET api/tasks
//@desc Get all tasks
//@access Public
router.get('/', auth,(req, res) => {
    let sql = 'SELECT * FROM tasks WHERE user_id=?';
    let query = db.query(sql, [req.user.id],(err, results) => {
        if (err) throw err;
        console.log(results);
        res.json(results);
    });
  });

//@route POST api/tasks
//@desc create an Task
//@access Private
router.post('/', auth,(req, res) => {
    let sql = 'INSERT INTO tasks (task, user_id) VALUES (?, ?)';
    let query = db.query(sql, [req.body.task, req.user.id], (err, results) => {
        if (err) throw err;
        db.query(`SELECT * FROM tasks WHERE id=${results.insertId}`, (err, results) => {
          if (err) throw err;
          res.json(...results);
          console.log(...results);
        });   
    });
  });

//@route DELETE api/tasks/:id
//@desc delete a Task
//@access Private
router.delete('/:id', auth,(req, res) => {
    let sql = `DELETE FROM tasks WHERE id= ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Deleted...');
    });
  });


module.exports = router;