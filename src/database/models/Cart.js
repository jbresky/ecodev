module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: {
            type: dataTypes.DECIMAL(11, 2),
        },
        created_at: {
            type: dataTypes.DATE,
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        deleted_at: {
            type: dataTypes.DATE,
        },
        user_id: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "carts"
    }

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })
        Cart.belongsToMany(models.Product, {
            as: "products",
            through: "carts_has_products",
            foreignKey: "cart_id",
            otherKey: "product_id",
        })
    }

    return Cart;
}