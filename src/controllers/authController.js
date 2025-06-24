import { userModel } from "../models/userModel.js";
import { authService, userService } from "../services/factory.js";
import { comparePassword, createHash, isValidPassword } from "../utils/utils.js";
import bcrypt from 'bcrypt'



export class AuthController {


    register = async (req, res) => {

        try {
            console.log("Usuario registrado con éxito:");
            console.log(req.user);

            res.status(201).json({ status: "success", message: "Usuario creado con exito" });
        } catch (error) {
            console.error("Error en AuthController.register:", error);
            res.sendInternalServerError(error);
        }
    }

    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = await authService.login(email, password);
            console.log("res", result)
            const { access_token, status, message, id, cartId, error } = result;
            if (status === 200) {
                res.cookie('cartId', cartId);
                res.sendResponse({ access_token, status, message, id })
            }

            if (status === 404) {
                res.sendResponse({ status, error, message })
            }

            if (status === 401) {
                res.sendResponse({ status, error, message })
            }

        } catch (error) {
            console.error(error);
            return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
        }
    }

    verifyRecoveryToken = async (req, res) => {
        const email = req.body.email

        try {
            const user = await userModel.findOne({ email })
            console.log(user.password)

            if (!user) {
                return res.status(404).send({ message: "Error", payload: "Usuario no encontrado para el token proporcionado." });
            }


            const isSamePassword = await comparePassword(req.password, user.password)

            if (isSamePassword) {
                console.log("La nueva contraseña es igual a la anterior. No se permite.");
                return res.status(400).send({
                    status: "Error",
                    message: "La nueva contraseña no puede ser igual a la contraseña actual."
                });
            }

            const newPassword = createHash(req.password)

            const updatedUser = await userModel.findByIdAndUpdate(
                user._id,
                { password: newPassword },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(500).send({ message: "Error", payload: "No se pudo actualizar la contraseña del usuario." });
            }

            res.status(200).send({ status: "Success", message: "Contraseña actualizada exitosamente." });


        } catch (error) {
            res.status(500).send({ message: "Error interno del servidor", payload: error.message });
        }
    };

}
