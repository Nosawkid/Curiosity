const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const port = 5000;
const { Schema } = mongoose
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const multer = require("multer");
const mailer = require('nodemailer');
const { createServer } = require('http')
const { Server } = require('socket.io')
const moment = require("moment");
const { log } = require("console");



const app = express();

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

const PATH = "./public/images";
const upload = multer({
    storage: multer.diskStorage({
        destination: PATH,
        filename: function (req, file, cb) {
            let origialname = file.originalname;
            let ext = origialname.split(".").pop();
            let filename = origialname.split(".").slice(0, -1).join(".");
            cb(null, filename + "." + ext);
        },
    }),
});


app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))





httpServer.listen(port, async () => {
    try {
        await mongoose.connect('mongodb+srv://Curiosity:Curiosity%401122@cluster0.swekyn2.mongodb.net/dbCuriosity')
        console.log(`server is running in ${port}`);
        console.log("db connection established");

    } catch (error) {
        console.error(error);
    }


})




io.on("connection", (socket) => {
    socket.on("JoinRoomFromClient", ({ courseId }) => {
        socket.join(courseId);
        console.log(courseId);
    })

    socket.on("DataFromClient", async ({ message, courseId, uid }) => {

        // socket.join(courseId);


        const newChat = new Chat({
            courseId,
            userId: uid,
            chatContent: message,
        })

        await newChat.save();

        const chatData = await Chat.find({ courseId }).populate({
            path: "courseId",
            model: "schemaCourse",
            populate: {
                path: "instructorId",
                model: "schemaInstructor"
            }
        }).populate({
            path: "userId",
            model: "schemaUser"
        })

        socket.broadcast.to(courseId).emit('chatContentFromServer', ({ chatData }))
        socket.emit('chatContentFromServer', ({ chatData }))

    });
});

// Schemas

//Admin

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },
    adminPassword: {
        type: String,
        required: true,
    }
})
const Admin = mongoose.model('schemaAdmin', adminSchema)

// CategorySchema

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    }
})
const Category = mongoose.model('schemaCategory', categorySchema)

// SubCategory Schema

const subCategorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "schemaCategory",
        required: true
    },
    subCategoryName: {
        type: String,
        required: true
    }
})

const Subcategory = mongoose.model('schemaSubCategory', subCategorySchema)


// Topic Schema

const topicSchema = new mongoose.Schema({
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'schemaSubCategory'
    },
    topicName: {
        type: String,
        required: true
    }
})

const Topic = mongoose.model('schemaTopic', topicSchema)

// LinkSchema

const linkSchema = new mongoose.Schema({
    facebookLink: {
        type: String,
        default: "www.facebook.com"
    },
    twitterLink: {
        type: String,
        default: "www.x.com"
    },
    instagramLink: {
        type: String,
        default: "www.instagram.com"
    },
    linkedInLink: {
        type: String,
        default: "www.linkedin.com"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    }
})

const Link = mongoose.model('schemaLink', linkSchema)

// PROGRESS
const progressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    },
    materialProgress: {
        type: Number,
        default: 0
    },
    materialIndex: {
        type: Number,
        default: 0
    }

})

const Progress = mongoose.model("schemaProgress", progressSchema)

app.patch("/progress/:progressId", async (req, res) => {
    try {
        const { progressId } = req.params
        const { materialProgress, materialIndex } = req.body
        const progress = await Progress.findByIdAndUpdate(progressId, { materialProgress, materialIndex }, { new: true })
        res.status(200).send(progress)
    } catch (error) {
        console.log(error.message);
    }
})


// Fetching progress

app.get("/progress/:userId/:courseId", async (req, res) => {
    try {
        const {
            userId,
            courseId
        } = req.params
        const progress = await Progress.findOne({ userId, courseId })
        res.status(200).send(progress)
    } catch (error) {
        console.log(error.message);
    }
})


// PURCHASED COURSES
const purchaseSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "schemaCourse"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    }
})

const Purchase = mongoose.model("schemaPurchase", purchaseSchema)



// Crud


// app.post("/Link", async (req, res) => {
//     try {
//         const { facebookLink, twitterLink, instagramLink, linkedInLink, userId } = req.body
//         const links = new Link({
//             facebookLink,
//             twitterLink,
//             instagramLink,
//             linkedInLink,
//             userId
//         })
//         await links.save()
//     }
//     catch (err) {
//         console.error(err.message)
//         res.send('Server Error')
//     }
// })

app.get("/Link/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const link = await Link.findOne({ userId })
        res.status(200).send(link)
    }
    catch (err) {
        console.log(err.message)
        res.send("Server Error")
    }
})


// app.put("/Link/:id/edit", async (req, res) => {
//     try {
//         const { id } = req.params
//         let link = await Link.findById(id)
//         if (!link) {
//             return res.status(400).send("Link doesn't exist")
//         }
//         const { linkName } = req.body
//         const existingLinks = await Link.findOne({ linkName, _id: { $ne: id } })
//         if (existingLinks) {
//             return res.status(400).send({ message: "Link already exists" })
//         }
//         link = await Link.findByIdAndUpdate(id, { linkName }, { new: true })
//         res.status(200).send(link)
//     } catch (error) {
//         console.log(error.message);
//         console.log("Server Error");
//     }
// })




//CRUD


//Admin

app.post('/Admin', async (req, res) => {
    try {
        const { adminName, adminEmail, adminPassword } = req.body
        let admin = await Admin.findOne({ adminEmail })

        if (admin) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Admin Email already exists' }] })
        }

        admin = new Admin({
            adminName,
            adminEmail,
            adminPassword
        })

        await admin.save()

        res.send({ message: 'Admin inserted successfully' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }

})




// Categories

app.post('/Category', async (req, res) => {
    try {
        const { categoryName } = req.body
        let category = await Category.findOne({ categoryName })

        if (category) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Category already exists' }] })
        }

        category = new Category({
            categoryName
        })

        await category.save()

        res.send({ message: 'Category inserted successfully' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }

})



app.get('/Category', async (req, res) => {
    try {
        let category = await Category.find()
        if (category)
            res.send(category).status(200)
        else
            res.send([]).status(200)

    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }

})

app.delete("/Category/:id", async (req, res) => {
    try {
        const { id } = req.params
        const subcategories = await Subcategory.find({ categoryId: id })
        for (let sub of subcategories) {
            await Topic.deleteMany({ subCategoryId: sub._id })
        }
        await Subcategory.deleteMany({ categoryId: id })
        await Category.findByIdAndDelete(id)
        res.status(200).send({ message: "Category Deleted" })
    }
    catch (err) {
        console.log(err.message)
    }
})

// Update
app.put("/Category/:id/edit", async (req, res) => {
    try {
        const { id } = req.params
        let category = await Category.findById(id)
        if (!category) {
            return res.status(400).send({ message: "Category not found" })
        }
        const { categoryName } = req.body

        const existing = await Category.findOne({ categoryName, _id: { $ne: id } })
        if (existing) {
            res.status(400).send("Category already present")
        }

        category = await Category.findByIdAndUpdate(id, { categoryName }, { new: true })
        res.status(200).send(category)

    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})



// Links



// Sub Category

app.post("/Subcategory", async (req, res) => {
    try {
        const { subCategoryName } = req.body
        const categoryId = req.body.category
        let sub = await Subcategory.findOne({ subCategoryName })

        if (sub) {
            return (
                res.send("Subcategory already exists")
            )
        }

        sub = new Subcategory({ subCategoryName, categoryId })
        await sub.save()
        res.send("Sub Category Inserted")


    }
    catch (err) {
        console.log(err.message)
        res.send("Server Error")
    }
})


app.get("/Subcategory", async (req, res) => {
    try {
        const sub = await Subcategory.find().populate({
            path: 'categoryId',
            model: 'schemaCategory'
        })
        res.status(200).send(sub)
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})


app.get("/Subcategory/:id", async (req, res) => {
    try {
        const Id = req.params.id;
        const sub = await Subcategory.find({ categoryId: Id })
        res.status(200).send(sub)
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})

app.delete("/Subcategory/:id", async (req, res) => {
    try {
        const { id } = req.params
        await Topic.deleteMany({ subCategoryId: id })
        await Subcategory.findByIdAndDelete(id)
    } catch (error) {
        console.log(error);
        console.log("Server Error");
    }
})



app.put("/Subcategory/:id/edit", async (req, res) => {
    try {
        const { id } = req.params
        let subcategory = await Subcategory.findById(id)
        if (!subcategory) {
            return res.status(400).send("Subcategory doesn't exist")
        }
        const { subCategoryName } = req.body
        const existingSub = await Subcategory.findOne({ subCategoryName, _id: { $ne: id } })
        if (existingSub) {
            return res.status(400).send({ message: "Sub-category already exists" })
        }
        subcategory = await Subcategory.findByIdAndUpdate(id, { subCategoryName }, { new: true })
        res.status(200).send(subcategory)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})




// Topics

app.post("/Topic", async (req, res) => {
    try {
        const { topicName, subCategoryId } = req.body
        let topic = await Topic.findOne({ topicName })

        if (topic) {
            return (
                res.send("Topic already exist")
            )
        }

        topic = new Topic({ topicName, subCategoryId })
        await topic.save()
        res.send("Topic insertion success")
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})


app.get("/Topic", async (req, res) => {
    try {
        const topic = await Topic.find().populate({
            path: 'subCategoryId',
            model: 'schemaSubCategory',
            populate: {
                path: 'categoryId',
                model: 'schemaCategory'
            }
        })

        res.status(200).send(topic)
    }
    catch (err) {
        console.log(err.message)
        res.send("Server Error")
    }

})

app.get("/Topic/:id", async (req, res) => {
    try {
        const { id } = req.params
        const topic = await Topic.find({ subCategoryId: id })
        res.status(200).send(topic)
    }
    catch (err) {
        console.log(err.message)
        res.send({ message: "Server Error" })
    }

})



// Edit
app.put("/Topic/:id/edit", async (req, res) => {
    try {
        const { id } = req.params
        let topic = await Topic.findById(id)
        if (!topic) {
            return res.status(400).send("Topic doesn't exist")
        }
        const { topicName } = req.body
        const existingTopic = await Topic.findOne({ topicName, _id: { $ne: id } })
        if (existingTopic) {
            return res.status(400).send({ message: "Topic already exists" })
        }
        topic = await Topic.findByIdAndUpdate(id, { topicName }, { new: true })
        res.status(200).send(topic)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})




// USER

// schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userContact: {
        type: Number,
        required: true
    },
    userHeadLine: {
        type: String,
        default: null
    },
    userBiography: {
        type: String,
        default: null
    },
    userPhoto: {
        type: String,
        default: null
    },
    // linkId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "schemaLink"
    // }
})

const User = mongoose.model("schemaUser", userSchema)

// userCrud

// creating new user
app.post("/User", async (req, res) => {
    try {
        const { userName, userEmail, userPassword, userContact } = req.body
        const admin = await Admin.findOne({ adminEmail: userEmail })
        const ins = await Instructor.findOne({ instructorEmail: userEmail })
        const portal = await JobPortal.findOne({ jobPortalEmail: userEmail })
        let user = await User.findOne({ userEmail })


        if (admin || user || ins || portal) {
            return res.send({ message: "The email address you entered is already registered with us", status: false })
        }

        user = new User({
            userName,
            userEmail,
            userPassword,
            userContact
        })

        const salt = 12
        user.userPassword = await argon2.hash(userPassword, salt)
        await user.save();
        res.status(200).send({ message: "Account creation success", status: true })
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})


// Displaying all users
app.get("/User", async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})

// Single User

app.get("/User/:id", async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).send(user)
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})

// app.get("/User/:uid/checkPassword/:pass",async(req,res)=>{
//     try {
//         const {uid,pass} = req.params
//         const user = await User.findById(uid)
//         isValidPassword = await argon2.verify(user.userPassword,pass)
//         if(isValidPassword)
//         {
//             res.send(true)

//         }
//         else
//         {
//             res.send(false)
//         }
//     } catch (error) {
//         console.log(error.message)
//     }
// })

app.put("/User/changePassword/:id", async (req, res) => {
    try {

        const { id } = req.params
        let { userPassword, existingPassword } = req.body
        const user = await User.findById(id)
        const isExisting = await argon2.verify(user.userPassword, existingPassword)

        if (isExisting) {
            const salt = 12
            userPassword = await argon2.hash(userPassword, salt)
            let newUserPassword = await User.findByIdAndUpdate(id, { userPassword }, { new: true })
            res.status(200).send((true))
        }
        else {
            return res.send(false)
        }

    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})



// Delete

app.delete("/User/:id", async (req, res) => {
    try {
        const { id } = req.params
        const userToDeleted = await User.findByIdAndDelete(id)
        res.send({ message: "Deleted" })
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})

// Update


app.put("/User/:id/editPhoto",
    upload.fields([
        { name: "userPhoto", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const { id } = req.params

            var fileValue = JSON.parse(JSON.stringify(req.files));
            var userPhoto = `http://127.0.0.1:${port}/images/${fileValue.userPhoto[0].filename}`;
            console.log(userPhoto);


            const updatedUser = await User.findByIdAndUpdate(id, {
                userPhoto
            }, { new: true })
            res.status(200).send(updatedUser)


        } catch (error) {

        }
    })


app.put("/User/:id/edit",
    // upload.fields([
    //     { name: "userPhoto", maxCount: 1 },
    // ]), 
    async (req, res) => {
        try {
            // var fileValue = JSON.parse(JSON.stringify(req.files));
            // var userPhoto = `http://127.0.0.1:${port}/images/${fileValue.userPhoto[0].filename}`;

            const { id } = req.params
            const {
                userName,
                userEmail,
                userContact,
                userHeadLine,
                userBiography,
            } = req.body
            console.log(req.body);

            const existingUserName = await User.findOne({ userName, _id: { $ne: id } })
            if (existingUserName) {
                return (
                    res.status(400).send({ message: "Username already taken" })
                )
            }

            const existingEmails = await User.findOne({ userEmail, _id: { $ne: id } })
            const existingAdminMail = await Admin.findOne({ adminEmail: userEmail })
            const existingPortal = await JobPortal.findOne({ jobPortalEmail: userEmail })
            if (existingEmails || existingAdminMail || existingPortal) {
                return (
                    res.status(400).send("Email already exists")
                )
            }

            const updatedUser = await User.findByIdAndUpdate(id, {
                userName,
                userEmail,
                userContact,
                userHeadLine,
                userBiography,
            }, { new: true })
            const user = await Link.findOne({ userId: id })
            const {
                facebookLink,
                instagramLink,
                twitterLink,
                linkedInLink
            } = req.body
            if (user) {
                const updatedLink = await Link.findByIdAndUpdate(user._id, {
                    facebookLink,
                    instagramLink,
                    twitterLink,
                    linkedInLink
                }, { new: true })
            }
            else {
                const newLinks = new Link({
                    facebookLink,
                    instagramLink,
                    twitterLink,
                    linkedInLink,
                    userId: id
                })
                await newLinks.save()
            }
            res.status(200).send(updatedUser)
        } catch (error) {
            console.log(error.message);
            console.log("Server Error");
        }
    })



// INSTRUCTOR

// schema
const instructorSchema = new Schema({
    instructorName: {
        type: String,
        required: true
    },
    instructorEmail: {
        type: String,
        required: true,
        lowercase: true
    },
    instructorPassword: {
        type: String,
        required: true
    },
    instructorContact: {
        type: String,
        required: true
    },
    instructorHeadLine: {
        type: String,
    },
    instructorPhoto: {
        type: String,
    },
    instructorBio: {
        type: String
    },
    instructorQualification: {
        type: String,
        required: true
    },
    instructorField: {
        type: String,
    },
    instructorProof: {
        type: String,
        required: true
    },
    linkId: {
        type: Schema.Types.ObjectId,
        ref: "schemaLink"
    }
})

const Instructor = mongoose.model("schemaInstructor", instructorSchema)

// Create

app.post("/Instructor",
    upload.fields([
        { name: "instructorProof", maxCount: 1 },
    ]), async (req, res) => {
        try {
            var fileValue = JSON.parse(JSON.stringify(req.files));
            var instructorProofsrc = `http://127.0.0.1:${port}/images/${fileValue.instructorProof[0].filename}`;

            const {
                instructorName,
                instructorEmail,
                instructorPassword,
                instructorContact,
                instructorHeadLine,
                instructorPhoto,
                linkId,
                instructorQualification,
                instructorField,
            } = req.body
            console.log(req.body)

            const admin = await Admin.findOne({ adminEmail: instructorEmail })
            const user = await User.findOne({ userEmail: instructorEmail })
            let instructor = await Instructor.findOne({ instructorEmail })
            const portal = await JobPortal.findOne({ jobPortalEmail: instructorEmail })

            if (admin || user || instructor || portal) {
                return (
                    res.status(400).send("Email already exist")
                )
            }

            instructor = new Instructor({
                instructorName,
                instructorEmail,
                instructorPassword,
                instructorContact,
                instructorHeadLine,
                instructorPhoto,
                linkId,
                instructorQualification,
                instructorField,
                instructorProof: instructorProofsrc
            })
            const salt = 12
            instructor.instructorPassword = await argon2.hash(instructorPassword, salt)
            await instructor.save()
            res.status(200).send("Instructor account creation success")


        } catch (error) {
            console.log(error.message)
            console.log("Server Error")
        }
    })

// Read

app.get("/Instructor", async (req, res) => {
    try {
        const instructors = await Instructor.find()
        res.status(200).send(instructors)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

// View specific instructor
app.get("/Instructor/:id", async (req, res) => {
    try {
        let { id } = req.params


        const instructor = await Instructor.findById(id)
        res.status(200).send(instructor)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})


// Delete

app.delete("/Instructor/:id", async (req, res) => {
    try {
        const { id } = req.params
        const instructorDel = await Instructor.findByIdAndDelete(id)
        res.status(200).send({ message: "Deletion Success" })
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

// Update

app.patch("/Instructor/:id/changepassword", async (req, res) => {
    try {
        const { id } = req.params
        const {
            instructorPassword,
            currentPassword
        } = req.body
        const instructor = await Instructor.findById(id)
        const isValidPassword = await argon2.verify(instructor.instructorPassword, currentPassword)
        if (!isValidPassword) {
            console.log("Mismatch")
            return res.send({ message: "Current Password Mismatch", status: false })
        }
        const salt = 12
        const hashedPassword = await argon2.hash(instructorPassword, salt)
        await Instructor.findByIdAndUpdate(id, { instructorPassword: hashedPassword }, { new: true })
        res.status(200).send({ message: "Password Updated Successfully", status: true })
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

app.patch("/Instructor/:id/edit", upload.fields([
    { name: "instructorPhoto", maxCount: 1 },
]), async (req, res) => {
    try {



        const { id } = req.params
        let instructor = await Instructor.findById(id)
        if (!instructor) {
            return res.status(400).send({ message: "Instructor doesn't exist" })
        }

        let instructorPhoto = instructor.instructorPhoto
        if (req.files && req.files.instructorPhoto && req.files.instructorPhoto[0]) {
            var fileValue = JSON.parse(JSON.stringify(req.files));
            instructorPhoto = `http://127.0.0.1:${port}/images/${fileValue.instructorPhoto[0].filename}`;
        }

        const {
            instructorName,
            instructorEmail,
            instructorContact,
            instructorHeadLine,
            instructorBio,
            instructorQualification,
            instructorField,

        } = req.body

        const existingInstructorEmail = await Instructor.findOne({ instructorEmail, _id: { $ne: id } })
        const existingUserMail = await User.findOne({ userEmail: instructorEmail })
        const existingPortal = await JobPortal.findOne({ jobPortalEmail: instructorEmail })

        if (existingInstructorEmail || existingPortal || existingUserMail) {
            return res.status(400).send({ message: "Email already exists" })
        }

        instructor = await Instructor.findByIdAndUpdate(id, {
            instructorName,
            instructorEmail,
            instructorContact,
            instructorHeadLine,
            instructorBio,
            instructorQualification,
            instructorField,
            instructorPhoto
        }, { new: true })
        res.status(200).send(instructor)

    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})



// COURSE

// schema

const courseSchema = new Schema({
    courseTitle: {
        type: String,
        required: true
    },
    instructorId: {
        type: Schema.Types.ObjectId,
        ref: "schemaInstructor"
    },
    topicId: {
        type: Schema.Types.ObjectId,
        ref: "schemaTopic"
    },
    courseDesc: {
        type: String,
        required: true
    },
    courseDateTime: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        required: true
    },
    courseImage: {
        type: String
    },
    courseAvg:{
        type:Number,
        default:0
    }
})



const Course = mongoose.model("schemaCourse", courseSchema)

// Crud

// Create

app.post("/Course", upload.fields([
    { name: "courseImage", maxCount: 1 },
]), async (req, res) => {
    try {
        let courseImage = ""
        if (req.files && req.files.courseImage && req.files.courseImage[0]) {
            var fileValue = JSON.parse(JSON.stringify(req.files));
            courseImage = `http://127.0.0.1:${port}/images/${fileValue.courseImage[0].filename}`;
        }
        const {
            courseTitle,
            instructorId,
            topicId,
            courseDesc,
            courseDateTime,
            price
        } = req.body


        let course = await Course.findOne({ courseTitle })
        if (course) {
            return (
                res.status(400).send({ message: "Course with same name already exist", status: false })
            )
        }

        course = new Course({
            courseTitle,
            instructorId,
            topicId,
            courseDesc,
            courseDateTime,
            price,
            courseImage
        })
        await course.save();
        res.status(200).send({ message: "Course Added", status: true })
    } catch (error) {
        console.log(error.message)
        console.log({ message: "Server Error", status: false })
    }
})


// Read

app.get("/Course", async (req, res) => {
    try {
        const courses = await Course.find().populate({
            path: "instructorId",
            model: "schemaInstructor"
        }).populate({
            path: "topicId",
            model: "schemaTopic",
            populate: {
                path: "subCategoryId",
                model: "schemaSubCategory",
                populate: {
                    path: "categoryId",
                    model: "schemaCategory"
                }
            }
        })
        res.status(200).send(courses)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

// Specific Course

app.get("/Course/:id", async (req, res) => {
    try {
        const { id } = req.params
        const course = await Course.findById(id).populate({
            path: "instructorId",
            model: "schemaInstructor"
        }).populate({
            path: "topicId",
            model: "schemaTopic",
            populate: {
                path: "subCategoryId",
                model: "schemaSubCategory",
                populate: {
                    path: "categoryId",
                    model: "schemaCategory"
                }
            }
        })
        res.status(200).send(course)
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})

// Course based on category
app.get("/Course/:categoryId/:userId/category", async (req, res) => {
    try {
        const { categoryId, userId } = req.params;



        const subcategories = await Subcategory.find({ categoryId });
        const subCatIds = subcategories.map(sub => sub._id);


        const topics = await Topic.find({ subCategoryId: { $in: subCatIds } });


        const topicIds = topics.map(topic => topic._id);


        const purchasedCourses = await Purchase.find({ userId });
        const purchasedCourseIds = purchasedCourses.map(course => course.courseId);


        const courses = await Course.find({
            topicId: { $in: topicIds },
            _id: { $nin: purchasedCourseIds },
            __v: 1
        }).populate({
            path: 'instructorId',
            model: 'schemaInstructor'
        });

        res.status(200).send(courses);

    } catch (error) {
        console.log(error.message);
    }
})

// Course from instructor

app.get("/CourseFromIns/:insid", async (req, res) => {
    try {
        let { insid: id } = req.params


        const courses = await Course.find({ instructorId: id }).populate({
            path: "instructorId",
            model: "schemaInstructor"
        }).populate({
            path: "topicId",
            model: "schemaTopic",
            populate: {
                path: "subCategoryId",
                model: "schemaSubCategory",
                populate: {
                    path: "categoryId",
                    model: "schemaCategory"
                }
            }
        })

        res.status(200).send(courses)
    } catch (error) {
        console.log(error.message)
        console.log("Server Eror")
    }
})



// Delete

app.delete("/Course/:id", async (req, res) => {
    try {
        const { id } = req.params

        const sections = await Section.find({ courseId: id })

        for (let section of sections) {
            await Material.deleteMany({ sectionId: section._id })
        }

        await Section.deleteMany({ courseId: id })
        await Course.findByIdAndDelete(id)
        res.status(200).send({ message: "Course Deleted", status: true })
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})


// Update
app.put("/Course/:id/edit", async (req, res) => {
    try {
        const { id } = req.params
        let course = await Course.findById(id)
        if (!course) {
            return res.status(400).send({ message: "No Course found" })
        }
        const { courseTitle, courseDesc } = req.body
        const existingCourse = await Course.findOne({ courseTitle, _id: { $ne: id } })
        if (existingCourse) {
            return res.status(400).send("Name already exist for a different course, try another one")
        }
        course = await Course.findByIdAndUpdate(id, { courseTitle, courseDesc }, { new: true })
        res.status(200).send(course)
    }
    catch (e) {
        console.log(e.message);
        console.log("Server Error");

    }
})

app.put("/Course/:id/publish", async (req, res) => {
    try {
        const { id } = req.params
        const sections = await Section.find({ courseId: id })
        const sectionIds = sections.map(section => section._id)
        const materials = await Material.find({ sectionId: { $in: sectionIds } })
        if (materials.length < 5) {
            return res.send({ message: "You need atleast 5 materials to publish this course", status: false })
        }
        const course = await Course.findByIdAndUpdate(id, { __v: 1 }, { new: true })
        res.status(200).send({ message: "Course Published Successfully", status: true })
    } catch (error) {
        console.log(error.message)
        res.send({ message: error.message, status: false })
    }
})

// Getting all course except purchased ones

app.get("/Course/:userId/notPurchased", async (req, res) => {
    try {
        const { userId } = req.params
        const purchasedCourses = await Purchase.find({ userId })
        const purchasedCourseIds = purchasedCourses.map(course => course.courseId);
        const courses = await Course.find({ _id: { $nin: purchasedCourseIds }, __v: 1 })
        res.status(200).send(courses)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})


// SECTION
// schema

const sectionSchema = new Schema({
    sectionName: {
        type: String,
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "schemaCourse"
    },
    sectionNumber: {
        type: Number
    }
})
const Section = mongoose.model("schemaSection", sectionSchema)

// crud

// create

app.post("/Section", async (req, res) => {
    try {
        const {
            sectionName,
            courseId,
            sectionNumber
        } = req.body

        let section = await Section.findOne({ sectionName })

        if (section) {
            return (
                res.status(400).send("Section already Exist")
            )
        }

        section = new Section({
            sectionName,
            courseId,
            sectionNumber
        })

        await section.save();
        res.status(200).send(section)

    } catch (error) {
        console.error(error.message)
        console.log("Server Error")
    }
})

// Read

app.get("/Section", async (req, res) => {
    try {
        const sections = await Section.find().populate({
            path: "courseId",
            model: "schemaCourse"
        })
        res.status(200).send(sections)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

// Read One

app.get("/Section/:id", async (req, res) => {
    try {
        const { id } = req.params
        const section = await Section.findById(id).populate({
            path: "courseId",
            model: "schemaCourse"
        })
        res.status(200).send(section)
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})


// Delete

app.delete("/Section/:id", async (req, res) => {
    try {
        const { id } = req.params
        const section = await Section.findByIdAndDelete(id)
        res.status(200).send({ message: "Deletion Success" })
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})



// Reading section based on course
app.get("/Course/:courseId/section", async (req, res) => {
    try {
        const { courseId } = req.params
        const sections = await Section.find({ courseId }).populate({
            path: "courseId",
            model: "schemaCourse"
        })
        res.status(200).send(sections)
    } catch (error) {
        console.log(error.message);
    }
})

// Update
app.put("/Section/:id/edit", async (req, res) => {
    try {
        const { id } = req.params
        let section = await Section.findById(id)
        if (!section) {
            return res.status(400).send("No Section found")
        }
        const { sectionName } = req.body

        section = await Section.findByIdAndUpdate(id, { sectionName }, { new: true })
        res.status(200).send(section)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})



// MATERIAL

const materialSchema = new Schema({
    sectionId: {
        type: Schema.Types.ObjectId,
        ref: "schemaSection"
    },
    materialTitle: {
        type: String,
        required: true,
    },
    materialDesc: {
        type: String
    },
    materialFile: {
        type: String,
        required: true
    }
})

const Material = mongoose.model("schemaMaterial", materialSchema)

// crud

// create

app.post("/Material", upload.fields([
    { name: "materialFile", maxCount: 1 },
]), async (req, res) => {
    try {

        var fileValue = JSON.parse(JSON.stringify(req.files));
        var materialFile = `http://127.0.0.1:${port}/images/${fileValue.materialFile[0].filename}`;
        const {
            sectionId,
            materialTitle,
            materialDesc,
        } = req.body

        let material = await Material.findOne({ materialTitle, sectionId })

        if (material) {
            return (
                res.status(400).send("Material already Exist")
            )
        }

        material = new Material({
            sectionId,
            materialTitle,
            materialDesc,
            materialFile
        })

        await material.save();
        res.status(200).send("Material added successfully")

    } catch (error) {
        console.error(error.message)
        console.log("Server Error")
    }
})

// Read

app.get("/Material", async (req, res) => {
    try {
        const material = await Material.find().populate({
            path: "sectionId",
            model: "schemaSection",
            populate: {
                path: "courseId",
                model: "schemaCourse",
                populate: {
                    path: "instructorId",
                    model: "schemaInstructor"
                }
            }
        })
        res.status(200).send(material)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

//  Read One

app.get("/Material/:id", async (req, res) => {
    try {
        const { id } = req.params
        const material = await Material.findById(id).populate({
            path: "sectionId",
            model: "schemaSection",
            populate: {
                path: "courseId",
                model: "schemaCourse",
                populate: {
                    path: "instructorId",
                    model: "schemaInstructor"
                }
            }
        })
        res.status(200).send(material)
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})

// Delete

app.delete("/Material/:id", async (req, res) => {
    try {
        const { id } = req.params
        const material = await Material.findByIdAndDelete(id)
        res.status(200).send({ message: "Deletion Success" })
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})

// Material based on section

app.get("/section/:id/material", async (req, res) => {
    try {
        const { id } = req.params
        const materials = await Material.find({ sectionId: id })
        res.status(200).send(materials)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

app.put("/material/:id/edit", async (req, res) => {
    try {
        const { id } = req.params
        let material = await Material.findById(id)
        if (!material) {
            return res.status(400).send({ message: "No material found" })
        }
        const { materialTitle, materialDesc, materialFile } = req.body

        material = await Material.findByIdAndUpdate(id, {
            materialTitle,
            materialDesc,
            materialFile
        }, { new: true })
        res.status(400).send(material)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

// BOOKING
// schema
const bookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "userSchema"
    },
    price: {
        type: Number,
        default: 0
    },
    orderId: {
        type: String,
        default: null
    }
})

const Booking = mongoose.model("schemaBooking", bookingSchema)

// crud
// // create

app.get("/Totalbooking", async (req, res) => {
    try {
        const sum = await Booking.aggregate([
            {
                $match: {
                    __v: 1
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$price"
                    }
                }
            }
        ])
        res.status(200).send({ total: sum[0].total })
    } catch (error) {
        console.log(error.message);
    }
})

app.post("/Booking", async (req, res) => {
    try {
        const {
            userId,
            bookingStatus,
            price
        } = req.body

        const booking = new Booking({
            userId,
            bookingStatus,
            price
        })

        await booking.save();
        res.status(200).send("Booking added successfully")

    } catch (error) {
        console.error(error.message)
        console.log("Server Error")
    }
})

// // Read

app.get("/Booking", async (req, res) => {
    try {
        const booking = await Booking.find().populate({
            path: "userId",
            model: "schemaUser"
        })
        res.status(200).send(booking)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

// // Read One

app.get("/Booking/:id", async (req, res) => {
    try {
        const { id } = req.params
        const booking = await Booking.findOne({ userId: id, __v: 0 }).populate({
            path: "userId",
            model: "schemaUser"
        })
        res.status(200).send(booking)
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})

// Delete

app.delete("/Booking/:id", async (req, res) => {
    try {
        const { id } = req.params
        const booking = await Booking.findByIdAndDelete(id)
        res.status(200).send({ message: "Deletion Success" })
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})


// Booking
// schema

const cartSchema = new Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: "schemaBooking"
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "schemaCourse"
    },
    cartStatus: {
        type: Number,
        default: 0
    }
})


const Cart = mongoose.model("schemaCart", cartSchema)

// crud


app.post("/Cart", async (req, res) => {
    try {
        const {
            userId,
            courseId
        } = req.body







        let booking = await Booking.findOne({ userId, __v: 0 })
        if (!booking) {
            const randmomNo = Math.floor(Math.random() * 900000) + 100000
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Zero-pad the month
            const day = String(currentDate.getDate()).padStart(2, '0'); // Zero-pad the day

            const orderId = `CUR-${year}${month}${day}-${randmomNo}`


            const newBooking = new Booking({
                userId,
                orderId
            })
            booking = await newBooking.save()
        }

        const existingCart = await Cart.findOne({ courseId, bookingId: booking._id })
        if (existingCart) {
            return res.send(false)
        }

        const cart = new Cart({
            courseId,
            bookingId: booking._id
        })

        await cart.save()
        const course = await Course.findById(courseId)
        await Booking.findByIdAndUpdate(booking._id, { price: booking.price + course.price }, { new: true })
        return res.status(200).send({ message: "Added to cart" })

    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})


app.get("/Cart", async (req, res) => {
    try {
        const carts = await Cart.find().populate({
            path: "bookingId",
            model: "schemaBooking",
            populate: {
                path: "userId",
                model: "schemaUser"
            }
        }).populate({
            path: "courseId",
            model: "schemaCourse",
            populate: {
                path: "instructorId",
                model: "schemaInstructor"
            }
        })

        res.status(200).send(carts)

    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

// Read from specific user

app.get("/Cart/:id", async (req, res) => {
    try {
        const { id } = req.params
        const booking = await Booking.findOne({ userId: id, __v: 0 })
        const carts = await Cart.find({ bookingId: booking._id }).populate({
            path: "bookingId",
            model: "schemaBooking",
            populate: {
                path: "userId",
                model: "schemaUser"
            }
        }).populate({
            path: "courseId",
            model: "schemaCourse",
            populate: {
                path: "instructorId",
                model: "schemaInstructor"
            }
        })

        res.status(200).send(carts)

    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

// Remove Cart

app.delete("/DeleteCart/:delId", async (req, res) => {
    try {
        const { delId } = req.params
        const cart = await Cart.findById(delId)
        const course = await Course.findById(cart.courseId)
        const booking = await Booking.findById(cart.bookingId)
        await Booking.findByIdAndUpdate(booking._id, { price: booking.price - course.price }, { new: true })
        const deleteCart = await Cart.findByIdAndDelete(delId)
        res.status(200).send({ message: "Item removed from cart" })
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})


// WISHLIST
// schema

const wishlistSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "schemaCourse"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    }
})

const Wishlist = mongoose.model("schemaWishlist", wishlistSchema)

// crud

// create

app.post("/wishlist", async (req, res) => {
    try {
        const { courseId, userId } = req.body


        const wish = await Wishlist.findOne({ courseId, userId })

        if (wish) {
            return (
                res.send({ message: "Already Present in the wishlist", status: false })
            )
        }

        const wishlist = new Wishlist({
            courseId,
            userId
        })
        await wishlist.save();
        res.status(200).send({ message: "Added to Wishlist", status: true })
    }
    catch (err) {
        console.log(err.message)
        console.log("Server Error")
    }
})

// Read

app.get("/wishlist", async (req, res) => {
    try {
        const wishlist = await Wishlist.find().populate({
            path: "courseId",
            model: "schemaCourse"
        }).populate({
            path: "userId",
            model: "schemaUser"
        })
        res.status(200).send(wishlist)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

// Read One

app.get("/wishlist/:id", async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ userId: req.params.id }).populate({
            path: "courseId",
            model: "schemaCourse",
            populate: {
                path: "instructorId",
                model: "schemaInstructor"
            }
        }).populate({
            path: "userId",
            model: "schemaUser"
        })
        res.status(200).send(wishlist)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})


// Delete
app.delete("/wishlist/:id", async (req, res) => {
    try {
        const wishlist = await Wishlist.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Removed from wishlist" })
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})


// REVIEW
// schema

const reviewSchema = new Schema({
    reviewTitle: {
        type: String,
        required: true
    },
    reviewContent: {
        type: String,
        required: true
    },
    reviewDateTime: {
        type: Date,
        default: Date.now()
    },
    reviewRating: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "schemaCourse"
    }
})

const Review = mongoose.model("schemaReview", reviewSchema)

// crud
// create
app.post("/Review", async (req, res) => {
    try {
        const {
            reviewTitle,
            reviewContent,
            reviewDateTime,
            reviewRating,
            userId,
            courseId
        } = req.body
        const existingReview = await Review.findOne({ userId, courseId })
        if (existingReview) {
            return res.status(400).send({ message: "You have already reviewed this course", status: false })
        }
        const newReview = new Review({
            reviewTitle,
            reviewContent,
            reviewDateTime,
            reviewRating,
            userId,
            courseId
        })
        await newReview.save()

        const reviews = await Review.find({courseId})
        const fiveRatings = reviews.filter((ele)=> ele.reviewRating === 5).length
        const fourRatings = reviews.filter((ele)=> ele.reviewRating === 4).length
        const threeRatings = reviews.filter((ele)=> ele.reviewRating === 3).length
        const twoRatings = reviews.filter((ele)=> ele.reviewRating === 2).length
        const oneRatings = reviews.filter((ele)=> ele.reviewRating === 1).length

        const weightedAvg = ((5*fiveRatings + 4 * fourRatings + 3 * threeRatings + 2 * twoRatings + 1 * oneRatings)/(fiveRatings + fourRatings + threeRatings + twoRatings + oneRatings))
        const updateCourseRating = await Course.findByIdAndUpdate(courseId,{courseAvg:weightedAvg},{new:true})

        res.status(200).send("Review Added")
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

// read


app.get("/review", async (req, res) => {
    try {
        const reviews = await Review.find().populate({
            path: "userId",
            model: 'schemaUser',
            select: "userName userHeadLine"
        })
        res.status(200).send(reviews)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error");
    }
})

// View One based on userid
app.get("/review/:userId/:courseId", async (req, res) => {
    try {
        const { userId,courseId } = req.params
        const review = await Review.find({ userId ,courseId}).populate({
            path: "userId",
            model: 'schemaUser',
            select: "userName userHeadLine"
        })

        if (!review) {
            return (
                res.status(404).send("Review Not found")
            )
        }
        res.status(200).send(review)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

// Based on courses
app.get("/Coursereview/:courseId", async (req, res) => {
   
    try {
        const { courseId } = req.params
        
        const review = await Review.find({ courseId }).populate({
            path: "userId",
            model: 'schemaUser',

        })

        if (!review) {
            return (
                res.status(404).send("Review Not found")
            )
        }
        res.status(200).send(review)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})

// Based on review
app.get("/Review/:rating/:courseId/review", async (req, res) => {
    try {
        const { rating, courseId } = req.params
        const reviews = await Review.find({ reviewRating: rating, courseId }).populate({
            path: "userId",
            model: 'schemaUser',

        })
        res.status(200).send(reviews)
    } catch (error) {
        console.log(error.message);
    }
})

// Delete One
app.delete("/review/:id", async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Review Deleted" })
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
    }
})


// Update
app.put("/review/:id/edit", async (req, res) => {
    const { id } = req.params
    let review = await Review.findById(id)
    if (!review) {
        return res.status(400).send({ message: "Review doen't exist" })
    }
    const {
        reviewTitle,
        reviewContent
    } = req.body
    review = await Review.findByIdAndUpdate(id, {
        reviewTitle,
        reviewContent
    }, { new: true })
    res.status(200).send(review)
})

// COMMENT

// schema

const commentSchema = new Schema({
    commentContent: {
        type: String,
        required: true
    },
    materialId: {
        type: Schema.Types.ObjectId,
        ref: "schemaMaterial"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    }
})

const Comment = mongoose.model("schemaComment", commentSchema)

// Crud

app.post("/Comment", async (req, res) => {
    try {
        const {
            commentContent,
            materialId,
            userId
        } = req.body

        const newComment = new Comment({
            commentContent,
            materialId,
            userId
        })
        await newComment.save()
        res.status(200).send({ message: "Comment Added" })
    } catch (error) {
        console.log(error.message);
        console.log("Server Error")
    }
})

// Read

app.get("/Comment", async (req, res) => {
    try {
        const comments = await Comment.find().populate({
            path: "materialId",
            model: "schemaMaterial",
        }).populate({
            path: "userId",
            model: "schemaUser"
        })
        if (!comments) {
            return (
                res.status(404).send({ message: "No data found" })
            )
        }
        res.status(200).send(comments)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error");
    }
})

// Delete One

app.delete("/Comment/:id", async (req, res) => {
    try {
        const { id } = req.params
        const comment = await Comment.findByIdAndDelete(id)
        res.status(200).send({ message: "Comment Deleted" })

    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

// CHAT
// Schema

const chatSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "schemaCourse"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    },
    chatContent: {
        type: String,
        required: true
    },
    chatDateTime: {
        type: Date,
        default: Date.now()
    }
})

const Chat = mongoose.model("schemaChat", chatSchema)

// Crud
// Create


app.get("/Chat", async (req, res) => {
    try {
        const chats = await Chat.find().populate({
            path: "courseId",
            model: "schemaCourse",
            populate: {
                path: "instructorId",
                model: "schemaInstructor"
            }
        }).populate({
            path: "userId",
            model: "schemaUser"
        })
        res.status(200).send(chats)
    } catch (error) {
        console.log(error.message)
        console.log("Server Error");
    }
})

app.get("/Chat/:courseId", async (req, res) => {
    try {
        const { courseId } = req.params
        const chats = await Chat.find({ courseId }).populate({
            path: "courseId",
            model: "schemaCourse",
            populate: {
                path: "instructorId",
                model: "schemaInstructor"
            }
        }).populate({
            path: "userId",
            model: "schemaUser"
        })
        res.status(200).send(chats)
    } catch (error) {
        console.log(error.message);
        res.send({ message: error.message, status: false })
    }
})

// Delete 
app.delete("/Chat/:id", async (req, res) => {
    try {
        const chat = await Chat.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Message Deleted" })
    } catch (error) {
        t
        console.log(error.message)
        console.log("Server Error");
    }
})

// CERTIFICATE

const certificateSchema = new Schema({
    certificateIsseDate: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "schemaCourse"
    }
})

const Certificate = mongoose.model("schemaCertificate", certificateSchema)

// Crud
// Create
app.post("/Certificate", async (req, res) => {
    try {
        const {

            userId,
            courseId
        } = req.body

        const newCertificate = new Certificate({
            certificateFile,
            userId,
            courseId
        })
        await newCertificate.save()
        res.status(200).send({ message: "Certificate Added" })
    } catch (error) {
        console.log(error.message)
        console.log("Server Error");
    }
})

// Read

app.get("/Certificate", async (req, res) => {
    try {
        const certificates = await Certificate.find().populate({
            path: "courseId",
            model: "schemaCourse",
            populate: {
                path: "instructorId",
                model: "schemaInstructor"
            }
        }).populate({
            path: "userId",
            model: "schemaUser"
        })
        res.status(200).send(certificates)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})


// Read One

app.get("/Certificate/:id", async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id).populate({
            path: "courseId",
            model: "schemaCourse",
            populate: {
                path: "instructorId",
                model: "schemaInstructor"
            }
        }).populate({
            path: "userId",
            model: "schemaUser"
        })
        res.status(200).send(certificate)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

// Delete

app.delete("/Certificate/:id", async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Certificate Deleted" })
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})


// JOB-PORTAL
// Schema

const jobPortalSchema = new Schema({
    jobPortalName: {
        type: String,
        required: true
    },
    jobPortalContact: {
        type: String,
        required: true
    },
    jobPortalEmail: {
        type: String,
        required: true
    },
    jobPortalCompanyName: {
        type: String,
        required: true
    },
    jobPortalProof: {
        type: String,
        required: true
    },
    jobPortalDetails: {
        type: String,
        default: null
    },
    jobPortalPassword: {
        type: String,
        required: true
    },
    jobPortalPhoto: {
        type: String,
        default: null
    },
    jobPortalStatus: {
        type: Number,
        default: 0
    },
    jobPortalIdType: {
        type: String,
        enum: ["Aadhar", "Voter Id", "Pan Card"]
    }

})

const JobPortal = mongoose.model("schemaJobPortal", jobPortalSchema)

// Crud
// Create

app.post("/Jobportal", upload.fields([
    { name: "jobPortalProof", maxCount: 1 },
]), async (req, res) => {
    try {

        var fileValue = JSON.parse(JSON.stringify(req.files));
        var jobPortalProof = `http://127.0.0.1:${port}/images/${fileValue.jobPortalProof[0].filename}`;

        const {
            jobPortalName,
            jobPortalEmail,
            jobPortalContact,
            jobPortalDetails,
            jobPortalPassword,
            jobPortalPhoto,
            jobPortalStatus,
            jobPortalCompanyName,
            jobPortalIdType
        } = req.body

        let portal = await JobPortal.findOne({ jobPortalEmail })
        const user = await User.findOne({ userEmail: jobPortalEmail })
        const instructor = await Instructor.findOne({ instructorEmail: jobPortalEmail })
        const admin = await Admin.findOne({ adminEmail: jobPortalEmail })

        if (portal || user || instructor || admin) {
            return (
                res.send({ message: "Email already registered with a user", status: false })
            )
        }

        portal = new JobPortal({
            jobPortalName,
            jobPortalEmail,
            jobPortalContact,
            jobPortalProof,
            jobPortalDetails,
            jobPortalPassword,
            jobPortalPhoto,
            jobPortalStatus,
            jobPortalCompanyName,
            jobPortalIdType
        })

        const salt = 12;
        portal.jobPortalPassword = await argon2.hash(jobPortalPassword, salt)
        await portal.save();
        res.status(200).send({ message: "Account Created", status: true })


    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
        res.send({ message: "Something Went wrong", status: false })
    }
})

// Read

app.get("/Jobportal", async (req, res) => {
    try {
        const portals = await JobPortal.find()
        res.status(200).send(portals)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

app.get("/Jobportal/:id", async (req, res) => {
    try {
        const { id } = req.params
        const portals = await JobPortal.findById(id)
        res.status(200).send(portals)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

app.delete("/Jobportal/:id", async (req, res) => {
    try {
        const portal = await JobPortal.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Deleted" })
    } catch (error) {

    }
})


app.put("/Jobportal/:id/edit", async (req, res) => {
    try {

        const { id } = req.params
        let portal = await JobPortal.findById(id)
        if (!portal) {
            return res.status(400).send({ message: "No Job Portal account found" })
        }

        const {
            jobPortalName,
            jobPortalEmail,
            jobPortalContact,
            jobPortalDetails,
        } = req.body

        const existingPortal = await JobPortal.findOne({ jobPortalEmail, _id: { $ne: id } })
        const existingUser = await User.findOne({ userEmail: jobPortalEmail })
        const existingInstructor = await Instructor.findOne({ instructorEmail: jobPortalEmail })
        const existingAdmin = await Admin.findOne({ adminEmail: jobPortalEmail })

        if (existingAdmin || existingInstructor || existingPortal || existingUser) {
            return res.status(400).send({ message: "Email already taken" })
        }

        portal = await JobPortal.findByIdAndUpdate(id, {
            jobPortalName,
            jobPortalEmail,
            jobPortalContact,
            jobPortalDetails,
        }, { new: true })
        res.status(200).send(portal)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }

})

// VACANCY

// Schema

const vacancySchema = new Schema({
    jobPortalId: {
        type: Schema.Types.ObjectId,
        ref: "schemaJobPortal"
    },
    vacancyTitle: {
        type: String,
        required: true
    },
    vacancyDesc: {
        type: String,
        required: true
    },
    minSalary: {
        type: Number,
        default: true
    },
    maxSalary: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "schemaCategory"
    },
    vacancyDate: {
        type: Date,
        default: Date.now()
    },
    vacancyRequirement: {
        type: String,
    },
    vacancyStatus: {
        type: Number,
        default: 0
    },
    vacancyTime: {
        type: String,
        required: true
    }

})

const Vacancy = mongoose.model("schemaVacancy", vacancySchema)



// Crud

app.post("/Vacancy", async (req, res) => {
    try {
        const {
            jobPortalId,
            vacancyTitle,
            vacancyDesc,
            minSalary,
            maxSalary,
            categoryId,
            vacancyDate,
            vacancyRequirement,
            vacancyTime
        } = req.body

        const newVacancy = new Vacancy({
            jobPortalId,
            vacancyTitle,
            vacancyDesc,
            minSalary,
            maxSalary,
            categoryId,
            vacancyDate,
            vacancyRequirement,
            vacancyTime
        })

        await newVacancy.save()
        res.status(200).send({ message: "Vacancy Added", status: true })
    } catch (err) {
        console.log(err.message);
        console.log("Server Error");
    }
})

// Read

app.get("/Vacancy", async (req, res) => {
    try {
        const vacancies = await Vacancy.find().populate({
            path: "categoryId",
            model: "schemaCategory"
        }).populate({
            path: "jobPortalId",
            model: "schemaJobPortal"
        })
        console.log(vacancies);
        res.status(200).send(vacancies)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

// Finding vacancy based on hirer
app.get("/Vacancy/:jobPortalId", async (req, res) => {
    try {
        const { jobPortalId } = req.params
        const jobs = await Vacancy.find({ jobPortalId })
        res.status(200).send(jobs)
    } catch (error) {
        console.log(error.message);
    }
})


// Delete

app.delete("/Vacancy/:id", async (req, res) => {
    try {
        await Application.deleteMany({ jobVacancyId: req.params.id });
        const vacancy = await Vacancy.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Deletion Success" })
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})


// JOB APPLICATION
// Schema

const jobApplicationSchema = new Schema({
    jobVacancyId: {
        type: Schema.Types.ObjectId,
        ref: "schemaJobVacancy"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    },
    experience: [String],
    qualifications: [String],
    skills: [String],
    applicationDate: {
        type: Date,
        default: Date.now()
    }

})

const Application = mongoose.model("schemaJobApplication", jobApplicationSchema)

app.post("/Application", async (req, res) => {
    try {
        const {
            jobVacancyId,
            userId,
            experience,
            qualifications,
            skills
        } = req.body
        const existing = await Application.findOne({ userId, jobVacancyId })
        if (existing) {
            return res.send({ message: "Already Applied for this job", status: false })
        }
        const newApplication = new Application({
            jobVacancyId,
            userId,
            experience,
            qualifications,
            skills
        })

        await newApplication.save()
        res.status(200).send({ message: "Application Added", status: true })
    } catch (err) {
        console.log(err.message);
        console.log("Server Error");
    }
})

app.get("/Application/:vacancyId", async (req, res) => {
    try {
        const { vacancyId } = req.params
        const applications = await Application.find({ jobVacancyId: vacancyId, __v: 0 }).populate({
            path: "userId",
            model: "schemaUser"
        })
        console.log(applications)
        res.status(200).send(applications)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})
// Individual application
app.get("/Application/:appId/userApplication", async (req, res) => {
    try {
        const { appId } = req.params
        const applications = await Application.findById(appId).populate({
            path: "userId",
            model: "schemaUser"
        })
        console.log(applications)
        res.status(200).send(applications)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})



app.delete("/Application/:id", async (req, res) => {
    try {
        const applications = await Application.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Deleted" })
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})



// Login
app.post("/Login", async (req, res) => {
    try {
        let id;
        let type;
        let isValidPassword = false
        const { Email, Password } = req.body
        const user = await User.findOne({ userEmail: Email })
        const instructor = await Instructor.findOne({ instructorEmail: Email })
        const portal = await JobPortal.findOne({ jobPortalEmail: Email })
        const admin = await Admin.findOne({ adminEmail: Email })



        if (user) {
            isValidPassword = await argon2.verify(user.userPassword, Password)
            if (isValidPassword) {
                id = user._id
                type = "User"
            }
            else {
                console.log("Invalid Login Credentials")
            }
        }

        else if (instructor) {

            isValidPassword = await argon2.verify(instructor.instructorPassword, Password)
            if (isValidPassword) {
                if (instructor.__v === 0) {
                    return res.send({ message: "You haven't been verified yet" })
                }
                id = instructor._id
                type = "Instructor"

            }
        }
        else if (portal) {
            isValidPassword = await argon2.verify(portal.jobPortalPassword, Password)
            if (isValidPassword) {
                id = portal._id
                type = "Jobportal"
            }
        }
        else if (admin) {

        }
        else {
            return res.send({ message: "Invalid Credentials" })
        }

        const payload = {
            id,
            type,

        }


        res.json({ payload });


    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})


// Single Course buying
app.post("/Checkout", async (req, res) => {
    try {
        const {
            userId,
            courseId,
            orderId
        } = req.body
        const booking = new Booking({
            userId
        })

        let savedBooking = await booking.save()

        const cart = new Cart({
            courseId,
            bookingId: savedBooking._id
        })
        const savedCart = await cart.save()
        const course = await Course.findById(courseId)
        const user = await User.findById(userId)
        const existingBooking = await Booking.findByIdAndUpdate(savedBooking._id, { __v: 1, price: course.price, orderId }, { new: true })
        const existingPurchase = await Purchase.findOne({ userId, courseId })
        if (!existingPurchase) {
            const purchase = new Purchase({
                userId,
                courseId
            })
            await purchase.save()

            const progress = new Progress({
                userId,
                courseId
            })
            await progress.save()
        }
        else {
            return res.send({ message: "Course already bought", status: false })
        }
        const date = new Date();
        const months = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const monthIndex = date.getMonth();
        const month = months[monthIndex];
        const day = date.getDate();
        const year = date.getFullYear();

        const formattedDate = `${month} ${day}, ${year}`;
        const prefix = "CUR";
        const length = 8; // Change this to adjust the length of the random numbers portion
        let invoiceCode = prefix;

        for (let i = 0; i < length - prefix.length; i++) {
            const randomNumber = Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
            invoiceCode += randomNumber;
        }
        let content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate</title>
    <style>
        body {
            width: 100%;
            height: 100vh;
            margin: 0;
            padding: 0;
            font-family: "Ubuntu", sans-serif;
            color: #003f88;
        }
        
        .main-container {
            margin: 10px auto;
            width: 40%;
            background-color: #fff;
            -webkit-box-shadow: 0px 2px 18px 3px rgba(0, 0, 0, 0.25);
            -moz-box-shadow: 0px 2px 18px 3px rgba(0, 0, 0, 0.25);
            box-shadow: 0px 2px 18px 3px rgba(0, 0, 0, 0.25);
        }
        .company-name
        {
            text-align: center;
            padding: 20px 50px;
        }
        .top-content,.bottom-content
        {
            padding: 5px 50px;
            color: #00000097;
        }
        .c-blue
        {
            color: #003f88;
        }
        .user-name
        {
            font-weight: 500;
        }
        .price
        {
            font-weight: bold;
            font-size: 30px;
        }
        .border
        {
            width: 100%;
            border: 1px solid rgba(0, 0, 0, 0.605);
        }
        .receipt-content
        {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .circle
        {
            width: 10px;
            height: 10px;
            background-color: rgb(240, 238, 238);
            border-radius: 50%;
        }
        .divider
        {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .receiptno
        {
            font-weight: bold;
        }
        .items
        {
            font-size: 15px;
            font-weight: bold;
        }
        .bottom-content
        {
            padding-bottom: 20px;
        }
    </style>
</head>
<body>
    <main class="main-container">
        <h1 class="company-name">CURIOSITY</h1>
        <div class="content">
            <div class="top-content">
               <p> Hello <span class="user-name c-blue">${user.userName}</span>,</p>
               <p>You have successfully paid for the order <span class="orderId">${orderId}</span></p>
               <p>Receipt from Curiosity</p>
               <p class="price c-blue">₹${existingBooking.price}</p>
               <p class="date">Paid ${formattedDate}</p>
               <div class="border"></div>
               <div class="receipt-content">
                    <p>Receipt number</p>
                    <p>${orderId}</p>
               </div>
               <div class="receipt-content">
                    <p>Invoice number</p>
                    <p>${invoiceCode}</p>
               </div>
            </div>
            <div class="bottom-content">
                <p class="receiptno c-blue">Receipt ${orderId}</p>
                <p class="date">${formattedDate}</p>
                <div class="item-container">
                    <div class="items receipt-content">
                        <p>${course.courseTitle}</p>
                        <p class="item-price">₹${course.price}</p>
                    </div>
                </div>
                <div class="border"></div>
                <div class="total-container items">
                    <div class="total receipt-content">
                        <p>Total</p>
                        <p>₹${course.price}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
`;

        sendEmail(user.userEmail, content);

        res.status(200).send({ message: "Checkout Complete", status: true })

    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

// Multiple Course Buying
app.post("/Cartcheckout", async (req, res) => {
    try {
        const {
            bookingId
        } = req.body


        let arr = []
        let booking = await Booking.findById(bookingId)
        const user = await User.findById(booking.userId)
        booking = await Booking.findByIdAndUpdate(booking._id, { __v: 1 }, { new: true })
        let carts = await Cart.find({ bookingId: booking._id })
        const courseIds = carts.map((course) => course.courseId)
        for (let cart of carts) {
            const existingPurchase = await Purchase.findOne({
                userId: booking.userId,
                courseId: cart.courseId
            })
            if (!existingPurchase) {
                const purchase = new Purchase({
                    userId: booking.userId,
                    courseId: cart.courseId
                })
                await purchase.save()

                const progress = new Progress({
                    userId: booking.userId,
                    courseId: cart.courseId
                })
                await progress.save()
            }
        }
        for (let ele of courseIds) {
            const course = await Course.findById(ele)
            arr.push(course)
        }
        let courseContent = '';
        arr.forEach((course) => {
            courseContent += `
                <div class="items receipt-content">
                    <p>${course.courseTitle}</p>
                    <p class="item-price">₹${course.price}</p>
                </div>
            `;
        });
        const date = new Date();
        const months = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const monthIndex = date.getMonth();
        const month = months[monthIndex];
        const day = date.getDate();
        const year = date.getFullYear();

        const formattedDate = `${month} ${day}, ${year}`;
        const prefix = "CUR";
        const length = 8; // Change this to adjust the length of the random numbers portion
        let invoiceCode = prefix;

        for (let i = 0; i < length - prefix.length; i++) {
            const randomNumber = Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
            invoiceCode += randomNumber;
        }
        let content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificate</title>
            <style>
                body {
                    width: 100%;
                    height: 100vh;
                    margin: 0;
                    padding: 0;
                    font-family: "Ubuntu", sans-serif;
                    color: #003f88;
                }
                
                .main-container {
                    margin: 10px auto;
                    width: 40%;
                    background-color: #fff;
                    -webkit-box-shadow: 0px 2px 18px 3px rgba(0, 0, 0, 0.25);
                    -moz-box-shadow: 0px 2px 18px 3px rgba(0, 0, 0, 0.25);
                    box-shadow: 0px 2px 18px 3px rgba(0, 0, 0, 0.25);
                }
                .company-name
                {
                    text-align: center;
                    padding: 20px 50px;
                }
                .top-content,.bottom-content
                {
                    padding: 5px 50px;
                    color: #00000097;
                }
                .c-blue
                {
                    color: #003f88;
                }
                .user-name
                {
                    font-weight: 500;
                }
                .price
                {
                    font-weight: bold;
                    font-size: 30px;
                }
                .border
                {
                    width: 100%;
                    border: 1px solid rgba(0, 0, 0, 0.605);
                }
                .receipt-content
                {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .circle
                {
                    width: 10px;
                    height: 10px;
                    background-color: rgb(240, 238, 238);
                    border-radius: 50%;
                }
                .divider
                {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .receiptno
                {
                    font-weight: bold;
                }
                .items
                {
                    font-size: 15px;
                    font-weight: bold;
                }
                .bottom-content
                {
                    padding-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <main class="main-container">
                <h1 class="company-name">CURIOSITY</h1>
                <div class="content">
                    <div class="top-content">
                       <p> Hello <span class="user-name c-blue">${user.userName}</span>,</p>
                       <p>You have successfully paid for the order <span class="orderId">${booking.orderId}</span></p>
                       <p>Receipt from Curiosity</p>
                       <p class="price c-blue">₹${booking.price}</p>
                       <p class="date">Paid ${formattedDate}</p>
                       <div class="border"></div>
                       <div class="receipt-content">
                            <p>Receipt number</p>
                            <p>${booking.orderId}</p>
                       </div>
                       <div class="receipt-content">
                            <p>Invoice number</p>
                            <p>${invoiceCode}</p>
                       </div>
                    </div>
                    <div class="bottom-content">
                        <p class="receiptno c-blue">Receipt ${booking.orderId}</p>
                        <p class="date">${formattedDate}</p>
                        <div class="item-container">
                           ${courseContent}
                        </div>
                        <div class="border"></div>
                        <div class="total-container items">
                            <div class="total receipt-content">
                                <p>Total</p>
                                <p>₹${booking.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </body>
        </html>
        `;

        sendEmail(user.userEmail, content);

        res.status(200).send({ message: "Purchase Successful" })
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

// View purchased course


// Getting All materials of a course
app.get("/getallmaterial/:courseId", async (req, res) => {
    try {
        const { courseId } = req.params
        Section.find({ courseId }).then((section) => {
            const sectionIds = section.map(section => section._id)
            return Material.find({ sectionId: { $in: sectionIds } }).populate({
                path: "sectionId",
                model: "schemaSection",
                populate: {
                    path: "courseId",
                    model: "schemaCourse",
                    populate: {
                        path: "instructorId",
                        model: "schemaInstructor"
                    }
                }
            })
        }).then((material) => {
            console.log(material);
            return res.status(200).send(material)
        })
    } catch (error) {
        console.log(error.message);
        log("Server Error")
    }

})

// Getting Purchased courses
app.get("/mycourses/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const courses = await Purchase.find({ userId: userId }).populate({
            path: "courseId",
            model: "schemaCourse",
            populate: {
                path: "instructorId",
                model: "schemaInstructor"
            }
        })
        res.status(200).send(courses)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

// Updating Progress

app.patch("/progress/:progressId", async (req, res) => {
    try {
        const { progressId } = req.params
        const { materialProgress, materialIndex } = req.body
        const progress = await Progress.findByIdAndUpdate(progressId, { materialProgress, materialIndex }, { new: true })
        res.status(200).send(progress)
    } catch (error) {
        console.log(error.message);
    }
})


// Fetching progress






var transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "curiosity2255@gmail.com", //from email Id
        pass: "izuvpenxjegowfcw", // App password created from google account
    },
});
function sendEmail(to, content) {
    const mailOptions = {
        from: "curiosity2255@gmail.com", //from email Id for recipient can view
        to,
        subject: "Purchase Successful",
        html: content,

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent");
        }
    });
}

// function sendConfirmationMail(to,content)
// {
//     const mailOptions = {
//         from:"curiosity2255@gmail.com",
//         to,
//         subject:"Approved",
//         html:content
//     };
//     transporter.sendConfirmationMail(mailOptions,function(err,info){
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             console.log("Email Sent");
//         }
//     })
// }


// Verifying Instructor

app.get("/Instructors/verify", async (req, res) => {
    try {

        const instructors = await Instructor.find({ __v: 0 })
        res.status(200).send(instructors)
    } catch (error) {
        console.log(error.message);
        log("Something went wrong")
    }
})

// Accept

app.put("/Instructor/:id/accept", async (req, res) => {
    try {
        const { id } = req.params
        const intendInstructor = await Instructor.findById(id)
        const instructor = await Instructor.findByIdAndUpdate(id, { __v: 1 }, { new: true })
        const content = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation</title>
    </head>
    
    <body style="margin: 0; padding: 0; width: 100%; background-color: #f4f4f4;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="500" style="margin-top: 10px;">
            <tr>
                <td bgcolor="#ffffff" style="padding: 20px 0; text-align: center;">
                    <h2 style="color: #003f88; font-family: Arial, Helvetica, sans-serif; font-size: 30px; margin: 0;">CURIOSITY</h2>
                    <h3 style="color: #003f88; font-family: Arial, Helvetica, sans-serif; font-size: 30px; margin: 10px 0;">Dear <span style="font-weight: bold;">${intendInstructor.instructorName}</span></h3>
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" style="padding: 20px 0; text-align: center;">
                    <div style="background-color: #003f88; width: 100px; height: 100px; border-radius: 50%; margin: auto;">
                        <span style="color: #ffffff; font-size: 50px; font-weight: bold; line-height: 100px;">&#10003;</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" style="padding: 20px; text-align: center;">
                    <p style="color: #003f88; font-family: Arial, Helvetica, sans-serif; font-size: 16px; margin: 0;">Your instructor account at CURIOSITY has been approved</p>
                    <p style="color: #003f88; font-family: Arial, Helvetica, sans-serif; font-size: 16px; margin: 10px 0;text-align: justify;">We're thrilled to have you join our community of passionate educators and learners. Your expertise and enthusiasm are valuable assets that will enrich the learning experiences of our users.</p>
                </td>
            </tr>
        </table>
    </body>
    
    </html>
    `

        sendEmail(intendInstructor.instructorEmail, content)
        res.status(200).send(instructor)
    } catch (error) {
        console.log(error.message);
    }
})
app.put("/Instructor/:id/reject", async (req, res) => {
    try {
        const { id } = req.params
        const rejectIns = await Instructor.findById(id)
        const instructor = await Instructor.findByIdAndUpdate(id, { __v: 2 }, { new: true })
        const content = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Rejection</title>
        </head>
        
        <body style="margin: 0; padding: 0; width: 100%; background-color: #f4f4f4;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="500" style="margin-top: 10px;">
                <tr>
                    <td bgcolor="#ffffff" style="padding: 20px 0; text-align: center;">
                        <h2 style="color: #003f88; font-family: Arial, Helvetica, sans-serif; font-size: 30px; margin: 0;">CURIOSITY</h2>
                        <h3 style="color: #003f88; font-family: Arial, Helvetica, sans-serif; font-size: 30px; margin: 10px 0;">Dear <span style="font-weight: bold;">${rejectIns.instructorName}</span></h3>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" style="padding: 20px 0; text-align: center;">
                        <div style="background-color: #ff6347; width: 100px; height: 100px; border-radius: 50%; margin: auto;">
                            <span style="color: #ffffff; font-size: 50px; font-weight: bold; line-height: 100px;">&#10007;</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" style="padding: 20px; text-align: center;">
                        <p style="color: #003f88; font-family: Arial, Helvetica, sans-serif; font-size: 16px; margin: 0;">We regret to inform you that your instructor account at CURIOSITY has been rejected</p>
                        <p style="color: #003f88; font-family: Arial, Helvetica, sans-serif; font-size: 16px; margin: 10px 0;text-align: justify;">Thank you for your interest. Unfortunately, your application does not meet our current requirements. We appreciate your understanding.</p>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
        sendEmail(rejectIns.instructorEmail, content)
        res.status(200).send(instructor)
    } catch (error) {
        console.log(error.message);
    }
})


// Shortlist candidate
app.patch("/Shortlist/:appId", async (req, res) => {
    try {
        const { appId } = req.params
        const application = await Application.findByIdAndUpdate(appId, { __v: 1 }, { new: true }).populate({
            path: "userId",
            model: "schemaUser"
        }).populate({
            path: "jobVacancyId",
            model: "schemaVacancy",
            populate: {
                path: "jobPortalId",
                model: "schemaJobPortal"
            }
        })
        const content = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shortlisted for Job Interview</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7; color: #333; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
    <div style="max-width: 600px; padding: 20px; background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
        <h1 style="color: #003f88; margin-top: 0;">Curiosity</h1>
        <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">Dear ${application.userId.userName},</p>
        <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">We are pleased to inform you that you have been shortlisted for the upcoming job interview. Your qualifications and experience are impressive, and we believe you would be a great fit for the position.</p>
        <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">Our team will be reaching out to you shortly to provide further details about the interview process and next steps. In the meantime, if you have any questions, feel free to contact us.</p>
        <p style="font-weight: bold; font-size: 20px; margin-bottom: 10px;">Best regards,</p>
        <p style="font-weight: bold; font-size: 20px; margin-bottom: 10px;">${application.jobVacancyId.jobPortalId.jobPortalCompanyName}</p>
        <p style="font-style: italic; font-size: 14px; color: #666;">Date: ${moment().format('YYYY-MM-DD')}</p>
    </div>
</body>
</html>

        `
        sendEmail(application.userId.userEmail, content)
        res.status(200).send({ message: "Candidate Added to shortlist", status: true })
    } catch (error) {
        console.log(error.message);
        res.send({ message: "Shortlisting failed", status: false })
    }
})


// Reject Candidates
app.patch("/Reject/:appId", async (req, res) => {
    try {
        const { appId } = req.params
        const application = await Application.findByIdAndUpdate(appId, { __v: 2 }, { new: true }).populate({
            path: "userId",
            model: "schemaUser"
        }).populate({
            path: "jobVacancyId",
            model: "schemaVacancy",
            populate: {
                path: "jobPortalId",
                model: "schemaJobPortal"
            }
        })
        res.status(200).send({ message: "Candidate Rejected", status: true })
    } catch (error) {
        console.log(error.message);
        res.send({ message: "Something Went wrong", status: false })
    }
})


// Get shortlisted candidates
app.get("/Shortlisted/:jobVacancyId", async (req, res) => {
    try {
        const { jobVacancyId } = req.params
        const applications = await Application.find({ jobVacancyId, __v: 1 }).populate({
            path: "userId",
            model: "schemaUser"
        })

        res.status(200).send(applications)
    } catch (error) {
        console.log(error.message);
        res.send({ message: "Something went wrong", status: false })
    }
})
// Get Rejected candidates
app.get("/Rejected/:jobVacancyId", async (req, res) => {
    try {
        const { jobVacancyId } = req.params
        const applications = await Application.find({ jobVacancyId, __v: 2 }).populate({
            path: "userId",
            model: "schemaUser"
        })

        res.status(200).send(applications)
    } catch (error) {
        console.log(error.message);
        res.send({ message: "Something went wrong", status: false })
    }
})


// Get Applied Jobs
app.get("/Applied/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const applied = await Application.find({ userId }).populate({
            path: "jobVacancyId",
            model: "schemaVacancy",
            populate: {
                path: "jobPortalId",
                model: "schemaJobPortal"
            }
        })
        res.status(200).send(applied)
    } catch (error) {
        console.log(error.message);
        res.send({ message: "Something Went wrong", status: false })
    }
})


// Report

// Schema

const reportSchema = new Schema({
    issueType:{
        type:String,
        required:true
    },
    issueDesc:{
        type:String,
        required:true
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"schemaCourse"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"schemaUser"
    }
})

const Report = mongoose.model("schemaReport",reportSchema)

app.post("/Report",async(req,res)=>{
    try {
        const {issueType,issueDesc,courseId,userId} = req.body
        const report = new Report({
            issueType,
            issueDesc,
            courseId,
            userId
        })
        await report.save()
        res.status(200).send({message:"Course Reported"})
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

app.get("/Report",async(req,res)=>{
    try {
        const reports = await Report.find({}).populate({
            path:"courseId",
            model:"schemaCourse"
        })
        res.status(200).send(reports)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})


// Materials from course
app.get("/Reportedcourse/:courseId",async(req,res)=>{
    try {
        const {courseId} = req.params
        const sections = await Section.find({courseId})
        const sectionIds = sections.map((section) => section._id)
        const materials = await Material.find({sectionId:{$in:sectionIds}})
        res.status(200).send(materials)
    } catch (error) {
        console.log(error);
    }
})

app.get("/Sendresponse/:reportId",async(req,res)=>{
    try {
        const {reportId} = req.params
        const report = await Report.findById(reportId).populate({
            path:"userId",
            model:"schemaUser"
        })
        const content = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CURIOSITY</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 20px;">
        
            <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
        
                <h1 style="color: #003f88; margin-bottom: 20px;">CURIOSITY</h1>
        
                <p style="color: #666; margin-bottom: 10px;">Thank you for bringing this matter to our attention.</p>
        
                <p style="color: #666; margin-bottom: 10px;">We have received your report regarding the course. Our team will carefully review the information provided and take the necessary actions, if required, to ensure the quality and integrity of our educational content.</p>
        
                <p style="color: #666; margin-bottom: 10px;">Your contribution to maintaining a positive learning environment is greatly appreciated. Should you have any further concerns or questions, please feel free to contact us.</p>
        
                <p style="color: #666; margin-bottom: 10px;">Once again, thank you for your cooperation.</p>
        
                <p style="color: #666; margin-bottom: 10px;">Sincerely,</p>
        
                <p style="color: #666; margin-bottom: 0;">The <span style="color:#003f88;font-weight:bold">CURIOSITY</span> Team</p>
        
            </div>
        
        </body>`
        sendEmail(report.userId.userEmail,content)
        const update = await Report.findByIdAndUpdate(reportId,{__v:1},{new:true})
        res.status(200).send({message:"Action Taken"})
    } catch (error) {
        console.log(error.message);
    }
})

// Search Course
app.get("/Searchcourse",async(req,res)=>{
    try {
        const {title} = req.query
        if(!title)
        {
            return res.status(400).send({message:"Title parameter is required"})
        }
        const courses = await Course.find({courseTitle:{$regex: new RegExp(title,i)}})  .populate({
            path: "instructorId",
            model: "schemaInstructor"
        })
        .populate({
            path: "topicId",
            model: "schemaTopic",
            populate: {
                path: "subCategoryId",
                model: "schemaSubCategory",
                populate: {
                    path: "categoryId",
                    model: "schemaCategory"
                }
            }
        });

        res.status(200).send(courses)
    } catch (error) {
        console.log(error.message);
    }
})