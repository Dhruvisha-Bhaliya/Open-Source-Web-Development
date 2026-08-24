const express = require("express");
const mongoose = require("mongoose");

const Student = require("./models/student");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/StudentDB")
  .then(() => console.log("mongodb connected success"))
  .catch((err) => console.log("error",err));

app.get("/",(req,res)=>{
    res.send("Welcome");
});

app.post("/students",async(req,res)=>{
    try{
        const student = new Student(req.body);
        const result = await student.save();
        res.status(201).json(result);
    }catch(error){
        res.status(400).json({
            message:error.message
        });
    }
});

app.get("/students",async(req,res)=>{
    try{
        const students = await Student.find();
        res.json(students);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

app.get("/students/:id",async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id);
        if(!student){
            return res.status(404).json({
                message:"Student Not Found"
            });
        }
        res.json(student);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

app.put("/students/:id",async(req,res)=>{
    try{
        const updatestudent = await Student.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        });

        if(!updatestudent){
            return res.status(404).json({
                message:"student Not Found"
            });
        }
        res.json(updatestudent);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

app.delete("/students/:id",async(req,res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);

        if(!deleteStudent){
            return res.status(404).json({
                message:"Student Not Found"
            });
        }
        res.json({
            message:"Student Deleted Success"
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

app.listen(3000,()=>{
    console.log("running");
})