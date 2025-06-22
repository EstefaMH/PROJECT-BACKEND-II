
import { CartsDAO } from "../dao/cartsDAO.js";
import { CartProductsDTO } from "../dto/CartProductsDTO.js";
import UsersDTO from "../dto/usersDTO.js";
import { AuthRepository } from "../repositories/authRepository.js";
import { createHash, generateToken, isValidPassword, validateID } from "../utils/utils.js";


export default class AuthService {

    constructor(repository = new AuthRepository()) {
        console.log("repository init")
        this.repository = repository;
    }


    async getAll() {
        return this.repository.findAll();
    }

    async getUser(id) {
        validateID(id)
        return this.repository.findById(id);
    }

    async getUserByEmail(email) {
        return this.repository.findByEmail(email);
    }

    async login(email, password) {
        const user = await this.getUserByEmail(email);
        console.log("Usuario encontrado para login:");
        console.log(user);
        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            return { status: 404, error: "Not found", message: "Usuario no encontrado con username: " + email }
        }

        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return { status: 401, error: "El usuario y la contraseña no coinciden!" }
        }


        const newCart = new CartProductsDTO(
            null,
        );
        const cart = await CartsDAO.addNewCart(newCart)
        console.log(cart)

        if (!cart) {
            console.warn("Invalid credentials for user: " + email);
            return { status: 500, error: "Error de servidor intente más tarde" }
        }

        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role,
            cartId: cart._id
        };
        const access_token = generateToken(tokenUser, '24h');
        console.log(access_token);



        return { cartId: cart._id, status: 200, message: "Login successful!", access_token: access_token, id: user._id }
    }

    async create(data) {
        const { first_name, last_name, email, age, password } = data
        const userExists = await this.repository.findByEmail(email)
        
        if (userExists) {
            return res.status(400).json({ message: 'User ya existe' });
        }

        let newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
        }

         const user = new UsersDTO(newUser);
         console.log("userService", user)


        //validateTask(data)
        return this.repository.create(user);
    }

    /* async update(id, data) {
         validateID(id)
         validateTask(data)
 
         return this.repository.update(id, data);
     }
 
     async remove(id) {
         validateID(id)
         return this.repository.delete(id);
     }*/
}

