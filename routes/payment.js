const express = require('express')
const SchoolStaff = require('../schema/admin')
const SchoolPfofile = require('../schema/schoolProfile')
const PaymentHistory = require('../schema/payment_history')

const router = express.Router()
require('dotenv').config()

router.post("/api/payment-callback", async (req, res) => {


  try{ 
  // 1. Update school profile
    const updatePayment = await SchoolPfofile.findOneAndUpdate(
      { schoolName:req.body.schoolName },
      { $set: { fees: 0 } }
    );

    if(!updatePayment){
      res.status(404).json({message:`${req.body.schoolName} not fouond`})
      return
    }

    await PaymentHistory.create({
      schoolName:req.body.schoolName,
      amount:req.body.fees,
      staffName:req.body.headTeacher.name,
      email:req.body.schoolEmail
    })
    req.session.fees = 0
    return res.status(200).send({message:"Payment verified and saved successfully"});
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});


router.get('/payment/schoolinfo', async (req, res)=>{
	const id = req.session.userId
	try {
		const result = await SchoolStaff.findById(id);
		const school = result.school;
		const schoolDetails = await SchoolPfofile.findOne({schoolName :school })
	
		res.status(200).json(schoolDetails)
	} catch (err) {
		console.log(err)
		res.status(500).json({msg:"Server Error"})
	}
})


/*

const Flutterwave = require("flutterwave-node-v3");

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

router.post("/api/payment-callback", async (req, res) => {
  try {

    const { transaction_id, tx_ref } = req.body;

    if (!transaction_id || !tx_ref) {
      return res.status(400).json({
        message: "Transaction information is missing"
      });
    }

    // Verify directly with Flutterwave
    const response = await flw.Transaction.verify({
      id: transaction_id
    });

    const transaction = response.data;

    console.log("Verified transaction:", transaction);

    // Make sure Flutterwave actually says it was successful
    if (transaction.status !== "successful") {
      return res.status(400).json({
        message: "Payment was not successful"
      });
    }

    // Make sure the reference is the one YOUR application generated
    if (transaction.tx_ref !== tx_ref) {
      return res.status(400).json({
        message: "Transaction reference does not match"
      });
    }

    // Make sure the amount is what you expected
    if (Number(transaction.amount) !== 100) {
      return res.status(400).json({
        message: "Payment amount is incorrect"
      });
    }

    // Make sure currency is correct
    if (transaction.currency !== "NGN") {
      return res.status(400).json({
        message: "Invalid currency"
      });
    }

    // Only NOW update your database
    const updatePayment = await SchoolPfofile.findOneAndUpdate(
      { schoolName: req.body.schoolName },
      { $set: { fees: 0 } },
      { new: true }
    );

    if (!updatePayment) {
      return res.status(404).json({
        message: `${req.body.schoolName} not found`
      });
    }

    await PaymentHistory.create({
      schoolName: updatePayment.schoolName,
      amount: transaction.amount,
      staffName: updatePayment.headTeacher?.name,
      email: updatePayment.schoolEmail,
      txRef: transaction.tx_ref,
      transactionId: transaction.id,
      flwRef: transaction.flw_ref
    });

    req.session.fees = 0;

    return res.status(200).json({
      message: "Payment verified and saved successfully"
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      message: "Payment verification failed"
    });
  }
});

*/
module.exports = router;