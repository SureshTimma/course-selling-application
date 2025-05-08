const express = require("express");
const { userAuth } = require("../middleware/userMw");

const {Router} = express;
const courseRouter = Router();

 const {courseModel,purchaseModel} = require("../db");
 courseRouter.use(express.json());



courseRouter.post("/purchase",userAuth, async (req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;

        // check if user has paid already for a course or not
    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message:"You have successfully bought the course"
    })
})

courseRouter.get("/preview",async function(req,res){
    const courses = await courseModel.find({});

    res.json({
        courses
    })
})

module.exports =  {courseRouter : courseRouter}