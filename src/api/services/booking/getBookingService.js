const BookingFlightRepository = require("../../../database/repository/bookingFlightRepository");
const CustomerBookingRepository = require("../../../database/repository/customerBookingRepository");

const getBookingService = async (body) => {
  console.time("🚀 ~ getBookingService ~ time");
  try {
    const result = await BookingFlightRepository.getByKey(body);
    if (result.length === 0)
      return { status: 400, message: "book not found", data: null };
    let customerList = [
      result.customer_id_1,
      result.customer_id_2,
      result.customer_id_3,
    ];
    customerList = customerList.filter(
      (value) => value !== null && value !== undefined
    );
    const objectGetCustomer = {
      user_id: result.user_id,
      customer_id: customerList,
    };

    console.log("🚀  customerList:", customerList);
    const getCustomer = await CustomerBookingRepository.getByKeyMany(
      objectGetCustomer
    );
    console.log("🚀  getCustomer:", getCustomer);
    delete result.customer_id_1;
    delete result.customer_id_2;
    delete result.customer_id_3;

    const bookingDetail = {
      ...result,
      customer_booking: getCustomer,
    };
    console.log("🚀  bookingDetail:", bookingDetail);

    return { status: 200, message: "success", data: bookingDetail };
  } catch (error) {
    console.error("🚀 ~ getBookingService ~ error:", error);
    throw { status: 500, message: error };
  } finally {
    console.timeEnd("🚀 ~ getBookingService ~ time");
  }
};

module.exports = { getBookingService };
