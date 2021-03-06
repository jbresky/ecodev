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
        User.hasOne(models.Cart, {
            as: "cart",
            foreignKey: "user_id"
        })
        User.belongsToMany(models.Product, {
            as: "products",
            through: "user_favorites",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false,
            onDelete: "NO ACTION"
        })
    }
    return User
}