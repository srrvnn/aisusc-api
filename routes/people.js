var express = require('express');
var router = express.Router();

/*
* GET all users
*/
router.get('/', function(req, res) {
    var db = req.db;
    db.collection('people').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
* GET single user
*/
router.get('/:id', function(req, res) {
    var db = req.db;
    var query = {"uscid" : req.params.id};
    db.collection('people').find(query).toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * PUT a single user
 */
router.put('/:id', function(req, res) {
    var db = req.db;
    var query = {"uscid" : req.params.id};
    db.collection('people').update(query, req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * POST a single user
 */
router.post('/', function(req, res) {
    var db = req.db;
    db.collection('people').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE a single user
 */
router.delete('/:id', function(req, res) {
    var db = req.db;
    var query = {"uscid" : req.params.id};
    db.collection('people').remove(query, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;