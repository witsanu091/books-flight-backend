const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Airport",
    {
      airport_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      airport_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.UUID,
      },
      location: {
        type: DataTypes.STRING,
      },
      airport_size: {
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
      tableName: "airport",
      createdAt: false,
      updatedAt: false,
      schema: "public", // default: public, PostgreSQL only.
    }
  );
};
module.exports = model;
