const express=require('express');
const router=express.Router();
const Employee=require('../models/employee.js');

const ObjectId=require('mongoose').Types.ObjectId;

//get

router.get('/',(req,res)=>{
    Employee.find((err,doc)=>{
        if(err)
        {
            console.log("Error in get data"+err);
        }
        else{
            res.send(doc);
        }
    });
});

//get single user
router.get('/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        Employee.findById(req.params.id,(err,doc)=>{

            if(err)
            {
                console.log("error in get data"+err);
            }
            else{
                res.send(doc);
            }
        });
    }
    else{
        return res.status(400).send("no record found in database")
    }

});

//post
router.post('/',(req,res)=>{
    let emp=new Employee({
        name:req.body.name,
        position:req.body.position,
        dept:req.body.dept
    });

    emp.save((err,doc)=>{
        if(err)
        {
            console.log("Err in post",+err)
        }
        else{
            res.send(doc);
        }
    });

});


//put user
router.put('/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        let emp={
            name:req.body.name,
            position:req.body.position,
            dept:req.body.dept
        };
        Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,doc)=>{

            if(err)
            {
                console.log("error in put data"+err);
            }
            else{
                res.send(doc);
            }
        });
    }
    else{
        return res.status(400).send("no record found in database")
    }

});

//delete user
router.delete('/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        Employee.findByIdAndRemove(req.params.id,(err,doc)=>{

            if(err)
            {
                console.log("error in delete data"+err);
            }
            else{
                res.send(doc);
            }
        });
    }
    else{
        return res.status(400).send("no record found in database")
    }

});
module.exports=router;