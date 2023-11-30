import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import connectDatabase from "./config/db/index.js";
import ImportData from "./DataImport.js";
import { errorHandle, notFound } from "./Middleware/Errors.js";
import brandRoute from "./Routes/BrandRoutes.js";
import categoryRoutes from "./Routes/CategoryRoutes.js";
import promotionRoute from "./Routes/PromotionRoutes.js";
import productRoute from "./Routes/ProductRoutes.js"
import usertRouter from "./Routes/UserRouters.js";
import orderRouter from "./Routes/OrderRoutes.js";
import postRoute from "./Routes/PostRouter.js";
import cookieParser from "cookie-parser";
import attributeRoute from "./Routes/AttributeRoutes.js";

dotenv.config();
connectDatabase();
// CRUD | Create - Read - Update - Delete | Post - GET - PUT - DELETE
// CREATE (POST) + PUT - body
// GET + DELETE - query //?&as

const app = express();
app.use(cookieParser());

// API
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true
}));
app.use("/api/import", ImportData);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/brands", brandRoute);
app.use("/api/categorys", categoryRoutes);
app.use("/api/promotions", promotionRoute);
app.use("/api/products", productRoute);
app.use("/api/users", usertRouter);
app.use("/api/orders", orderRouter);
app.use("/api/posts", postRoute);
app.use("/api/attribute", attributeRoute);


// ERROR HANDLER
app.use(notFound);
app.use(errorHandle);

app.get('/', (req, res) => {
    res.send('API is running....')
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`))