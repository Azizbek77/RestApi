module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define(
        'billinghistory', {
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
            },
            c_name: {
                type:Sequelize.STRING,
            },
            type: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
            },
            updated_at: {
                type: Sequelize.DATE
            },
            amount: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            balance: {
                type: Sequelize.STRING
            },
            type_r: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING
            },
            order_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_type: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            comment: {
                type: Sequelize.STRING,
                allowNull:false,
            }

        }, {
            timestamps: false,
            freezeTableName: true,
        });

    return History;
}