const express = require("express");
const userRouter = express.Router();

const bcrypt = require("bcrypt");
const {z} = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET} = require("../config");
const { userModel, purchaseModel } = require("../db");
const {auth} = require("../middleware/userMw");

userRouter.use(express.json());



userRouter.get("/",(req,res)=>{
    res.send("users route working")
})

userRouter.post("/signup", async function(req, res) {
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

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Admin with this email already exists"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 5);

        await userModel.create({
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

userRouter.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email: email,
    });

    const passwordMatch = await bcrypt.compare(password,user.password)

    if (user && passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_USER_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});

userRouter.get("/purchases",auth, async (req,res)=>{
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    })

    res.json(purchases);

})




module.exports = { userRouter: userRouter };