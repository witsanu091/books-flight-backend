const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Transaction",
    {
      transaction_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      book_id: {
        type: DataTypes.UUID,
      },
      flight_id: {
        type: DataTypes.UUID,
      },
      airline_id: {
        type: DataTypes.UUID,
      },
      airport_id: {
        type: DataTypes.UUID,
      },
      country_id: {
        type: DataTypes.UUID,
      },
      transaction_status: {
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
      tableName: "transaction",
      createdAt: false,
      updatedAt: false,
    }
  );
};
module.exports = model;
