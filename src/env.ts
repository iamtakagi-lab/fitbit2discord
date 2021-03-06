export default {
    NODE_ENV: process.env.NODE_ENV
        ? process.env.NODE_ENV
        : 'development',
    HOST: process.env.HOST
        ? process.env.HOST
        : '0.0.0.0',
    PORT: process.env.PORT
        ? Number(process.env.PORT)
        : '3000',
    NAME: process.env.NAME
        ? process.env.NAME
        : '',
    WEBSITE_URL: process.env.WEBSITE_URL
        ? process.env.WEBSITE_URL
        : '',
    BASE_URL: process.env.BASE_URL
        ? process.env.BASE_URL
        : '',
    FITBIT_REDIRECT_URL: process.env.FITBIT_REDIRECT_URL
        ? process.env.FITBIT_REDIRECT_URL
        : '',
    FITBIT_CLIENT_ID: process.env.FITBIT_CLIENT_ID
        ? process.env.FITBIT_CLIENT_ID
        : '',
    FITBIT_CLIENT_SECRET: process.env.FITBIT_CLIENT_SECRET
        ? process.env.FITBIT_CLIENT_SECRET
        : '',
    DISCORD_WEBOOK_URLS: process.env.DISCORD_WEBOOK_URLS
        ? process.env.DISCORD_WEBOOK_URLS
        : '',
    NOTIFY_DELAY_SECONDS: process.env.NOTIFY_DELAY_SECONDS
        ? Number(process.env.NOTIFY_DELAY_SECONDS)
        : 300,

}