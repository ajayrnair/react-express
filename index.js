const express = require("express");

const app = express();

app.get("/", (req, resp) => {
    resp.json({
        message: "Hello from Ajay"
    })
});

const port = process.env.NODE_ENV === "production" ?
    (process.env.PORT || 8080) : 8080;

app.listen(port, () => {
    console.log(`App is now listening on port: ${port}`);
});