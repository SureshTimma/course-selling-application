const express = require("express");
const adminRouter = express.Router();
const cookieParser = require('cookie-parser');

const bcrypt = require("bcrypt");
const {z} = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_SECRET} = require("../config");
const { adminModel, purchaseModel, courseModel } = require("../db");
const {auth} = require("../middleware/adminMw");

adminRouter.use(express.json());
adminRouter.use(cookieParser());


adminRouter.get("/",(req,res)=>{
    res.send("admin route working")
})

adminRouter.post("/signup", async function(req, res) {
    const timeString = new Date().toISOString(); 
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(100).email(),
            firstname: z.string().min(3).max(100),
            lastname: z.string().min(3).max(100),
            password: z.string().min(3).max(30)
        });

        const parsedDataWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedDataWithSuccess.success) {
            res.status(400).json({
                message: "Incorrect format",
                error: parsedDataWithSuccess.error
            });
            return;
        }

        const { email, firstname, lastname, password } = parsedDataWithSuccess.data;

        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({
                message: "Admin with this email already exists"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            timestamp:timeString
        });

        res.json({
            message: "You are signed up",
        });
    } catch (e) {
        res.status(500).json({
            message: "Error while signing up",
            error: e.message
        });
    }
});

adminRouter.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await adminModel.findOne({
        email: email,
    });

    const passwordMatch = await bcrypt.compare(password,user.password)
    // console.log(passwordMatch)

    if (user && passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_ADMIN_SECRET)

        res.cookie("adminJWT", token, {
            sameSite: "Lax",
            secure: false, 
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000, 
            path: "/"
        });

        res.json({
            msg: "cookie set",
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


adminRouter.post("/course",auth, async(req,res)=>{
    const adminId = req.userId;
    const {title,desc,price,imageURL, creatorId} = req.body;
    const course = await courseModel.create({
        title,
        desc,
        price,
        imageURL,
        creatorId:adminId
    })

    res.json({
        msg:"course created",
        courseId:course.id}
    )
})

adminRouter.put("/course",auth, async (req,res)=>{
    const adminId = req.userId;
    const courseId = req.headers['courseid'];
    const {title,desc,price,imageURL} = req.body;

    const updatedCourse = await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },{
        title,
        desc,
        price,
        imageURL
    })

    res.json({
        msg:"course updated",
        updateDetails: updatedCourse
    })
})

adminRouter.get("/course/bulk",auth, async (req,res)=>{
    const adminId = req.userId;
    const courses = await courseModel.find({
            creatorId:adminId
        });

        res.json({
            message:"All courses",
            courses
        })
})

module.exports =  {adminRouter : adminRouter}
