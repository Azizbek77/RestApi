const env = {
    database: 'billing',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;
  