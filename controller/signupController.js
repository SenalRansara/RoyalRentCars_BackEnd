const controller = require("express").Router();
//const { v4: uuidv4 } = require("uuid");
const { Router } = require("express");
const { signal } = require("nodemon/lib/config/defaults");
//const signup = require("../model/signupModel");
let signup = require("../model/signupModel");
//const isMoment = require("moment");


//insert data for reservation
controller.route("/signup").post((req, res) => {
    //const reservationID = uuidv4();
    
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new signup({
        
        userName,
        email,
        password,

    })

    newUser.save().then(() => {
        res.status(200).send({ message: "SignUp successfully" })
    }).catch((err) => {
        res.status(300).send({ status: "Error SignUp", error: err.message });
    })
})

//retrieve all signup details
controller.route("/displaySignup").get((req, res) => {
    signup.find().then((signup) => {
        res.json(signup)
    }).catch((err) => {
        console.log(err);
    })
})


// //To retrieve the reservation details of a specific reservation id 
// controller.route("/displaySignup/:RID").get(async (req, res) => {

//     let RID = req.params.RID;

//     const signup = await signup.findOne({ id: RID })
//         .then((signup) => {
//             if (signup != null) {
//                 res.status(200).send({ status: "Reservation fetched", reservation: reservation })

//             } else {
//                 res.status(500).send({ status: "Error with get Reservation", error: err.message });

//             }
//         }).catch((err) => {
//             console.log(err.message);
//             res.status(500).send({ status: "Error with get Reservation", error: err.message });
//         })

// })

// //to delete a specific reservation from database
// controller.route("/deleteSignup/:RID").post(async (req, res) => {
//     let RID = req.params.RID;
//     console.log("RID", RID);
//     console.log("request", req.body);

//     await signup.findOneAndDelete({ id: RID })
//         .then(() => {
//             res.status(200).send({ status: "Reservation Record deleted" });
//         }).catch(() => {
//             console.log(err);
//             res.status(500).send({ status: "Error with deleting reservation record", error: err.message });
//         })
// })

module.exports = controller;