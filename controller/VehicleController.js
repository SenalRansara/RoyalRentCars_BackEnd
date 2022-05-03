const router = require("express").Router();
let Vehicle = require("../model/VehicleModel");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
//const multer = require('multer');
//const { route } = require("express/lib/application");
//const upload = multer({ dest: 'uploads/' })


//add vehicle details

router.route("/addVehicle").post((req, res) => {

    const VehicleID = uuidv4();
    const OwnerName = req.body.OwnerName;
    const OwnerNIC = req.body.OwnerNIC;
    const TeleNo = req.body.TeleNo;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const Date = moment(req.body.Date).format('YYYY-MM-DD');
    const VehicleRegNo = req.body.VehicleRegNo;
    const VehicleModel = req.body.VehicleModel;
    const VehicleType = req.body.VehicleType;
    const VehicleBrand = req.body.VehicleBrand;
    const Mileage = req.body.Mileage;
    const InsType = req.body.InsType;
    const InsComName = req.body.InsComName;
    const Transmission = req.body.Transmission;
    const AirC = req.body.AirC;
    const NoOfSeats = req.body.NoOfSeats;
    const RatePDay = req.body.RatePDay;
    const YearsRent = req.body.YearsRent;
    const vehPic = req.body.imgPath;
    const vehDoc = req.body.vehDoc;

const newVehicle = new Vehicle({

        id,
        VehicleRegNo,
        VehicleModel,
        VehicleType,
        VehicleBrand,
        Mileage,
        InsType,
        InsComName,
        Transmission,
        AirC,
        NoOfSeats,
        RatePDay,
        YearsRent,
        vehPic,
        vehDoc
})

//implementing method for adding rental data
try {
    Vehicle.find({ id: newVehicle.id }, async (err, doc) => {
        if (Object.keys(doc).length == 0) {
            try {
                let response = await newVehicle.save();
                if (response)
                    //console.log(doc);
                    return res.status(201).send({ message: "new Vehicle Added" });
            } catch (err) {
                console.log("error while saving", err);
                return res.status(500).send({ status: "Internal Server Error" });
            }
        }
        else {
            return res.status(400).send({ status: "Vehicle already exist!" });
        }
    });
} catch (err) {
    console.log("error", err)
}
});

//view data vehicle

router.get("/get",async (req,res) => {

    try{
        const response = await Vehicle.find();
        return res.status(200).send({
            status:"Success",
            data: response
        });
    }catch(error){
        console.log("Something went wrong while DB connection");
        return { ok: false};
    }
});




module.exports = router;