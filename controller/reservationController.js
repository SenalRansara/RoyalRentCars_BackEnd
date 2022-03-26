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

module.exports = controller; 
