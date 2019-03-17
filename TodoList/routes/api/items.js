const route = require('express').Router();

// Item Model
const Item = require('../../models/item');

// @Route GET api/items
route.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items));
});

// @Route POST api/items
route.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json({
        'success': true,
        'item': item
    }));
});

// @Route DELETE api/items
route.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

module.exports = route;