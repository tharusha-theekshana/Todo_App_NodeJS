import express from "express";

const app = express();
const PORT = 8000;

app.set("view engine","ejs");

app.listen(PORT,() => {
    console.log('Server is running on port ' + PORT);
})