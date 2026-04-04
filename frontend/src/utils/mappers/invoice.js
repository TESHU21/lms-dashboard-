export const mapInvoice = (invoice) => {
  return {
    id: invoice._id,
    firstName: invoice?.learner?.firstName,
    lastName: invoice?.learner?.lastName,
    email: invoice?.learner?.email,
    amount: invoice.amount,
    image: invoice?.learner?.profileImage,
    date: invoice.createdAt,
    status: invoice.status,
  };
};
