import nodemailer from 'nodemailer';
import { config } from "../config/config.js";
import { userModel } from '../models/userModel.js';
import { generateToken } from '../utils/utils.js';

export class MailController {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: config.mail.account,
                pass: config.mail.password
            }
        })

        this.transporter.verify(function (error, success) {
            if (error) {
                console.error(error)
            } else {
                console.log("server SMTP is ready")
            }
        })

        this.mailOptions = {
            from: `Recuperar contrase;a ${config.mail.account}`,
            to: "platiniumtechcol@gmail.com",
            subject: "Recuperar contraseña",
            html: `
                    <h1> Recuperar tu contraseña </h1>
                    
             `,
        }
    }

    sendEmail = async (req, res) => {
        try {
            this.transporter.sendMail(this.mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                    return res.status(400).send({ message: "Error", payload: error })
                }

                console.log(`Message sent: `, info.messageId);
                res.send({ status: "Success", payload: info })
            })
        } catch (error) {
            res.sendInternalServerError(error)
        }
    };

    sendRecoveryEmail = async (req, res) => {
        const { email } = req.body;
        console.log("email", email)

        if (!email) {
            return res.status(400).send({ message: "Error", payload: "Email es requerido" });
        }

        const exist = await userModel.findOne({email})
        console.log("exust", exist)
        if(!exist){
            return res.status(400).send({ message: "Error", payload: "No esta registrado con este email." });
        }

        const recovery_token = generateToken({ email: email }, '1h');

        const recoveryLink = `http://localhost:5173/recovery?token=${recovery_token}`;

        const mailOptions = {
            from: `Recuperar contraseña ${config.mail.account}`,
            to: email,
            subject: "Recuperar contraseña",
            html: `
                <h1>Recuperar tu contraseña</h1>
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href=${recoveryLink}>Restablecer Contraseña</a>
                <p>Si no solicitaste un restablecimiento de contraseña, ignora este correo electrónico.</p>
            `,
        };

        try {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).send({ message: "Error al enviar el correo", payload: error.message });
                }

                console.log(`Message sent: %s`, info.messageId);
                res.status(200).send({ status: "Success", message: "Correo de recuperación enviado exitosamente.", payload: info });
            });
        } catch (error) {
            console.error("Internal server error:", error);
            res.status(500).send({ message: "Error interno del servidor", payload: error.message });
        }
    };
}
