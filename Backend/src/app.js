const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

/*require all the routes here */
const authRouter = require("./route/auth.routes");

/*using all routes here*/
app.use("/api/auth", authRouter);

const aiRoutes = require("./route/ai.routes");

app.use("/ai", aiRoutes);

module.exports = app;
