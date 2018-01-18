const express = require("express");
const app = express();
require('./data/setup-data-layer');
const authentication = require("./authentication/setup-auth");
const LoginRoutes = require("./routes/login");
const port = process.env.NODE_ENV === "production" ?
    (process.env.PORT || 8080) : 8080;

authentication.configureSession(app);
app.use('/login', LoginRoutes);
const server = app.listen(port, () => {
    console.log(`App is now listening on port: ${port}`);
});

server.on("error", (e) => {
    console.error("Error starting server: ");
    console.error(e);
});