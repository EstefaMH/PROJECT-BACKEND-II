
import program from "../process/process.js"
import dotenv from "dotenv"

const environment = program.opts().mode;

dotenv.config({
    path: environment === "production" ? ".env.production": ".env"
})

export const config = {
    appConfig: {
        port: process.env.PORT
    },
    dataFiles: {
        products: process.env.PRODUCTS_PATH,
        cart: process.env.CART_PATH,
    },
    dataBase:{
        mongoUrl: process.env.MONGODB_URL,
        mongoDataBaseName : process.env.MONGODB_NAME
    },
     mail:{
        account: process.env.GMAIL_ACCOUNT,
        password: process.env.GMAIL_APP_PASSWORD
    },
    token: process.env.TOKEN_SECRET_KEY,
    persistence: program.opts().persist

}



