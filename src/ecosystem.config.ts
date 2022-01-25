module.exports = {
    apps: [
        {
            name: 'index',
            script: './index.js',
            watch: true,
            env: {
                NODE_ENV: 'development',
                PORT: 4000,
                CORS: '*',
                HOST: 'localhost',
                PUBLIC_ROUTE: 'public',
                STRIPE_SECRET_KEY:
                    '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',
                APP_SECRET_KEY: 'ffbfe62b-a0e3-44d7-995d-314f672153f9',
                RAZER_APP_CODE: '202102160443',
                RAZER_APP_SECRET_KEY: 'lbrb4964',
                PAGOPAR_PRIVATE_TOKEN: '04832c7f4c2c173933cefdf24c2973c0',
                PAGOPAR_PUBLIC_TOKEN: 'b3d4414f5e4cd1672b7a52e7ff5a18e7',
                DB_USER: 'root',
                DB_PASSWORD: 'keluaadmin',
                DB_PORT: 3306,
                DB_NAME: 'kelua_payment',
            },
        },
    ],
};
