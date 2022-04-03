module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(11,2),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(100),
        },
        description: {
            type: dataTypes.STRING(200),
        },
        categories_id: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        timestamps: false,
        tableName: "products"
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categories_id"
        })
        // Product.belongsToMany(models.User, {
        //     as: "users",
        //     through: "user_favorites",
        //     foreignKey: "products_id",
        //     otherKey: "users_id",
        //     timestamps: false
        // })
        Product.belongsToMany(models.Cart, {
            as: "carts",
            through: "carts_has_products",
            foreignKey: "products_id",
            otherKey: "carts_id",
            timestamps: false
        })
    }
    return Product
}