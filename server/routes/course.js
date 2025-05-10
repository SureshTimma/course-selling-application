const express = require("express");
const { userAuth } = require("../middleware/userMw");

const {Router} = express;
const courseRouter = Router();

const {courseModel,purchaseModel} = require("../db");
courseRouter.use(express.json());



courseRouter.post("/purchase", userAuth, async (req, res) => {
    try {
        console.log('Request Headers:', req.headers);
        console.log('Request Body:', req.body);
        console.log('User ID:', req.userId);

        const userId = req.userId;
        const { courseId, courseTitle } = req.body;
        
        console.log('Extracted Course Details:', { courseId, courseTitle });

        if (!courseId) {
            return res.status(400).json({
                message: "Course ID is missing"
            });
        }

        // Check if the user has already purchased this course
        const existingPurchase = await purchaseModel.findOne({ 
            userId, 
            courseId 
        });

        if (existingPurchase) {
            return res.status(400).json({
                message: "You have already purchased this course"
            });
        }

        // Create a new purchase record
        const newPurchase = await purchaseModel.create({
            userId,
            courseId
        });

        console.log('New Purchase Created:', newPurchase);

        res.json({
            message: "You have successfully bought the course"
        });
    } catch (error) {
        console.error("Purchase error:", error);
        res.status(500).json({
            message: "An error occurred while purchasing the course"
        });
    }
})

courseRouter.get("/preview",async function(req,res){
    const courses = await courseModel.find({});

    res.json({
        courses
    })
})

// Fetch user's purchased courses
courseRouter.get("/my-courses", userAuth, async (req, res) => {
    try {
        const userId = req.userId;
        
        // Find all purchases for this user
        const userPurchases = await purchaseModel.find({ userId });
        
        // Extract course IDs from purchases
        const courseIds = userPurchases.map(purchase => purchase.courseId);
        
        // Fetch full course details for purchased courses
        const purchasedCourses = await courseModel.find({
            _id: { $in: courseIds }
        });

        res.json({
            courses: purchasedCourses
        });
    } catch (error) {
        console.error('Error fetching purchased courses:', error);
        res.status(500).json({
            message: "Error fetching purchased courses"
        });
    }
});

module.exports =  {courseRouter : courseRouter}