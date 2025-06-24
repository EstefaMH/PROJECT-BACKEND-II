import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { config } from './config/config.js';
import inicializePassport from './config/passportConfig.js';
import AuthRouter from './router/authRouter.js';
import MailRouter from './router/mailRouter.js';
import ProductsRouter from './router/productsRouter.js';
import UserRouter from './router/usersRouter.js';
import { router as cartsView } from './routes/cartViews.js';
import { router as productsView } from './routes/productsViews.js';
import { router as usersViews } from './routes/usersViews.js';
import CartsRouter from './router/cartsRouter.js';


dotenv.config();
const app = express();

const PORT = config.appConfig.port || 8080;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser("c0d3rS3cr3t0"))


app.use(session({
  secret: "your-secret",
  resave: true,
  saveUninitialized: true,

  store: MongoStore.create({
    mongoUrl: config.dataBase.mongoUrl,
    autoRemove: 'interval',
    ttl: 100,
  })

}))

//Passport 
inicializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Router views
app.use("/products", productsView);
app.use("/carts", cartsView);
app.use("/", usersViews);

//Router Api 
const userRouter = new UserRouter();
const mailRouter = new MailRouter();
const authRouter = new AuthRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter()
userRouter.init();
mailRouter.init();
authRouter.init();
productsRouter.init();
cartsRouter.init();
app.use("/api/users", userRouter.getRouter())
app.use("/api/mail", mailRouter.getRouter())
app.use("/api/auth", authRouter.getRouter())
app.use("/api/products", productsRouter.getRouter())
app.use("/api/carts", cartsRouter.getRouter())

const server = app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  //console.log(process)
  console.log(process.argv)
});




