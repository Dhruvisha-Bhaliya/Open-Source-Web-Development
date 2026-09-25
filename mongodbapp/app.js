const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookdb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Connected to MongoDB');
});

const BookSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
});

const Book = mongoose.model('Book', BookSchema, 'books');

app.get("/", (req, res) => {
    Book.find({})
        .then((books) => {
            console.log("BOOKS:", books);
            res.status(200).json(books);
        })
        .catch((err) => {
            console.log("FETCH ERROR:", err);
            res.status(500).send(err.message);
        });
});

app.get("/:id", (req, res) => {
    Book.findById(req.params.id)
        .then((book) => {
            if (!book) {
                return res.status(404).send(
                    "No data found."
                );
            }
            res.status(200).send(book);
        })
        .catch((err) => {
            res.status(500).send(
                "There was a problem finding the book: " + err.message
            );
        });
});

app.post("/", (req, res) => {
    console.log(req.body);

    const book1 = new Book({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });

    book1.save()
        .then((book) => {
            res.status(200).send(book);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.put("/:id", (req, res) => {
    Book.findOneAndUpdate(
        {
            "_id": req.params.id
        },
        req.body,
        {
            new: true
        }
    )
        .then((book) => {
            if (!book) {
                return res.status(404).send(
                    "Book not found"
                );
            }
            res.status(200).send(book);
        })
        .catch((err) => {
            res.status(500).send(
                "There was a problem updating."
            );
        });
});

app.delete("/:id", (req, res) => {
    Book.findOneAndDelete({
        "_id": req.params.id
    })
        .then((book) => {
            if (!book) {
                return res.status(404).send(
                    "Book not found"
                );
            }
            res.status(200).send(book);
        })
        .catch((err) => {
            res.status(500).send(
                "There was a problem deleting."
            );
        });
});

app.listen(7000, () => {
    console.log(
        "App is running on http://localhost:7000"
    );
});
