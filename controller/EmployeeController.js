const router = require("express").Router();
const Employee = require("../model/employeeModel")
const Resignation = require("../model/resignationModel");
const { v4: uuidv4 } = require("uuid");

//router for add an employee
router.post("/employee", async (req, res) => {

    const empId = uuidv4();
    const fName = req.body.fName;
    const lName = req.body.lName;
    const gender = req.body.gender;
    const DOB = req.body.DOB;
    const email = req.body.email;
    const maritalStat = req.body.maritalStat;
    const nic = req.body.nic;
    const designation = req.body.designation;
    const currAdd = req.body.currAdd;
    const mobileNo = Number(req.body.mobileNo)
    const homeContact = Number(req.body.homeContact);
    const empPic = req.body.empPic;
    const cv = req.body.cv;

    const newEmployee = new Employee({
        empId,
        fName,
        lName,
        gender,
        DOB,
        email,
        maritalStat,
        nic,
        designation,
        currAdd,
        permAdd,
        mobileNo,
        homeContact,
        empPic,
        cv
    })

    try {
        Employee.find({ nic: newEmployee.nic }, async (err, doc) => {
            if (Object.keys(doc).length == 0) {

                try {
                    let response = await newEmployee.save();
                    if (response)
                        //console.log(doc);
                        return res.status(201).send({ message: "New Employee Added" });
                } catch (err) {
                    //console.log("error while saving");
                    return res.status(500).send({ status: "Internal Server Error" });
                }
            }
            else {
                //console.log("nic found")
                return res.status(400).send({ status: "User already exist!" });
            }
        });
    } catch (err) {
        console.log("error", err)
    }
});