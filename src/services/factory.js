
import { config } from "../config/config.js";
import DBSingleton from "../config/databaseConfig.js"
import program from "../process/process.js";

let userService
let authService
let cartService
let productService



async function initializeMongoService() {

    try {
        return await DBSingleton.getInstance()
    } catch (error) {
        console.error("Error al iniciar Mongo", error)
        process.exit(1);
    }
}



(async () => {

    console.log("factory", config.persistence)
    switch (config.persistence || program.opts().persist) {

        case 'mongo':
            console.log('mongo')
            await initializeMongoService()

            const { default: AuthService } = await import('./authServices.js')
            authService = new AuthService()

            const { default: UserService } = await import('./usersServices.js')
            userService = new UserService()

            const { default: CartService } = await import('./cartsServices.js')
            cartService = new CartService()

            const { default: ProductService } = await import('./productsServices.js')
            productService = new ProductService()

            console.log("servicio de usuarios cargado", userService)
            break;
        case 'files':
            console.log('files')
            //studentService = instancia_student
            break;

        default:
            break
    }
})()

export { userService, authService, cartService,productService }