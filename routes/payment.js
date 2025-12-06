const express = require('express')
const schoolStaff = require('../schema/admin')
const schoolPfofile = require('../schema/schoolProfile')
const paymentHistory = require('../schema/payment_history')
const axios = require('axios')
const router = express.Router()
require('dotenv').config()

router.post("/api/payment-callback", async (req, res) => {
  const { tx_ref, meta } = req.body;

    const { schoolName, amount, staffName, refId } = meta;
    const newPayment = new paymentHistory({
      schoolName,
      amount,
      staffName,
      refId,
      tx_ref,
    });

    await newPayment.save();

  if (!tx_ref) return res.status(400).send("Invalid request");

  try {
    // 2. Verify transaction using Flutterwave API
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
        }
      }
    );

    const data = response.data.data;

    if (data.status !== "successful") {
      return res.status(400).send("Payment failed or not verified");
    }


    // 4. Update school profile
    await schoolPfofile.findOneAndUpdate(
      { schoolName },
      { $set: { fees: 0 } }
    );

    return res.send("Payment verified and saved successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});


router.get('/payment/schoolinfo', async (req, res)=>{
	const id = req.session.userId
	try {
		const result = await schoolStaff.findById(id);
		const school = result.school;
		const schoolFee = await schoolPfofile.findOne({schoolName :school })
		const fee = schoolFee.fees
		res.status(200).json({result, fee})
	} catch (err) {
		console.log(err)
		res.status(500).json({msg:"Server Error"})
	}
})

module.exports = router;