module.exports = (sequelize, dataTypes) => {
    let alias = 'Fav';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER
        },
        user_id: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        timestamps: false,
        tableName: 'user_favorites'
    }

    const Fav = sequelize.define(alias, cols, config);

    Fav.associate = (models) => {
        Fav.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id',
            onDelete: 'NO ACTION'
        })
        Fav.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
            onDelete: 'NO ACTION'
        })
    }

    return Fav
}