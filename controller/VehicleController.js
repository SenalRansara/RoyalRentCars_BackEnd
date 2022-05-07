const router = require("express").Router();
const Vehicle = require("../model/VehicleModel");
const { v4: uuidv4 } = require("uuid");
// const moment = require('moment');
// const res = require("express/lib/response");


//add vehicle details

router.post("/addVehicle",async (req, res) => {

    const VId = uuidv4();
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
    const nic = req.body.nic;
    // const vehPic = req.body.imgPath;
    // const vehDoc = req.body.vehDoc;

const newVehicle = new Vehicle({

        VId,
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
        nic
        // vehPic,
        // vehDoc
})

//implementing method for adding vehicle data
try {
    Vehicle.find({ nic: newVehicle.nic }, async (err, doc) => {
        if (Object.keys(doc).length == 0) {

            try {
                let response = await newVehicle.save();
                if (response)
                    //console.log(doc);
                    return res.status(201).send({ message: "new Vehicle Added" });
            } catch (err) {
                // console.log("error while saving", err);
                return res.status(500).send({ status: "Internal Server Error" });
            }
        }
        else {
            return res.status(400).send({ status: "Vehicle already exist!" });
        }
    });
} catch (err) {
    // console.log("error", err)
}
});

//view data vehicle

router.get("/viewVehicle",async (req,res) => {
    // console.log("request", req);

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

//router for update vehicle details

router.put("/updateVehicle/:VId",async (req,res) =>{
    const VId = req.params.VId;
    // console.log("***",VId)
    const{

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
        nic
        // vehPic,
        // vehDoc
    } = req.body;

    const Payload = {
    
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
        nic
        // vehPic,
        // vehDoc
    }
    

    if(VId) {
        try{
            const response = await Vehicle.findOneAndUpdate({VId: VId }, Payload);
            console.log("res>>", response)
            if (response != null){
                return res.status(200).send({status:"Vehicle Successfully updated!"});
            }
            return res.status(400).send({status:"Invalid Vehicle"})
        }
        catch(err){
            return res.status(500).send({status:"Internal server Error"});
        }
    }
});

//router for delete vehicle

router.delete("/deleteVehicle/:VId", async (req, res) => {
    const vehicleId = req.params.VId;
    console.log("res>>",req.params.vehicleId);

    if (vehicleId) {
        try{
            const response = await Vehicle.findOneAndDelete({ VId: vehicleId });
            console.log("res>>", response)
            if (response != null){
                return res.status(200).send({status:"Vehicle Successfully Deleted!"});
            }
            return res.status(400).send({status:"Invalid Vehicle"})
        }
        catch(err){
            return res.status(500).send({status:"Internal server Error"});
        }
    }

});
module.exports = router;