import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/users.js";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions.js";

const app = express();
const specs = swaggerJSDoc(options);

app.set("port", 3000);

app.use(cors({
    origin: 'https://localhost:4004',
    optionsSuccessStatus: 200, // For legacy browser support
    allowedHeaders: 'access-control-expose-headers, Access-Control-Allow-Credentials, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Content-Type, Sap-Messages, sap-messages, location, set-cookie, X-Forwarded-Proto, x-forwarded-proto, X-auth, x-csrf-token, Authorization',
    exposedHeaders: 'Content-Type, Sap-Messages, sap-messages',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app;
