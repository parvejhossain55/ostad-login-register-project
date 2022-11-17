const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const userRouter = require("./src/routes/user");
const dbConnection = require("./src/config/dbConnect");

// middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cors());

// route middleware
app.use("/api/v1", userRouter);

// database connection
dbConnection();

app.get("/hello", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server Running..." + process.env.PORT);
});
