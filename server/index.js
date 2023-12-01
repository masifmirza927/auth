const express = require('express')
const app = express()
const mongoose = require("mongoose");
const UserModel = require('./models/UserModel');
const bcrypt = require("bcrypt");
const secretKey = "42sfkl;jdf;o0923rujwefolkjsd";
const jwt = require("jsonwebtoken");

//middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {

        // check email is already registered or not
        const alreadyUser = await UserModel.findOne({ email: email });
        if (alreadyUser !== null) {
            return res.json({
                status: "failed",
                message: "Already registered"
            })
        }

        // encrypt password
        const hashed = await bcrypt.hash(password, 10);


        // create new user
        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: hashed
        });

        // generate jwt token
            const token = jwt.sign({ id: newUser._id}, secretKey);
        
        return res.json({
            status: "success",
            message: "Signup successfully",
            token: token
        })

    } catch (error) {
        return res.json({
            status: "failed",
            message: "Something went wrong"
        })
    }
});

app.post("/login", async () => {
    const {email, password} = req.body;
    try {
        // first check user is exist or not and if exists then take it out

        // if user is registered, then check the password
        const checkPass = await bcrypt.compare(password, user.password);
        if(checkPass === true) {

            // okay, jswon token
        }


    } catch (error) {
        
    }
})


// get posts
app.get('/posts', async( req, res) => {

    console.log( req.headers.authorization )
    let token = null;
    if(req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // check token is exists or not
    if(token === null) {
        return res.json({
            status: "failed",
            message: "Token is required"
        })
    }

     try {
       const decoded =  jwt.verify(token, secretKey);

        if(!decoded) {
            return  res.status(401).json({auth : false , message:"Unauthorized!"}) ;
        } else {
            return  res.status(200).json({auth : true , message:"logged in!"}) ;
        }
       console.log(decoded);

    } catch (error) {
        
    }
})




// server & DB connection
mongoose.connect("mongodb://127.0.0.1:27017/auth").then(() => {
    app.listen(4000, () => {
        console.log("db connected and server is up now");
    })
})