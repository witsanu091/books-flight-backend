const { decryptCBC256 } = require("../../database/tools/encryptionField");

const paymentService = async (payment_method, payment_gateway, total_price) => {
  try {
    const { data, status, error } = mockPayment(
      decryptCBC256(payment_method),
      payment_gateway,
      total_price
    );
    console.log("🚀  error:", error);
    console.log("🚀  data:", data);
    console.log("🚀  status:", status);
    return { status, data, error };
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const mockPayment = (payment_method, payment_gateway, total_price) => {
  if (payment_method && payment_gateway && total_price)
    return {
      data: "pass",
      status: "success",
      error: null,
    };
};

module.exports = {
  paymentService,
};
