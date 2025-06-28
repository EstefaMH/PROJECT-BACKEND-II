
import { CartsDAO } from "../dao/cartsDAO.js";
import { CartProductsDTO } from "../../dto/CartProductsDTO.js";
import UsersDTO from "../../dto/usersDTO.js";
import { AuthRepository } from "../../repositories/authRepository.js";
import { createHash, generateToken, isValidPassword, validateID } from "../../utils/utils.js";


export default class AuthService {

    constructor(repository = new AuthRepository()) {
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
        
        if (!user) {
            console.warn("Usuario no existe con el email: " + email);
            return { status: 404, error: "Not found", message: "Usuario no encontrado con username: " + email }
        }

        if (!isValidPassword(user, password)) {
            console.warn("credenciales invalidas para: " + email);
            return { status: 401, error: "El usuario y la contraseña no coinciden!" }
        }


        const newCart = new CartProductsDTO(null,);

        const cart = await CartsDAO.addNewCart(newCart)
        console.log(cart)

        if (!cart) {
            console.warn("Crdenciales invalidas para usuario: " + email);
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


        return this.repository.create(user);
    }
}

