const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Airline",
    {
      airline_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      airline_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airline_number: {
        type: DataTypes.STRING,
      },
      passenger_size: {
        type: DataTypes.INTEGER,
      },
      seat_option: {
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
      tableName: "airline",
      createdAt: false,
      updatedAt: false,
      schema: "public", // default: public, PostgreSQL only.
    }
  );
};
module.exports = model;
