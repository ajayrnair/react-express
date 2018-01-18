const sharedConfigs = {
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MONGODB_CONNECTION: process.env.MONGO_DB_URL,
    SESSION_EXPIRY_TIME: 30 * 24 * 60 * 60 * 1000,
    SESSION_COOKIE_SECRET: process.env.SESSION_SECRET
};

const devConfigs = {
    GOOGLE_OAUTH_REDIRECT_URL: "http://localhost:8080/login/google/callback",
};

const prodConfigs = {
    GOOGLE_OAUTH_REDIRECT_URL: "https://radiant-plains-39901.herokuapp.com/login/google/callback",
};

const configs = Object.assign(sharedConfigs,
    process.env.NODE_ENV === "production" ? prodConfigs : devConfigs);

module.exports = configs;