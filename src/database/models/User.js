module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       first_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        phone: {
            type: dataTypes.STRING(25)
        },
        address: {
            type: dataTypes.STRING(150),
        },
        country: {
            type: dataTypes.STRING(80),
            allowNull: false,
            defaultValue: "Argentina"
        },
        province: {
            type: dataTypes.STRING(80),
        },
        password: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(150)
        }
    }
    let config = {
        timestamps: false,
        tableName: "users"
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.hasMany(models.Sale, {
            as: "sales",
            foreignKey: "user_id"
        })
    }
    return User
}