**Документация для апи**

**type_r**

1) Онлайн,
2) Сертификат,
3) Бесплатная доставка
4) За доставку
5) Бонус

**type**

1 --- риход
2 --- расход
3 --- Отмена заказа

**user_type**

1 -- обычный юзер
2 -- курьер
3 -- ресторан

`/api/v1/bonus/create`

`"user_id":"9999хххххх",
 	"type_r":"2",
 	"type": 1,
 	"amount":1000,
 	"email": "webfoza@gmail.com",
 	"order_id": "123131",
 	"user_type": 2
 	`


**install app**
1. first of all, create folder as named `billing`
2. `cd  billing` enter into folder
3. `git clone RestApi`
4. `git clone front_billing`
5. `cd  RestApi`
6. `nom install` install all components
7. create `env.js` in `app\config\` and set up db connection
8. `cp example_constants.js constants.js` clone constants file and set key for bringo api
9. change mysql_mode to `sql_mode = STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION` in `/etc/mysql/mysql.conf.d/mysqld.cnf` mysql config file
10. restart mysql `sudo service mysql restart`
