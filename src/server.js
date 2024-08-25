const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter = require("./api/router/authenticationRoute");
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

// app.use("/api", userRouter);
app.use("/api/auth", authRouter);

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
