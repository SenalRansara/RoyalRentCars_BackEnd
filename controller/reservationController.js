// const router = require("express").Router();
const controller = require("express").Router();
let Reservation = require("../model/reservationModel");
//const { v4: uuidv4 } = require("uuid");
// const isMoment = require("moment");


//insert data for reservation
controller.route("/addReservation").post((req, res) => {
    //const reservationID = uuidv4();
    const reservationID = req.body.reservationID;
    const customerName = req.body.customerName;
    const contactNumber = Number(req.body.contactNumber);
    const nic = req.body.nic;
    const address = req.body.address;
    const email = req.body.email;
    const eventType = req.body.eventType;
    const vehicleType = req.body.vehicleType;
   // const from = isMoment(req.body.from).format('YYYY-MMMM-DD');
   // const to = isMoment(req.body.to).format('YYYY-MMMM-DD');
   const from = Date.parse(req.body.from);
   const to = Date.parse(req.body.to);
    const numberOfVehivles = Number(req.body.numberOfVehivles);
    const deposit = Number(req.body.deposit);
    const advancedPayment = Number(req.body.advancedPayment);
    const totalReservation = Number(req.body.totalReservation);
    const remarks = req.body.remarks;

    const newReservation = new Reservation({
        reservationID,
        customerName,
        contactNumber,
        nic,
        address,
        email,
        eventType,
        vehicleType,
        from,
        to,
        numberOfVehivles,
        deposit,
        advancedPayment,
        totalReservation,
        remarks

    })

    newReservation.save().then(() => {
        res.status(200).send({ message: "Reservation Insert Successfully" })
    }).catch((err) => {
        res.status(300).send({ status: "Error Reservation Insertion", error: err.message });
    })
})

//retrieve all reservation details
controller.route("/displayReservation").get((req, res) => {
    Reservation.find().then((reservation) => {
        res.json(reservation)
    }).catch((err) => {
        console.log(err);
    })
})

//To retrieve the reservation details of a specific reservation id 
controller.route("/getReservation/:RID").get(async (req, res) => {

    let RID = req.params.RID;

    const reservation = await Reservation.findOne({ reservationID: RID })
        .then((reservation) => {
            if (reservation != null) {
                res.status(200).send({ status: "Reservation fetched", reservation: reservation })

            } else {
                res.status(500).send({ status: "Error with get Reservation", error: err.message });

            }
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get Reservation", error: err.message });
        })

})

//to update the reservation details
controller.route("/updateReservation/:RID").put(async (req, res) => {
    console.log("reques")
    let RID = req.params.RID;
    console.log("RID", RID);
    console.log("request", req.body);

    //we have to fetch the new updating details coming from the front end here-new feature called d structure

    const {
       // reservationid,
        customerName,
        contactNumber,
        nic,
        address,
        email,
        eventType,
        vehicleType,
        from,
        to,
        numberOfVehivles,
        deposit,
        advancedPayment,
        totalReservation,
        remarks

    } = req.body;//we call this as dStructure

    const updateReservation = {
        //reservationid,
        RID,
        customerName,
        contactNumber,
        nic,
        address,
        email,
        eventType,
        vehicleType,
        from,
        to,
        numberOfVehivles,
        deposit,
        advancedPayment,
        totalReservation,
        remarks
    }//create a object containing the data that needs to be updated

    //we have to pass the primary key and then value to be passed
     await Reservation.findOneAndUpdate({ reservationID: RID }, updateReservation)
        .then(() => {
            res.status(200).send({ status: "Reservation Record updated" })//sending details of the updated data back to front end
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Server error Error with updating data", error: err.message });
        })
})


//to delete a specific reservation from database
controller.route("/deleteReservation/:RID").post(async (req, res) => {
    let RID = req.params.RID;
    console.log("RID", RID);
    console.log("request", req.body);

    await Reservation.findOneAndDelete({ reservationID: RID })
        .then(() => {
            res.status(200).send({ status: "Reservation Record deleted" });
        }).catch(() => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting reservation record", error: err.message });
        })
})

module.exports = controller; 
