import { Invoice } from "../models/invoiceModel.js";
import { Enrollment } from "../models/enrollmentModel.js";

export const markInvoiceAsPaid = async (paymentData) => {
  try {
    console.log("markInvoiceAsPaid input:", paymentData);

    const invoice = await Invoice.findOne({ paystackReference: paymentData.reference });
    if (!invoice) {
      console.error("Invoice not found for reference:", paymentData.reference);
      throw new Error("Invoice not found");
    }

    if (
      paymentData.status !== "success" ||
      !paymentData.paid_at ||
      paymentData.amount !== invoice.amount * 100 // adjust if needed
    ) {
      console.error("Invalid payment data:", paymentData, "Invoice:", invoice);
      throw new Error("Invalid payment status or amount");
    }

    if (invoice.status === "paid") {
      console.log("Invoice already marked as paid");
      return;
    }

    invoice.status = "paid";
    invoice.paidAt = paymentData.paid_at;
    invoice.paystackTransactionId = paymentData.id;

    await invoice.save();

    const isAlreadyEnrolled = await Enrollment.findOne({
      learner: invoice.learner,
      track: invoice.track,
    });

    if (!isAlreadyEnrolled) {
      await Enrollment.create({
        learner: invoice.learner,
        track: invoice.track,
      });
    }
  } catch (error) {
    console.error("Error in markInvoiceAsPaid:", error);
    throw error;
  }
};
