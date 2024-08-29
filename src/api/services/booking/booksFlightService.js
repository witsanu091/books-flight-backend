const moment = require("moment-timezone");

const CustomerBookingRepository = require("../../../database/repository/customerBookingRepository");
const { paymentService } = require("../../../lib/helper/payment");
const BookingFlightRepository = require("../../../database/repository/bookingFlightRepository");

const formatTemplate = process.env.DATETIMEFORMAT || "YYYY-MM-DD HH:mm:ss";
const timeZone = "Asia/Bangkok";

const makeBookId = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const bookingFlightService = async (body) => {
  console.time("🚀 ~ bookingFlightService ~ time");
  let {
    payment_method,
    payment_gateway,
    total_price,
    customer_list_1,
    customer_list_2,
    customer_list_3,
    flight_id,
    user_id,
    customer_amount,
    seat1,
    seat2,
    seat3,
  } = body;
  try {
    const customerList = [];
    const addCusResult = [];
    customer_list_1 = { ...customer_list_1, sub_user: user_id };
    customer_list_2 = customer_list_2 && {
      ...customer_list_2,
      sub_user: user_id,
    };
    customer_list_3 = customer_list_3 && {
      ...customer_list_3,
      sub_user: user_id,
    };
    if (customer_list_1) customerList.push(customer_list_1);
    if (customer_list_2) customerList.push(customer_list_2);
    if (customer_list_3) customerList.push(customer_list_3);
    console.log("🚀  customerList:", customerList);
    for (let addCus of customerList) {
      const addCustomer = await CustomerBookingRepository.add(addCus);
      addCusResult.push(addCustomer);
    }
    // const addCustomerBooking = await CustomerBookingRepository.addCustomerBulk(
    //   customerList
    // );
    console.log("🚀  addCusResult:", addCusResult);

    console.log("🚀  addCustomerBooking:", addCusResult);

    if (addCusResult.length === 0) {
      return { status: 400, message: "something is wrong", data: null };
    }

    const { status, data, error } = await paymentService(
      payment_method,
      payment_gateway,
      total_price
    );
    if (error) {
      return { status: 400, message: error, data: null };
    }
    const DateNow = moment().tz(timeZone).format(formatTemplate);

    const objectBooking = {
      flight_id,
      user_id,
      book_no: makeBookId(8),
      customer_amount,
      customer_id_1: addCusResult[0].customer_id,
      customer_id_2: addCusResult[1]?.customer_id,
      customer_id_3: addCusResult[2]?.customer_id,
      book_status: status,
      payment_gateway,
      total_price,
      travel_status: "books",
      seat1,
      seat2,
      seat3,
      created_on: DateNow,
    };
    const result = await BookingFlightRepository.add(objectBooking);
    return { status: 200, message: "success", data: result };
  } catch (error) {
    console.error("🚀 ~ bookingFlightService ~ error:", error);
    throw { status: 400, message: error };
  } finally {
    console.timeEnd("🚀 ~ bookingFlightService ~ time");
  }
};

module.exports = { bookingFlightService };
