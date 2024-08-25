const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Country",
    {
      country_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      country_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time_zone: {
        type: DataTypes.STRING,
      },
      continent: {
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
      tableName: "country",
      createdAt: false,
      updatedAt: false,
    }
  );
};
module.exports = model;
