const router = require("express").Router();
const Rental = require("../model/RentalModel");
const { v4: uuidv4 } = require("uuid");

//create router for add new rental
router.post("/rental/save",async (req,res)=>{
    //console.log("ddd",req.body);
    const id = uuidv4();
    const from = req.body.from;
    const to = req.body.to;
    const vehicleType = req.body.vehicleType;
    const vehicleModel = req.body.vehicleModel;
    const pickAddress = req.body.pickAddress;
    const paymentAmount = req.body.paymentAmount;
    const paymentMethod = req.body.paymentMethod;
    const customerName = req.body.customerName;
    const customerAddress = req.body.customerAddress;
    const customerNIC = req.body.customerNIC;
    const contactNo = req.body.contactNo;


const newRental = new Rental({
    id,
    from,
    to,
    recDes,
    vehicleType,
    vehicleModel,
    pickAddress,
    paymentAmount,
    paymentMethod,
    customerName,
    customerAddress,
    customerNIC,
    contactNo

})

//implementing method for adding rental data
try {
    Rental.find({ id: newRental.id }, async (err, doc) => {
        if (Object.keys(doc).length == 0) {
            try {
                let response = await newRental.save();
                if (response)
                    //console.log(doc);
                    return res.status(201).send({ message: "new Rental Added" });
            } catch (err) {
                //console.log("error while saving");
                return res.status(500).send({ status: "Internal Server Error" });
            }
        }
        else {
            return res.status(400).send({ status: "Rental already exist!" });
        }
    });
} catch (err) {
    console.log("error", err)
}
});


//router for retrieve data for Added Rental Details
router.get("/rental/get",async (req,res) => {

    try{
        const response = await Rental.find();
        return res.status(200).send({
            status:"Success",
            data: response
        });
    }catch(error){
        console.log("Something went wrong while DB connection");
        return { ok: false};
    }
});