const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

/*require all the routes here */
const authRouter = require("./route/auth.routes");
const interviewRouter = require("./route/interview.routes");

/*using all routes here*/
app.use("/api/auth", authRouter); 

app.use("/api/interview",interviewRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : {}
    });
});

module.exports = app;

