const express = require('express');  
const app = express();
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect("mongodb://0.0.0.0:27017/mydb" );
const db = mongoose.connection;
//mongoose.set('useFindAndModify', false);
db.on('error', console.error.bind(console, 'connection error:'));
//SCHEMA
const BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
  });
const Book = mongoose.model('Book', BookSchema, "books"); //MODEL

app.get("/",(req,res)=>{
    //Get all
        Book.find({})
            .then(( books)=> {
                res.send(books);
            })
            .catch((err)=>{
                res.status(400).send("ERR")
            })
    });
    app.get("/:id",(req,res)=>{
        //Get one req.params.id
        Book.findById({"_id":req.params.id})
            .then((book)=>{
                if (!book) return res.status(404).send(
                    "No data found.");
                res.status(200).send(book);
            })
            .catch((err)=>{
                if (err) return res.status(500).send(
                    "There was a problem finding.");
            })
    
    });
    
    
    app.post("/",function(req,res){
        //INSERT    
        console.log(req.body)
        var book1 = new Book({
                name : req.body.name,
                price : req.body.price,
                quantity : req.body.quantity
            });
        book1.save()
            .then((book)=>{       res.status(200).send(book);        })
            .catch((err)=>{if (err) return console.error(err);})
    })
    
    
    app.put("/:id",(req,res)=>{
    //UPDATE  req.params.id, req.body
    
        Book.findOneAndUpdate({"_id":req.params.id}, req.body,{new: true})
            .then((book)=>{res.status(200).send(book);})
            .catch((err)=>{
                if (err) return res.status(500).send(
                    "There was a problem updating.");
            })
    });
    
    app.delete("/:id",(req,res)=>{
    //DELETE req.params.id deleteOne() deleteMany() findOneAndDelete()
        Book.findOneAndDelete({"_id":req.params.id})
            .then((book)=>{
                res.status(200).send(book);
            })
            .catch((err)=>{
                if (err) return res.status(500).send(
                    "There was a problem deleting.");
            })
    });

app.listen(8000,(err)=>{
    console.log("App is running on port no 8000.")
});
