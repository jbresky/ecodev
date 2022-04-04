module.exports = (sequelize, dataTypes) => {
    let alias = "Sale";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    }
    let config = {
        timestamps: false,
        tableName: "sales"
    }

    const Sale = sequelize.define(alias, cols, config);

    Sale.associate = (models) => {
        Sale.belongsTo(models.Cart, {
            as: "cart",
            foreignKey: "cart_id"
        })
    }
    return Sale
}
