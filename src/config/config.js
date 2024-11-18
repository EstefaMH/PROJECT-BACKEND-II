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
    }

}

