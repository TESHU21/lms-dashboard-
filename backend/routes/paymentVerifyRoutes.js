import express from "express";
import axios from "axios";
import { markInvoiceAsPaid } from "../utils/paymentHelpers.js";

const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({ success: false, message: "Reference required" });
    }

    const { data } = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });

    if (data.data.status !== "success") {
      return res.status(400).json({ success: false, message: "Payment not successful" });
    }

    await markInvoiceAsPaid(data.data);

    res.json({ success: true, message: "Payment verified" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
