const router = require("express").Router();
const Employee = require("../model/employeeModel")
// const Resignation = require("../model/resignationModel");
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


//router for retrieve and send all the employee records
router.get("/employee", async (req, res) => {
    try {
        const response = await Employee.find();
        return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
        console.log("Something went wrong while connecting to DB");
        return { ok: false };
    }

});


//router for update an employee details
router.put("/employee/update/:empId",async (req,res) =>{
    const empId = req.params.empId;

    const{
        fName,
        lName,
        gender,
        DOB,
        email,
        maritalStat,
        nic,
        designation,
        currAdd,
        mobileNo,
        homeContact,
        empPic,
        cv
    } = req.body;

    const employeePayload = {
        fName,
        lName,
        gender,
        DOB,
        email,
        maritalStat,
        nic,
        designation,
        currAdd,
        mobileNo,
        homeContact,
        empPic,
        cv
    }

    if(empId) {
        try{
            const response = await Employee.findOneAndUpdate({empId: empId }, employeePayload);
            if (response != null){
                return res.status(200).send({status:"Employee Successfully updated!"});
            }
            return res.status(400).send({status:"Invalid Employee"})
        }
        catch(err){
            return res.status(500).send({status:"Internal server Error"});
        }
    }
});


//router for delete an employee details
router.post("/employee/delete/:empId", async (req, res) => {
    const empId = req.params.empId;

    if (empId) {
        try{
            const response = await Employee.findOneAndDelete({ empId: empId });
            if (response != null){
                return res.status(200).send({status:"Employee Successfully Deleted!"});
            }
            return res.status(400).send({status:"Invalid Employee"})
        }
        catch(err){
            return res.status(500).send({status:"Internal server Error"});
        }
    }
});

module.exports = router;