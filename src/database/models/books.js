const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Books",
    {
      book_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      flight_id: {
        type: DataTypes.UUID,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      customer_amount: {
        type: DataTypes.INTEGER,
      },
      customer_name_1: {
        type: DataTypes.STRING,
      },
      customer_name_2: {
        type: DataTypes.STRING,
      },
      customer_name_3: {
        type: DataTypes.STRING,
      },
      book_status: {
        type: DataTypes.STRING,
      },
      payment_gateway: {
        type: DataTypes.STRING,
      },
      price_summary: {
        type: DataTypes.DECIMAL(10, 2),
      },
      travel_status: {
        type: DataTypes.STRING,
      },
      seat1: {
        type: DataTypes.STRING,
      },
      seat2: {
        type: DataTypes.STRING,
      },
      seat3: {
        type: DataTypes.STRING,
      },
      created_on: {
        type: DataTypes.DATE,
      },
      updated_on: {
        type: DataTypes.DATE,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: "books",
      createdAt: false,
      updatedAt: false,
    }
  );
};
module.exports = model;
