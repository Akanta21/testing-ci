var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
});

var object = [
 {"id":1,"name":"Chewing Gum", "color":"Red"},
 {"id":2,"name":"Pez","color":"Green"},
 {"id":3,"name":"Marshmallow","color":"Pink"},
 {"id":4,"name":"Candy Stick","color":"Blue"}
];

// INDEX
router.get('/candies', (req, res) => {
 res.status(200).json(object)
})

// SHOW
router.get('/candies/:id', (req, res) => {
 res.status(200).json(object[req.params.id-1]);
});

// CREATE
router.post('/candies', (req, res, next) => {
   console.log(req.body);
   if(req.body.color === "wrong") {
     res.status(422).json({
       message: 'wrong color'
     })
     return 
   }
   res.status(201).json({
     message: 'candies created',
     id: parseInt(req.body.id),
     name: req.body.name,
     color: req.body.color
   });
   var candy = {
     id: parseInt(req.body.id),
     name: req.body.name,
     color: req.body.color
   }
   object.push(candy)
});

// UPDATE
router.put('/candies/:id', (req, res) => {
 res.status(200).json({
   message: `Candy ${req.params.id} updated`,
   id: req.body.id,
   name: req.body.name,
   color: req.body.color});
   object[req.body.id-1].id = req.body.id
   object[req.body.id-1].name = req.body.name
   object[req.body.id-1].color = req.body.color
});
// DESTROY
router.delete('/candies/:id', (req, res) => {
 res.status(200).json({message: `Candy ${req.params.id} deleted`});
 object.splice(req.params.id-1, 1)
});

module.exports = router;
