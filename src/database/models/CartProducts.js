module.exports = (sequelize, dataTypes) => {
    let alias = 'CartProducts';
    let cols = {        
        cart_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:false
        },
        
        amount : {
            type:  dataTypes.DECIMAL(11,2)
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false            
        }
    }
    let config = {
        timestamps: false,
        tableName: 'carts_has_products'
    }

    const CartProducts = sequelize.define(alias, cols, config);

    CartProducts.associate = (models) => {
        CartProducts.belongsTo(models.Cart, {
            as: 'cart',
            foreignKey: 'cart_id'
        })
        CartProducts.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        })
    }

    return CartProducts
}