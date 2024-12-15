const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/db");
const app = express();
const port = 8000;

dotenv.config();
connectDb();
app.use(cors());
app.use(express.json());

app.use("/user", require("./routes/user.routes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});