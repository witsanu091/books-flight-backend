const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Schedule",
    {
      schedule_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      round_flight: {
        type: DataTypes.BOOLEAN,
      },
      time_take_off: {
        type: DataTypes.TIME,
      },
      time_landing: {
        type: DataTypes.TIME,
      },
      time_gate: {
        type: DataTypes.TIME,
      },
      hour_travel: {
        type: DataTypes.INTEGER,
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
      tableName: "schedule",
      createdAt: false,
      updatedAt: false,
    }
  );
};
module.exports = model;
