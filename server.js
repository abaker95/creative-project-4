const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
    useNewUrlParser: true
});

// Create a scheme for items in database
const itemSchema = new mongoose.Schema({
    //TODO: Define schema for new site
    title: String,
    description: String,
    path: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Create a new item in the database
app.post('/api/items', async (req, res) => {
    //TODO: adapt this for new site
    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        path: req.body.path,
    });
    try {
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all of the items in the database table.
app.get('/api/items', async (req, res) => {
    try {
        let items = await Item.find();
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete an item from the database
app.delete('/api/items/:id', async (req, res) => {
    try {
        //TODO: Adapt this for new site
        id = req.params.id
        console.log(id);
        await Item.findByIdAndDelete(id);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Update the details of an item in the database
app.put('/api/items/:id', async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);
        //TODO: Adapt this for new site
        item.title = req.body.title;
        item.description = req.body.description;
        await item.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));