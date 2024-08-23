const model = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      dob: {
        type: DataTypes.DATE,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      user_name: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
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
      tableName: "user",
      createdAt: false,
      updatedAt: false,
      schema: "public", // default: public, PostgreSQL only.
    }
  );
};
module.exports = model;
