const express= require("express")
const User=require("../models/userModel");
const router=express.Router();

router.post("/",async(req,res)=>{
    const {name,email,age}=req.body;
    
    try{
        const userAdded=await User.create({
            name:name,
            email:email,
            age:age
        });
        res.status(201).json(userAdded);
    } catch(error){
        res.status(400).json({error:error.message})
    }
})


router.get("/",async(req,res)=>{
    try{
        const showAll=await User.find();
        res.status(200).json(showAll);
    } catch(error){
        res.status(500).json({error:error.message})
    }
})

router.get("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const singleUser=await User.findById({_id:id});
        res.status(200).json(singleUser);
    } catch(error){
        res.status(500).json({error:error.message})
    }
})

router.delete("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const singleUser=await User.findByIdAndDelete({_id:id});
        res.status(200).json(singleUser);
    } catch(error){
        res.status(500).json({error:error.message})
    }
})
router.patch("/edit/:id",async(req,res)=>{
    const {id}=req.params;
    const{name,email,age}=req.body;
    try{
        const updateUser=await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updateUser);
    } catch(error){
        res.status(500).json({error:error.message})
    }
})

module.exports=router;
