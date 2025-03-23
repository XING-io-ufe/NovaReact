import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

import client from "./Service";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

client.connect((err) => {
    if (err) {
        console.log("өгөгдлийн сантай холбогдоход алдаа гарлаа.", err);
    } else {
        console.log("өгөгдлийн сантай холбогдлоо.");
    }
});

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Express with TypeScript!");
});

app.listen(PORT, async () => {
    console.log(`Express сэрвэр http://localhost:${PORT} порт дээр аслаа... `);
});

module.exports = app;