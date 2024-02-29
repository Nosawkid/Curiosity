const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const port = 5000;
const { Schema } = mongoose
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const multer = require("multer");


const app = express();

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





app.listen(port, async () => {
    try {
        await mongoose.connect('mongodb+srv://Curiosity:Curiosity%401122@cluster0.swekyn2.mongodb.net/dbCuriosity')
        console.log(`server is running in ${port}`);
        console.log("db connection established");

    } catch (error) {
        console.error(error);
    }


})

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
        default:"www.facebook.com"
    },
    twitterLink: {
        type: String,
        default:"www.x.com"
    },
    instagramLink: {
        type: String,
        default:"www.instagram.com"
    },
    linkedInLink: {
        type: String,
        default:"www.linkedin.com"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "schemaUser"
    }
})

const Link = mongoose.model('schemaLink', linkSchema)

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
        await Category.findByIdAndDelete(id)
        res.send({ message: "Deleted" })
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
        type: String,
        required: true
    },
    userHeadLine: {
        type: String,
        default:null
    },
    userBiography: {
        type: String,
        default:null
    },
    userPhoto: {
        type: String,
        default:null
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
        vdvfb

        if (admin || user || ins || portal) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] })
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
        res.status(200).send("Account creation success")
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

app.patch("/Instructor/:id/edit", async (req, res) => {
    try {
        const { id } = req.params
        let instructor = await Instructor.findById(id)
        if (!instructor) {
            return res.status(400).send({ message: "Instructor doesn't exist" })
        }
        const {
            instructorName,
            instructorEmail,
            instructorContact,
            instructorHeadLine,
            instructorQualification,
            instructorField
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
            instructorQualification,
            instructorField
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
    },
})



const Course = mongoose.model("schemaCourse", courseSchema)

// Crud

// Create

app.post("/Course", async (req, res) => {
    try {
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
                res.status(400).send("Course with same name already exist")
            )
        }

        course = new Course({
            courseTitle,
            instructorId,
            topicId,
            courseDesc,
            courseDateTime,
            price
        })
        await course.save();
        res.status(200).send("Course Added")
    } catch (error) {
        console.log(error.message)
        console.log("Server Error")
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
        const course = await Course.findByIdAndDelete(id)
        res.status(200).send({ message: "Deletion Success" })
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
    }
})

const Booking = mongoose.model("schemaBooking", bookingSchema)

// crud
// // create

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
        const booking = await Booking.findById(id).populate({
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


// CART
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


app.post("/Cart",async(req,res)=>{
    try {
        const {
            userId,
            courseId
        } = req.body

        let booking = await Booking.findOne({userId,__v:0})
        if(!booking)
        {
            const newBooking = new Booking({
                userId
            })
            booking = await newBooking.save()
        }

        const existingCart = await Cart.findOne({courseId,bookingId:booking._id})
        if(existingCart)
        {
            return res.send(false)
        }

        const cart = new Cart({
            courseId,
            bookingId:booking._id
        })

        await cart.save()
        return res.status(200).send({message:"Added to cart"})
        
    } catch (error) {
        console.log(error.message)
        console.log("Server Erro")
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
        const booking = await Booking.findOne({userId:id,__v:0})
        const carts = await Cart.find({ bookingId:booking._id }).populate({
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
                res.status(400).send("Already Present in the wishlist")
            )
        }

        const wishlist = new Wishlist({
            courseId,
            userId
        })
        await wishlist.save();
        res.status(200).send("Added to Wishlist")
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
        required: true,
        minlength: 50
    },
    reviewDateTime: {
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

const Review = mongoose.model("schemaReview", reviewSchema)

// crud
// create
app.post("/Review", async (req, res) => {
    try {
        const {
            reviewTitle,
            reviewContent,
            reviewDateTime,
            userId,
            courseId
        } = req.body

        const newReview = new Review({
            reviewTitle,
            reviewContent,
            reviewDateTime,
            userId,
            courseId
        })
        await newReview.save()
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

// View One
app.get("/review/:id", async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate({
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

app.post("/Chat", async (req, res) => {
    try {
        const {
            courseId,
            userId,
            chatContent,
            chatDateTime
        } = req.body

        const newChat = new Chat({
            courseId,
            userId,
            chatContent,
            chatDateTime
        })

        await newChat.save();
        res.status(200).send({ message: "Message Sent" })
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})

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
    certificateFile: {
        type: String,
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

const Certificate = mongoose.model("schemaCertificate", certificateSchema)

// Crud
// Create
app.post("/Certificate", async (req, res) => {
    try {
        const {
            certificateFile,
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
    jobPortalProof: {
        type: String,
        required: true
    },
    jobPortalDetails: {
        type: String,
        required: true
    },
    jobPortalPassword: {
        type: String,
        required: true
    },
    jobPortalPhoto: {
        type: String,
        required: true
    },
    jobPortalStatus: {
        type: Number,
        default: 0
    },

})

const JobPortal = mongoose.model("schemaJobPortal", jobPortalSchema)

// Crud
// Create

app.post("/Jobportal", async (req, res) => {
    try {
        const {
            jobPortalName,
            jobPortalEmail,
            jobPortalContact,
            jobPortalProof,
            jobPortalDetails,
            jobPortalPassword,
            jobPortalPhoto,
            jobPortalStatus
        } = req.body

        let portal = await JobPortal.findOne({ jobPortalEmail })
        if (portal) {
            return (
                res.status(400).send({ message: "Alreafy existing email" })
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
            jobPortalStatus
        })

        const salt = 12;
        portal.jobPortalPassword = await argon2.hash(jobPortalPassword, salt)
        await portal.save();
        res.status(200).send({ message: "Account Created" })


    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
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
        type: String,
        required: true
    },
    subCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "schemaSubCategory"
    },
    vacancyDate: {
        type: Date,
        default: Date.now()
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
            subCategoryId,
            vacancyDate
        } = req.body

        const newVacancy = new Vacancy({
            jobPortalId,
            vacancyTitle,
            vacancyDesc,
            minSalary,
            maxSalary,
            subCategoryId,
            vacancyDate
        })

        await newVacancy.save()
        res.status(200).send({ message: "Vacancy Added" })
    } catch (err) {
        console.log(err.message);
        console.log("Server Error");
    }
})

// Read

app.get("/Vacancy", async (req, res) => {
    try {
        const vacancies = await Vacancy.find()
        res.status(200).send(vacancies)
    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})


// Delete

app.delete("/Vacancy/:id", async (req, res) => {
    try {
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
    resumeFile: {
        type: String,
        required: true
    },
    experience: {
        type: String
    }

})

const Application = mongoose.model("schemaJobApplication", jobApplicationSchema)

app.post("/Application", async (req, res) => {
    try {
        const {
            jobVacancyId,
            userId,
            resumeFile,
            experience
        } = req.body

        const newApplication = new Application({
            jobVacancyId,
            userId,
            resumeFile,
            experience
        })

        await newApplication.save()
        res.status(200).send({ message: "Application Added" })
    } catch (err) {
        console.log(err.message);
        console.log("Server Error");
    }
})

app.get("/Application", async (req, res) => {
    try {
        const applications = await Application.find()
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
            return res.status(500).send({ message: "No User found" })
        }

        const payload = {
            id,
            type
        }


        res.json({ payload });


    } catch (error) {
        console.log(error.message);
        console.log("Server Error");
    }
})


