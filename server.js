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
const passageSchema = new mongoose.Schema({
    title: String,
    passage: String,
    contributer: String,
});

// Create a scheme for comments in database
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    passageId: String, //objectID of passage
});

// Create a model for passages and comments in the database.
const Passage = mongoose.model('Passage', passageSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Create a new item in the database
app.post('/api/passages/add', async (req, res) => {
    const passage = new Passage({
        title: req.body.title,
        passage: req.body.passage,
        contributer: req.body.contributer,
    });
    try {
        await passage.save();
        //What should this return?
        res.send(passage);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all of the passages in the database table.
app.get('/api/passages', async (req, res) => {
    try {
        let passages = await Passage.find();
        res.send(passages);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete an item from the database
app.delete('/api/passages/:id', async (req, res) => {
    try {
        id = req.params.id
        console.log(id);
        await Passage.findByIdAndDelete(id);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Update the details of an item in the database
app.put('/api/passages/:id', async (req, res) => {
    try {
        let passage = await Passage.findById(req.params.id);
        passage.title = req.body.title;
        passage.passage = req.body.description;
        await passage.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));