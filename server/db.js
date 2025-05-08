const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const user = new schema({
    firstname: String,
    lastname: String,
    email: {type: String, unique: true},
    password: String
})

const admin = new schema({
    firstname: String,
    lastname: String,
    email: {type: String, unique: true},
    password: String
})

const course = new schema({
    title:String,
    desc: String,
    price:Number,
    imageURL:String,
    creatorId:ObjectId
})

const purchase = new schema({
    userId:ObjectId,
    courseId:ObjectId
})


const userModel = mongoose.model("users",user);
const adminModel = mongoose.model("admins",admin, "admin");
const courseModel = mongoose.model("course",course, "course");
const purchaseModel = mongoose.model("purchases",purchase);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};
