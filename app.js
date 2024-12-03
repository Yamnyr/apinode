const express = require("express");
const app = express();
app.use(express.json());

const PORT = 8080;

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/cuisineapinode", {})
    .then(() => {
        console.log("Connected to the mongoDB database!");
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });



const routes = require("./routes/routes");
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});