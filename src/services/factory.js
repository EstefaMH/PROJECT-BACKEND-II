
import { config } from "../config/config.js";
import DBSingleton from "../config/databaseConfig.js"
import program from "../process/process.js";

let userService
let authService
let cartService
let productService
let ticketService



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

            const { default: AuthService } = await import('./mongo/authServicesDAO.js')
            authService = new AuthService()

            const { default: UserService } = await import('./mongo/usersServicesDAO.js')
            userService = new UserService()

            const { default: CartService } = await import('./mongo/cartsServicesDAO.js')
            cartService = new CartService()

            const { default: ProductService } = await import('./mongo/productsServicesDAO.js')
            productService = new ProductService()

            const { default: TicketService } = await import('./mongo/ticketServiceDAO.js')
            ticketService = new TicketService()

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

export { userService, authService, cartService,productService , ticketService}