module.exports = (sequelize, dataTypes) => {
    let alias = "Sale";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       order_number: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        date_sale: {
            type: dataTypes.DATE,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        sale_item_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
       
    }
    let config = {
        timestamps: false,
        tableName: "sales"
    }

    const Sale = sequelize.define(alias, cols, config);

    Sale.associate = (models) => {
        Sale.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })
        Sale.hasMany(models.Sale_item, {
            as: "sale_items",
            foreignKey: "sale_item_id"
        })
    }
    return Sale
}
