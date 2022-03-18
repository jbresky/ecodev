module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(7,2),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(150),
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING(250),
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
            foreignKey: "category_id"
        })
    }
    return Product
}