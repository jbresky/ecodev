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
        country: {
            type: dataTypes.STRING(80),
            allowNull: false,
        },
        province: {
            type: dataTypes.STRING(80),
        },
        address: {
            type: dataTypes.STRING(50),
        },
        password: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(100)
        }
    }
    let config = {
        timestamps: false,
        tableName: "users"
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.Cart, {
            as: "cart",
            foreignKey: "users_id"
        })
        User.belongsToMany(models.Product, {
            as: "products",
            through: "user_favorites",
            foreignKey: "users_id",
            otherKey: "products_id",
            timestamps: false
        })
    }
    return User
}