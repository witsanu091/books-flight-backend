const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Payment",
    {
      payment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      payment_data: {
        type: DataTypes.TEXT,
      },
      payment_list: {
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
      tableName: "payment",
      createdAt: false,
      updatedAt: false,
      schema: "public", // default: public, PostgreSQL only.
    }
  );
};
module.exports = model;
