const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Flight",
    {
      flight_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      airline_id: {
        type: DataTypes.UUID,
      },
      airport_take_off_id: {
        type: DataTypes.UUID,
      },
      airport_landing_id: {
        type: DataTypes.UUID,
      },
      schedule_id: {
        type: DataTypes.UUID,
      },
      flight_date: {
        type: DataTypes.DATE,
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
      tableName: "flight",
      createdAt: false,
      updatedAt: false,
    }
  );
};
module.exports = model;
