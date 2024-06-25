import express from "express";
import path from "path";
import {fileURLToPath} from 'url';
import bodyParser from "body-parser";
import appRoutes from "./routes/routes.js";
import dotenv from "dotenv";
import databaseConnection from "./connection/database_connection.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

databaseConnection();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended : true}));
app.use("/",appRoutes);


export default app;