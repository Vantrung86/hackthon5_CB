const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router1 = require("./api/api")


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/todo",router1)

app.listen(8000, console.log("Đã chạy cổng 8000"));