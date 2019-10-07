module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('billing_users', {
        user_id: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        },
        balance: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    return Users;
}