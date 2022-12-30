//require dependencies
const express = require('express');

//create express app
const app = express();

// create a PORT
const PORT = process.env.PORT || 3001;

//set up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);
const htmlRoutes = require("./routes/htmlRoutes");
app.use("/", htmlRoutes);

//create server listener
app.listen(PORT, () => {
    console.log(`API server for running on port ${PORT}!`);
});

