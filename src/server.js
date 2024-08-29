const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter = require("./api/router/authenticationRoute");
const flightRouter = require("./api/router/searchRoute");
const bookFlightRouter = require("./api/router/bookingRoute");
const userRouter = require("./api/router/userProfileRoute");
const responseMessage = require("../src/lib/build-response/responseMessage.json");

dotenv.config();
const isEncrypt = process.env.IS_ENCRYPT;
const keySecret = process.env.KEY_SECRET;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(helmet());

app.use("/api/flight", flightRouter);
app.use("/api/auth", authRouter);
app.use("/api/books", bookFlightRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json(
    responsePartnerAPI({
      isEncrypt,
      keySecret,
      responses: responseMessage,
      statusCode: 500,
      responseData: { err },
      responseCode: "E0001",
    })
  );
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
