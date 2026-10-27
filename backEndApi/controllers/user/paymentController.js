const Razorpay = require('razorpay')
const Transaction = require('../../models/Transaction')
const crypto = require('crypto')
async function makePayment(req, res) {
    try {
        const razorpay = new Razorpay({
            key_id: 'rzp_test_TqS9PSZTzCbRLo',
            key_secret: '5pjydXshS45FQwEDri9K0KOY'
        })
        console.log(req.body)
        let transaction = new Transaction(req.body)
        const options = {
            amount: req.body.amount*100,
            currency: 'INR',
            receipt: req.body.firstName
        }
        const order = await razorpay.orders.create(options);
        console.log(order)
        transaction.transactionId = order.id
        await transaction.save();
        res.status(200).json(order)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}
async function verifyPayment(req, res) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", '5pjydXshS45FQwEDri9K0KOY')
            .update(sign.toString())
            .digest("hex");
        console.log(expectedSign, 'expectedSign')
        if (razorpay_signature === expectedSign) {
           let transaction = await Transaction.findOne({ transactionId: razorpay_order_id })
           transaction.status = 'Completed'
           await transaction.save(); 
           
            return res.status(200).json({ message: "Payment verified successfully", data : razorpay_order_id });
        } else {
            return res.status(400).json({ message: "Invalid signature, payment failed!" });
        }
    } catch(err) {
        console.log(err)
    }
}
async function getMyOrders(req, res) {
    try {
        let email= req.body();
        console.log(email, 'email')
        let myOrders = await Transaction.find({email: email})
        console.log(myOrders, 'myorders')
        res.status(200).send({ data: myorders })
    } catch {
        console.log(err)
        res.status(500).send({ message: 'something went wrong' })
    }
}
module.exports = {
    makePayment,
    verifyPayment,
    getMyOrders
}