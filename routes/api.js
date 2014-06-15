var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/people', function(req, res) {
    var db = req.db;
    db.collection('people').find().toArray(function (err, items) {
        res.json(items);
    });
});


module.exports = router;
