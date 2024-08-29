const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Books",
    {
      book_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      book_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flight_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      customer_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customer_id_1: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      customer_id_2: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      customer_id_3: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      book_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_gateway: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      travel_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seat1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seat2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seat3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
