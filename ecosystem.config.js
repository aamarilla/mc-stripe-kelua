module.exports = {
    apps : [
        {
          name: "index",
          script: "./index.js",
          watch: true,
          env: {
            "NODE_ENV": "development",
            "PORT":4000,
            "CORS":"*",
            "HOST":"localhost",
            "PUBLIC_ROUTE":"public",
            "STRIPE_SECRET_KEY":"sk_test_51JoahML8qjTIUa3unal5TRlOseiuOJ4KzMIxPOOanwFNZELfDLZYNTqqFxjfch37k1MW8mo9dCPtnqmHwpVVD9XJ009075GQpX",
            "APP_SECRET_KEY":"ffbfe62b-a0e3-44d7-995d-314f672153f9",
            "RAZER_APP_CODE":"202102160443",
            "RAZER_APP_SECRET_KEY":"lbrb4964",
            "DB_USER": "root",
            "DB_PASSWORD": "keluaadmin",
            "DB_PORT": 3306,
            "DB_NAME": "kelua_payment"
          }
        }
    ]
}