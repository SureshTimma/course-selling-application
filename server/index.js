const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv")
dotenv.config()

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://csa-client.vercel.app'],
    credentials: true
}));


const {userRouter} = require("./routes/user.js");
const {courseRouter} = require("./routes/course.js");
const {adminRouter} = require("./routes/admin.js");

app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/course",courseRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    const port = process.env.PORT;
    app.listen(port,()=>{
        console.log(`Server is running on ${port}`)
    })
}

main();