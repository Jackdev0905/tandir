import express from "express"
import morgan from "morgan"
import path from "path"
import router from "./router";
import routerAdmin from "./routerAdmin";
import { MORGAN_FORMAT } from "./libs/config";
const app = express();

// Enterance
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan(MORGAN_FORMAT))

// sessions

// views
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

// Routers
app.use("/", router)
app.use("/admin", routerAdmin)

export default app;