import express from "express";
import crypto from "crypto";
import { markInvoiceAsPaid } from "../utils/paymentHelpers.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const event = req.body.event;

    switch (event) {
      case "charge.success":
        await markInvoiceAsPaid(req.body.data);
        break;

      default:
        console.log(`Unhandled event type: ${event}`);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

export default router;
