const { decryptCBC256, encryptCBC256 } = require("../tools/encryptionField");

const model = (Sequelize, DataTypes) => {
  const Users = Sequelize.define(
    "Users",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const storedValue = this.getDataValue("first_name");
          return decryptCBC256(storedValue);
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const storedValue = this.getDataValue("last_name");
          return decryptCBC256(storedValue);
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        get() {
          const storedValue = this.getDataValue("email");
          return decryptCBC256(storedValue);
        },
      },
      dob: {
        type: DataTypes.DATE,
      },
      mobile: {
        type: DataTypes.STRING,
        get() {
          const storedValue = this.getDataValue("mobile");
          return decryptCBC256(storedValue);
        },
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
        get() {
          const storedValue = this.getDataValue("password");
          return decryptCBC256(storedValue);
        },
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
      user_role: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
      createdAt: "created_on",
      updatedAt: false,
    }
  );

  // Encrypt sensitive fields before saving (create or update)
  Users.beforeCreate((user) => {
    user.first_name = encryptCBC256(user.first_name);
    user.last_name = encryptCBC256(user.last_name);
    user.email = encryptCBC256(user.email);
    user.mobile = encryptCBC256(user.mobile);
    user.password = encryptCBC256(user.password);
  });

  Users.beforeUpdate((user) => {
    user.first_name = encryptCBC256(user.first_name);
    user.last_name = encryptCBC256(user.last_name);
    user.email = encryptCBC256(user.email);
    user.mobile = encryptCBC256(user.mobile);
    user.password = encryptCBC256(user.password);
  });
  return Users;
};

module.exports = model;
