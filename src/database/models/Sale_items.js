module.exports = (sequelize, dataTypes) => {
    let alias = "Sale_item";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sale_id: {
            type: dataTypes.INTEGER,
            allowNule: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNule: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNule: false
        },
        unit_price: {
            type: dataTypes.DECIMAL(10, 0),
            allowNule: false
        }
    }
    let config = {
        timestamps: false,
        tableName: "sale_items"
    }

    const Sale_item = sequelize.define(alias, cols, config);

    Sale_item.associate = (models) => {
        Sale_item.hasMany(models.Product, {
            as: "products",
            foreignKey: "product_id"
        })
        Sale_item.belongsTo(models.Sale, {
            as: "sale",
            foreignKey: "sale_item_id"
        })
    }

    return Sale_item;
}