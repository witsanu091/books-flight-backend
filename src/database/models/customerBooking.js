const { decryptCBC256, encryptCBC256 } = require("../tools/encryptionField");

const model = (Sequelize, DataTypes) => {
  const CustomerBooking = Sequelize.define(
    "CustomerBooking",
    {
      customer_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const storedValue = this.getDataValue("customer_name");
          return decryptCBC256(storedValue);
        },
      },
      customer_email: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const storedValue = this.getDataValue("customer_email");
          return decryptCBC256(storedValue);
        },
      },
      customer_phone: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          const storedValue = this.getDataValue("customer_phone");
          return decryptCBC256(storedValue);
        },
      },
      sub_user: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      created_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "customer_booking",
      createdAt: false,
      updatedAt: false,
    }
  );
  CustomerBooking.beforeCreate((customer) => {
    customer.customer_name = encryptCBC256(customer.customer_name);
    customer.customer_email = encryptCBC256(customer.customer_email);
    customer.customer_phone = encryptCBC256(customer.customer_phone);
  });

  CustomerBooking.beforeUpdate((customer) => {
    customer.customer_name = encryptCBC256(customer.customer_name);
    customer.customer_email = encryptCBC256(customer.customer_email);
    customer.customer_phone = encryptCBC256(customer.customer_phone);
  });
  return CustomerBooking;
};
module.exports = model;
