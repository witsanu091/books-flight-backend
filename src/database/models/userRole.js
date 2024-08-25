const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "UserRole",
    {
      role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: "user_role",
      createdAt: false,
      updatedAt: false,
    }
  );
};
module.exports = model;
