const express = require("express");
const app = express();
const path = require("path");
require('./data/setup-data-layer');
const authentication = require("./authentication/setup-auth");
const LoginRoutes = require("./routes/login");
const port = process.env.NODE_ENV === "production" ?
    (process.env.PORT || 8080) : 8080;

authentication.configureSession(app);
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use('/login', LoginRoutes);
//Catch all route, return index.html and let react router handle it
app.use((req, resp) => {
    resp.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
const server = app.listen(port, () => {
    console.log(`App is now listening on port: ${port}`);
});
server.on("error", (e) => {
    console.error("Error starting server: ");
    console.error(e);
});